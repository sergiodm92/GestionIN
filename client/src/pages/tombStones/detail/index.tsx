import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import PDFTombstoneDetail from "../../../components/TombStoneDetailPDF";
import { FormButton } from "../../../components/Buttons";

const PDFViewer = dynamic(() =>
  import("@react-pdf/renderer").then((module) => module.PDFViewer)
);
const PDFDownloadLink = dynamic(() =>
  import("@react-pdf/renderer").then((module) => module.PDFDownloadLink)
);

const RequestDetailPDF = () => {
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [deceaseds, setDeceaseds] = useState([]);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      const deceasedsString = localStorage.getItem("deceaseds");
      const parsedDeceaseds = deceasedsString ? JSON.parse(deceasedsString) : [];
      setDeceaseds(parsedDeceaseds);
    }

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
          <PDFTombstoneDetail deceaseds={deceaseds} />
        </PDFViewer>
      );
    } else {
      return (
        <PDFDownloadLink
          style={{ textDecoration: "none" }}
          document={<PDFTombstoneDetail deceaseds={deceaseds} />}
          fileName={"Detalle de Placas y Lápidas faltantes"}
        >
          <FormButton title={"Descargar PDF"} />
        </PDFDownloadLink>
      );
    }
  };

  return <div>{isClient && renderContent()}</div>;
};

export default RequestDetailPDF;