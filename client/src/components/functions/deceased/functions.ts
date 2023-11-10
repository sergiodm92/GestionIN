import { getDeceasedByIdApi, putDeceasedTombstoneApi } from '../../../services/deceasedApi';
import { getAllDeceasedApi } from "../../../services/deceasedApi"
import { setDeceasedData, setDeceasedsData } from "../../../store/Slices/deceasedSlice"
import { createToast } from '../../Notifications/Notifications';

export const getAllDeceased = async (dispatch: any)=>{
    try{
        const allDeceased = await getAllDeceasedApi()
        const orderDeceased = allDeceased.data.sort((a: any, b: any) => {
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

export const getDeceasedById = async (dispatch: any, id_doc: string)=>{
    try{
        const deceased = await getDeceasedByIdApi(id_doc)
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
            createToast("success","Se agregado correctamente");
          } else {
            createToast("error","Verifique que los datos ingresados sean correctos");
          }
    }
    catch(err){
        createToast("warning","ocurrio un error, vuelva a intentar");
        console.log(err)
    }
}