import axios from "axios"
import { handleError } from "../Helpers/ErrorHandler"
import { CommentGet, NewComment } from "../Models/Comment"
import { toast } from "react-toastify";

const api = "https://localhost:7042/api/";

export const AddComment = async (title: string, content: string, companySymbol:string )=>{
   
    //console.log("title: ",title);
    //console.log("content: ", content);
    //console.log("company symbol: ", companySymbol);
    
    try{
        const data = await axios.post<NewComment>(api+"comment/"+companySymbol,{
            title,
            content,
           
        })
        console.log("data comment post: ", data);
        return data;

    }catch(error){
        handleError(error);
    }

}

export const commentGetAPI= async (symbol: string) =>{
    try{
        const data = await axios.get<CommentGet[]>(api+"comment/"+`?Symbol=${symbol}&IsDescending=true`);
        return data;
    }catch(error){
        handleError(error);
    }
}
