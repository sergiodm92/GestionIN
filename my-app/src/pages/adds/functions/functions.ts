import { getAllAddsApi } from "../../../services/addApi"
import { setAddsData } from "../../../store/Slices/addsSlice"

export const getAllAdds = async (dispatch: any)=>{
    try{
        const allAdds = await getAllAddsApi()
        dispatch(setAddsData(allAdds.data))
    }
    catch(err){
        console.log(err)
    }
}