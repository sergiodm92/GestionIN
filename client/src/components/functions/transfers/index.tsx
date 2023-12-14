import { getAllCoffinTransfersApi, getCoffinTransferByIdApi } from "../../../services/transferApi"
import { setCoffinTransferData, setCoffinTransfersData } from "../../../store/Slices/transfersSlice"

export const getAllCoffinTransfers = async (dispatch: any)=>{
    try{
        const transfers = await getAllCoffinTransfersApi()
        dispatch(setCoffinTransfersData(transfers.data))
    }
    catch(err){
        console.log(err)
    }
  }

  export const getCoffinTransferById = async (dispatch: any, id:string)=>{
    try{
        const transfer = await getCoffinTransferByIdApi(id)
        dispatch(setCoffinTransferData(transfer.data.data))
    }
    catch(err){
        console.log(err)
    }
}