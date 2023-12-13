import { getAllCoffinTransfersApi } from "../../../services/transferApi"
import { setCoffinTransfersData } from "../../../store/Slices/transfersSlice"

export const getAllCoffinTransfers = async (dispatch: any)=>{
    try{
        const transfers = await getAllCoffinTransfersApi()
        dispatch(setCoffinTransfersData(transfers.data))
    }
    catch(err){
        console.log(err)
    }
  }