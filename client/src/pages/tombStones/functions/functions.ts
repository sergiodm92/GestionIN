import { getDeceasedWithoutTombstoneApi } from "../../../services/deceasedApi"
import { setDeceasedsData } from "../../../store/Slices/deceasedSlice"

export const getDeceasedesWithoutTombStone = async (dispatch: any)=>{
    try{
        const Deceaseds = await getDeceasedWithoutTombstoneApi()
        dispatch(setDeceasedsData(Deceaseds.data))
    }
    catch(err){
        console.log(err)
    }
}