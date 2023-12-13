import { getAllDeceasedApi } from "../../../services/deceasedApi"
import { setDeceasedsData } from "../../../store/Slices/deceasedSlice"
import { AppDispatch } from "../../../store/store"

export const getDeceasedesWithoutTombStone = async (dispatch: AppDispatch)=>{
    try{
        const data = await getAllDeceasedApi()
        const deceaseds = data.data.filter((deceased: any) => deceased.tombstone!=="dispatched" && deceased.tombstone!=="null")
        const orderDeceased = deceaseds.sort((a: any, b: any) => {
            if (a.date > b.date) {
              return 1;
            }
            if (a.date < b.date) {
              return -1;
            }
            return 0;
        })
        dispatch(setDeceasedsData(orderDeceased))
    }
    catch(err){
        console.log(err)
    }
}