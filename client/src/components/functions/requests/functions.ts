import Swal from "sweetalert2"
import { getDeceasedByRequestIdApi } from "../../../services/deceasedApi"
import { deleteRequestApi, getAllRequestsApi, getRequestsByIdApi } from "../../../services/requestApi"
import { setRequestsData, setRequestData } from "../../../store/Slices/requestsSlice"
import { createToast } from "../../Notifications/Notifications"

export const getAllRequests = async (dispatch: any)=>{
    try{
        const allRequests = await getAllRequestsApi()
        dispatch(setRequestsData(allRequests.data))
    }
    catch(err){
        console.log(err)
    }
}
export const getRequestById = async (dispatch: any, id:string)=>{
    try{
        const request = await getRequestsByIdApi(id)
        dispatch(setRequestData(request.data))
    }
    catch(err){
        console.log(err)
    }
}

export const getDeceasedByRequestId = async (dispatch: any, id:string)=>{
    try{
        const deceased = await getDeceasedByRequestIdApi(id)
        dispatch(setRequestData(deceased.data))
    }
    catch(err){
        console.log(err)
    }
}

//------------------HANDLE DELETE----------------

export const handleDeleteRequest = (id:string, router: any)=>{
    Swal.fire({
        title: "Eliminar Ingreso",
        text: "¿Esta seguro que desea eliminar el ingreso?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#43815A",
        cancelButtonColor: "#b32020",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            console.log(id)
            const response = await deleteRequestApi(id);
            console.log(response)
            if (response.data) {
              createToast("success","Se elimino correctamente");
              router.push('/requests')
            } else {
            createToast("warning","No se pudo eliminar, intentente nuevamente");
            }
        } catch (error) {
            createToast("warning","ocurrio un error, vuelva a intentar");
            console.error(error);
        }
            
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
            createToast("warning","No se elimino la solicitud");
        }
      });
    }
