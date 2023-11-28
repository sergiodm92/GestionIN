import { getAllDeceasedApi } from "../../../services/deceasedApi"
import { setDeceasedsData } from "../../../store/Slices/deceasedSlice"

export const getDeceasedesWithoutTombStone = async (dispatch: any)=>{
    try{
        const data = await getAllDeceasedApi()
        const deceaseds = data.data.filter((deceased: any) => deceased.tombstone!=="dispatched")
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