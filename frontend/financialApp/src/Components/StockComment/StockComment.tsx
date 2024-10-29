import React, { useEffect, useState } from 'react'
import StockCommentForm from './StockCommentForm/StockCommentForm'
import { CommentGet } from '../../Models/Comment'
import { AddComment, commentGetAPI } from '../../Services/CommentsService'
import { toast } from 'react-toastify'
import Spinner from '../Spinners/Spinner'
import StockCommentList from '../StockCommentList/StockCommentList'

type Props ={
    stockSymbol:string
}

type CommentFormInputs = {
  title: string,
  content: string,
  
}

function StockComment({stockSymbol}:Props) {
  const [comments, setComments] = useState<CommentGet[] | null>(null);
  const [loading, setLoading] = useState<boolean>();

  const handleSubmitComment = (form: CommentFormInputs)=>{
    console.log("submitign form: ", form);
    //title: string, content: string, companySymbol:string, stockId: number, date : Date 
    AddComment(form.title, form.content, stockSymbol).then((res)=>{
        if(res){
            toast.success("Comment Created");
            getComments();
        }
    }).catch((e)=>{
        toast.warning(e);
    });
}

  const getComments =async ()=>{
    setLoading(true);
    await commentGetAPI(stockSymbol).then((res)=>{
      setLoading(false);
      setComments(res?.data!)
    })
  }

  useEffect(()=>{
    getComments();
  },[])

  return (
    <div className='flex flex-col'>
      {loading ? <Spinner /> : <StockCommentList comments={comments!}/>}
      <StockCommentForm symbol={stockSymbol} handleSubmitComment={handleSubmitComment}/>
    </div>
  )
}

export default StockComment
