import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/loading";
import dynamic from "next/dynamic";
import PDFTombstoneDetail from '../components/tombStoneDetailPDF'
import { FormButton } from "../../../components/Buttons";

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



const RequestDetailPDF = () => {
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsClient(true);

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
    if (windowWidth >= 700) {
      return (
        <PDFViewer style={{ width: "100%", height: "95vh" }}>
          <PDFTombstoneDetail />
        </PDFViewer>
      );
    } else {
      return (
        <PDFDownloadLink
          style={{ textDecoration: "none" }}
          document={
            <PDFTombstoneDetail />
          }
          fileName={
            "Detalle de Placas y Lápidas faltantes"
          }
        >
          <FormButton title={"Descargar PDF"} />
        </PDFDownloadLink>
      );
    }
  };

  return (
    <div>
      {renderContent()}
      {/* {!request ? <Loading /> : <div>{isClient && renderContent()}</div>} */}
    </div>
  );
};

export default RequestDetailPDF;