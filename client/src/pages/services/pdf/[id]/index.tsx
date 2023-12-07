import { GetServerSideProps } from "next";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getParticularRequest } from "../../../../store/Slices/particularRequestsSlice";
import { useEffect, useState } from "react";
import { getParticularRequestById } from "../../../../components/functions/requests/functions";
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

import { FormButton } from "../../../../components/Buttons";
import { getAllColors, getAllSizes, getAllTypes } from "../../../../components/functions/settings/coffinProperty";
import { getColors, getSizes, getTypes } from "../../../../store/Slices/coffinProperty";
import PDFParticularDetail from "../../../../components/Request/particularRequestDetailPDF";
import { getAllCompanies } from "../../../../components/functions/settings/companies";
import { getCompanies } from "../../../../store/Slices/companies";

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
  const request = useAppSelector(getParticularRequest);
  const types = useAppSelector(getTypes);
  const sizes = useAppSelector(getSizes);
  const colors = useAppSelector(getColors);
  const companies = useAppSelector(getCompanies);
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setIsClient(true);
    getParticularRequestById(dispatch, id);
    getAllTypes(dispatch);
    getAllSizes(dispatch);
    getAllColors(dispatch);
    getAllCompanies(dispatch);
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
          <PDFParticularDetail request={request.request} deceased={request.deceased} types={types} sizes={sizes} colors={colors} companies={companies}/>
        </PDFViewer>
      );
    } else {
      return (
        <PDFDownloadLink
          style={{ textDecoration: "none" }}
          document={
            <PDFParticularDetail request={request.request} deceased={request.deceased} types={types} sizes={sizes} colors={colors} companies={companies}/>
          }
          fileName={
            "Detalle de Solicitud de Siniestro - " + request.deceased.name
          }
        >
          <FormButton title={"Descargar PDF"} loading={false} disabled={false}/>
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
