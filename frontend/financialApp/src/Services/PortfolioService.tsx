import axios from "axios"
import { handleError } from "../Helpers/ErrorHandler"
import { POrtfolioGet, PortfolioPost} from "../Models/PortfolioModel";


const api = "https://localhost:7042/api/portfolio/";

export const portfolioAddAPI = async ( symbol: string)=>{
    try{
        const data = axios.post<PortfolioPost>(api+`?symbol=${symbol}`)
        return data;
    }catch(e){
        handleError(e);
    }
}

export const portfolioDeleteAPI = async ( symbol: string)=>{
    try{
        const data = axios.delete<PortfolioPost>(api+`?symbol=${symbol}`)
        return data;
    }catch(e){
        handleError(e);
    }
}

export const portfolioGetAPI = async ( )=>{
    try{
        const data = await axios.get<POrtfolioGet[]>(api)
        return data;
    }catch(e){
        handleError(e);
    }
}