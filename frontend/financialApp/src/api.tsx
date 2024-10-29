import axios from "axios"
import { CompanyBalanceSheet, CompanyCashFlow, CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch, CompanyTenK } from "./company"
import { CLIENT_RENEG_WINDOW } from "tls";

interface SearchResponse{
    data:CompanySearch[]
}

export const searchCompanis = async (query: string, echange: string)=>{
    try{
        
        //console.log("api key: ", process.env.REACT_APP_API_KEY);
        const data = await axios.get<SearchResponse>(
            `https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&exchange=${echange}&apikey=${import.meta.env.VITE_REACT_APP_API_KEY}`
        );
        return data;
    }catch(e){
        if(axios.isAxiosError(e)){
            console.log("error message: ", e.message);
            return e.message;
            
        }else{
            console.log("unexpected error: ", e);
            return "An expected error has occured";
        }
    }
}

export const getCompanyProfile = async (trigger: string)=>{
    try{
        const data = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/api/v3/profile/${trigger}?apikey=${import.meta.env.VITE_REACT_APP_API_KEY}`
        )
        return data;
    }catch(e){
        console.warn(e);
        return "An unexpected error has occured: ";
    }
}

export const getKeyMetrics = async (query: string)=>{
    try{
        const data = await axios.get<CompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?apikey=${import.meta.env.VITE_REACT_APP_API_KEY}`
        )
        return data;
    }catch(e: any){
        console.warn(e);
        return e;
    }
}

export const getIncomeStatement = async (query: string)=>{
    try{
        const data = await axios.get<CompanyIncomeStatement[]>(
            `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=40&apikey=${import.meta.env.VITE_REACT_APP_API_KEY}`
        )
        return data;
    }catch(e: any){
        console.warn(e);
        return e;
    }
}

export const getBalanceSheet = async (query: string)=>{
    try{
        const data = await axios.get<CompanyBalanceSheet[]>(
            `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=40&apikey=${import.meta.env.VITE_REACT_APP_API_KEY}`
        )
        return data;
    }catch(e: any){
        console.warn(e);
        return e;
    }
}

export const getCashFLow = async (query: string)=>{
    try{
        const data = await axios.get<CompanyCashFlow[]>(
            `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=100&apikey=${import.meta.env.VITE_REACT_APP_API_KEY}`
        )
        return data;
    }catch(e){
        console.warn(e);
        return e;
    }
}

export const getTenK = async (query: string)=>{
    try{
        const data = await axios.get<CompanyTenK[]>(
            `https://financialmodelingprep.com/api/v3/sec_filings/${query}?type=10-k&page=0&apikey=${import.meta.env.VITE_REACT_APP_API_KEY}`
        )
        return data;
    }catch(e){
        console.warn(e);
        return e;
    }
}