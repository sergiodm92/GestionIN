import { deleteRequestApi, getAllParticularRequestsApi, getAllRequestsApi, getParticularRequestsByIdApi, getRequestsByIdApi } from "../../../services/requestApi"
import {  setParticularRequestData, setParticularRequestsData } from "../../../store/Slices/particularRequestsSlice"
import { setRequestData, setRequestsData } from "../../../store/Slices/requestsSlice"
import { createToast, questionAlert } from "../../Notifications/Notifications"

export const getAllRequests = async (dispatch: any)=>{
    try{
        const allRequests = await getAllRequestsApi()
        const orderRequests = allRequests.data.sort((a: any, b: any) => {
            if (a.request.date > b.request.date) {
              return -1;
            }
            if (a.request.date < b.request.date) {
              return 1;
            }
            return 0;
        })
        dispatch(setRequestsData(orderRequests))
    }
    catch(err){
        console.log(err)
    }
}
export const getAllParticularRequests = async (dispatch: any)=>{
    try{
        const allRequests = await getAllParticularRequestsApi()
        const orderRequests = allRequests.data.sort((a: any, b: any) => {
            if (a.request.date > b.request.date) {
              return -1;
            }
            if (a.request.date < b.request.date) {
              return 1;
            }
            return 0;
        })
        dispatch(setParticularRequestsData(orderRequests))
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

export const getParticularRequestById = async (dispatch: any, id:string)=>{
    try{
        const request = await getParticularRequestsByIdApi(id)
        dispatch(setParticularRequestData(request.data))
    }
    catch(err){
        console.log(err)
    }
}

// export const getDeceasedByRequestId = async (dispatch: any, id:string)=>{
//     try{
//         const deceased = await getDeceasedByRequestIdApi(id)
//         dispatch(setRequestData(deceased.data))
//     }
//     catch(err){
//         console.log(err)
//     }
// }

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
        ()=>alertDeleteRequest(id, router),
        "No se elimino la solicitud"
    )
}
