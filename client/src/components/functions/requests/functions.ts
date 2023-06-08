import { getDeceasedByRequestIdApi } from "../../../services/deceasedApi"
import { getAllRequestsApi, getRequestsByIdApi } from "../../../services/requestApi"
import { setRequestsData, setRequestData } from "../../../store/Slices/requestsSlice"

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
