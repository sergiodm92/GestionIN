import { getAddCoffinByIdApi, getAllAddsCoffinApi } from "../../../services/addCoffinApi"
import { getAddProductsByIdApi, getAllAddsProductsApi } from "../../../services/addProductsApi";
import { setAddsData, setAddData } from "../../../store/Slices/addsCoffinSlice"
import { setAddProdData, setAddsProdData } from "../../../store/Slices/addsProductsSlice";

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
        const orderAdds = allAdds.data.sort((a: any, b: any) => {
            if (a.date > b.date) {
              return 1;
            }
            if (a.date < b.date) {
              return -1;
            }
            return 0;
        })
        dispatch(setAddsData(orderAdds))
    }
    catch(err){
        console.log(err)
    }
}

export const getAddProductsById = async (dispatch: any, id:string)=>{
    try{
        const add = await getAddProductsByIdApi(id)
        dispatch(setAddProdData(add.data.data))
    }
    catch(err){
        console.log(err)
    }
}

export const getAllAddsProducts = async (dispatch: any)=>{
    try{
        const allAdds = await getAllAddsProductsApi()
        const orderAdds = allAdds.data.sort((a: any, b: any) => {
            if (a.date > b.date) {
              return 1;
            }
            if (a.date < b.date) {
              return -1;
            }
            return 0;
        })
        dispatch(setAddsProdData(orderAdds))
    }
    catch(err){
        console.log(err)
    }
}