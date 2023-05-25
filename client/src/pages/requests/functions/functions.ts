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
        const Request = await getRequestsByIdApi(id)
        dispatch(setRequestData(Request.data))
    }
    catch(err){
        console.log(err)
    }
}
