import { getAllAddsApi } from "../../../services/addApi"
import { setAddsData } from "../../../store/Slices/addsSlice"
import { setAddData } from '../../../store/Slices/addsSlice';
import { getAddsByIdApi } from './../../../services/addApi';

export const getAddsById = async (dispatch: any, id:string)=>{
    try{
        const add = await getAddsByIdApi(id)
        dispatch(setAddData(add.data.data))
    }
    catch(err){
        console.log(err)
    }
}

export const getAllAdds = async (dispatch: any)=>{
    try{
        const allAdds = await getAllAddsApi()
        dispatch(setAddsData(allAdds.data))
    }
    catch(err){
        console.log(err)
    }
}