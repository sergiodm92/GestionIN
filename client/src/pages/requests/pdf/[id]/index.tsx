import { GetServerSideProps } from "next";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getRequest } from "../../../../store/Slices/requestsSlice";
import { useEffect } from "react";
import { getRequestById } from "../../functions/functions";
import Loading from "../../../../components/Loading/loading";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { FormButton, SmallBtn } from "../../../../components/Buttons";
import PDFDetail from "../../components/requestDetailPDF";

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

const RequestDetailPDF=({ id }: { id: string })=>{
    const dispatch = useAppDispatch()

    const request = useAppSelector(getRequest);
    console.log(request.request)

    useEffect(() => {
        getRequestById(dispatch, id);
      }, []);

    return (
        <div>
      {!request ? (
        <Loading />
      ) : (
        <div>
                <div className="d-none d-lg-block">
                    <PDFViewer style={{width:"100%", height: "95vh"}}>
                        <PDFDetail/>
                    </PDFViewer> 
                </div>
                <div className="d-lg-none" >
                    <PDFDownloadLink
                        style={{textDecoration:"none"}}
                        document={<PDFDetail/>}

                        fileName={'Detalle de Solicitud de Siniestro - '+ request.request.deceased.name}

                    >
                        <FormButton
                            title={"Descargar PDF"}
                        />
                    </PDFDownloadLink>
                </div>
            </div>
      )}
    </div>
    )
}
export default RequestDetailPDF