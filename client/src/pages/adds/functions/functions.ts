import { getAddCoffinByIdApi, getAllAddsCoffinApi } from "../../../services/addCoffinApi"
import { setAddsData } from "../../../store/Slices/addsCoffinSlice"
import { setAddData } from '../../../store/Slices/addsCoffinSlice';

export const getAddCoffinById = async (dispatch: any, id:string)=>{
    try{
        const add = await getAddCoffinByIdApi(id)
        dispatch(setAddData(add.data.data))
    }
    catch(err){
        console.log(err)
    }
}

export const getAllAddsCoffin = async (dispatch: any)=>{
    try{
        const allAdds = await getAllAddsCoffinApi()
        dispatch(setAddsData(allAdds.data))
    }
    catch(err){
        console.log(err)
    }
}