import { getAddCoffinByIdApi, getAllAddsCoffinApi } from "../../../services/addCoffinApi"
import { getAddGeneralByIdApi, getAllAddsGeneralApi } from "../../../services/addGeneralApi";
import { getAddMetalBoxByIdApi, getAllAddsMetalBoxApi } from "../../../services/addMetalBoxApi";
import { setAddsData, setAddData } from "../../../store/Slices/addsCoffinSlice"
import { setAddGralData, setAddsGralData } from "../../../store/Slices/addsGeneralSlice";
import { setAddMBData, setAddsMBData } from "../../../store/Slices/addsMetalBoxSlice";

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

export const getAddGeneralById = async (dispatch: any, id:string)=>{
    try{
        const add = await getAddGeneralByIdApi(id)
        dispatch(setAddGralData(add.data.data))
    }
    catch(err){
        console.log(err)
    }
}

export const getAllAddsGeneral = async (dispatch: any)=>{
    try{
        const allAdds = await getAllAddsGeneralApi()
        dispatch(setAddsGralData(allAdds.data))
    }
    catch(err){
        console.log(err)
    }
}

export const getAddMetalBoxById = async (dispatch: any, id:string)=>{
    try{
        const add = await getAddMetalBoxByIdApi(id)
        console.log(add)
        dispatch(setAddMBData(add.data.data))
    }
    catch(err){
        console.log(err)
    }
}

export const getAllAddsMetalBox = async (dispatch: any)=>{
    try{
        const allAdds = await getAllAddsMetalBoxApi()
        dispatch(setAddsMBData(allAdds.data))
    }
    catch(err){
        console.log(err)
    }
}