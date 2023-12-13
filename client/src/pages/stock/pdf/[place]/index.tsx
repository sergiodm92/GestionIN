import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getCoffinStockByPlace, getMboxStockByPlace, getProductsStockByPlace } from "../../../../components/functions/stock";
import { getCoffinStock } from "../../../../store/Slices/coffinStockSlice";
import { getProductsStock } from "../../../../store/Slices/productsStockSlice";
import { getmetalBoxStock } from "../../../../store/Slices/metalBoxStockSlice";
import PDFStockDetail from "../../../../components/StockPDF/index";
import { FormButton } from "../../../../components/Buttons";
import Loading from "../../../../components/Loading/loading";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFViewer),
  {
    ssr: false,
  }
);
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFDownloadLink),
  {
    ssr: false,
  }
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  if (!params) {
    return {
      notFound: true,
    };
  }

  const { place } = params;

  return {
    props: {
      place,
    },
  };
};

const StockDetailPDF = ({ place }: { place: string }) => {
  const dispatch = useAppDispatch();
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isStock, setIsStock] = useState(true);

  const stock = useAppSelector(getCoffinStock);
  const products = useAppSelector(getProductsStock);
  const mBox = useAppSelector(getmetalBoxStock);

  useEffect(() => {
    setIsClient(true);
    getCoffinStockByPlace(dispatch, place, setIsStock);
    getProductsStockByPlace(dispatch, place);
    getMboxStockByPlace(dispatch, place);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Actualizar el ancho de la ventana en el cambio de tamaño
    window.addEventListener("resize", handleResize);
    handleResize(); // Obtener el ancho inicial de la ventana

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderContent = () => {
    const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('es');
const formattedTime = currentDate.toLocaleTimeString('es');

    if (windowWidth >= 700) {
      return (
        <PDFViewer style={{ width: "100%", height: "95vh" }}>
          <PDFStockDetail place={place} stock={stock} mBox={mBox} products={products}/>
        </PDFViewer>
      );
    } else {
      return (
        <PDFDownloadLink
          style={{ textDecoration: "none" }}
          document={
            <PDFStockDetail place={place} stock={stock} mBox={mBox} products={products}/>
          }
          fileName={
            "Stock disponible en " + place + " - " + formattedDate + " - " + formattedTime + ".pdf"
          }
        >
          <FormButton title={"Descargar PDF"} loading={false} disabled={false}/>
        </PDFDownloadLink>
      );
    }
  };

  return (
    <div>
      {!stock ? <Loading /> : <div>{isClient && renderContent()}</div>}
    </div>
  );
};

export default StockDetailPDF;