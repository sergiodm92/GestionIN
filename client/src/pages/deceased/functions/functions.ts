import { getDeceasedByIdApi, putDeceasedTombstoneApi } from './../../../services/deceasedApi';
import { getAllDeceasedApi } from "../../../services/deceasedApi"
import { setDeceasedData, setDeceasedsData } from "../../../store/Slices/deceasedSlice"
import { createToast } from '../../../components/Notifications/Notifications';

export const getAllDeceased = async (dispatch: any)=>{
    try{
        const allDeceased = await getAllDeceasedApi()
        dispatch(setDeceasedsData(allDeceased.data))
    }
    catch(err){
        console.log(err)
    }
}

export const getDeceasedById = async (dispatch: any, id: string)=>{
    try{
        const deceased = await getDeceasedByIdApi(id)
        dispatch(setDeceasedData(deceased.data))
    }
    catch(err){
        console.log(err)
    }
}

export const putDeceasedTombstone = async (id: string)=>{
    try{
        const response = await putDeceasedTombstoneApi(id)
        if (response.data) {
            createToast("success","Lápida agregada");
          } else {
            createToast("error","Verifique que los datos ingresados sean correctos");
          }
    }
    catch(err){
        createToast("warning","ocurrio un error, vuelva a intentar");
        console.log(err)
    }
}