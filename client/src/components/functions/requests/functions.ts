import { getDeceasedByRequestIdApi } from "../../../services/deceasedApi"
import { deleteRequestApi, getAllRequestsApi, getRequestsByIdApi } from "../../../services/requestApi"
import { setRequestsData, setRequestData } from "../../../store/Slices/requestsSlice"
import { createToast, questionAlert } from "../../Notifications/Notifications"

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

const alertDeleteRequest = async (id: string, router: any)=>{
    const response = await deleteRequestApi(id);
    if (response.data) {
        createToast("success","Se elimino correctamente");
        router.push('/requests')
    } else {
        createToast("warning","No se pudo eliminar, intentente nuevamente");
    }
}

export const handleDeleteRequest = (id:string, router: any)=>{
    questionAlert(
        "Eliminar Ingreso",
        "¿Esta seguro que desea eliminar el ingreso?",
        alertDeleteRequest(id, router),
        "No se elimino la solicitud"
    )
}
