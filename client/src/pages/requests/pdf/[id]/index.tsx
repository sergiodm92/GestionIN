import { GetServerSideProps } from "next";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getRequest } from "../../../../store/Slices/requestsSlice";
import { useEffect, useState } from "react";
import { getRequestById } from "../../functions/functions";
import Loading from "../../../../components/Loading/loading";
import dynamic from "next/dynamic";

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

import PDFDetail from "../../components/requestDetailPDF";
import { FormButton } from "../../../../components/Buttons";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  if (!params) {
    return {
      notFound: true,
    };
  }

  const { id } = params;

  return {
    props: {
      id,
    },
  };
};

const RequestDetailPDF = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const request = useAppSelector(getRequest);
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsClient(true);
    getRequestById(dispatch, id);

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
          <PDFDetail request={request.request} deceased={request.deceased} />
        </PDFViewer>
      );
    } else {
      return (
        <PDFDownloadLink
          style={{ textDecoration: "none" }}
          document={
            <PDFDetail request={request.request} deceased={request.deceased} />
          }
          fileName={
            "Detalle de Solicitud de Siniestro - " + request.deceased.name
          }
        >
          <FormButton title={"Descargar PDF"} />
        </PDFDownloadLink>
      );
    }
  };

  return (
    <div>
      {!request ? <Loading /> : <div>{isClient && renderContent()}</div>}
    </div>
  );
};

export default RequestDetailPDF;
