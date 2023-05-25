import { getAllDeceasedApi } from "../../../services/deceasedApi"
import { setDeceasedsData } from "../../../store/Slices/deceasedSlice"

export const getAllDeceased = async (dispatch: any)=>{
    try{
        const allDeceased = await getAllDeceasedApi()
        dispatch(setDeceasedsData(allDeceased.data))
    }
    catch(err){
        console.log(err)
    }
}