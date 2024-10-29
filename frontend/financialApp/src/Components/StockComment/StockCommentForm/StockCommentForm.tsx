import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from "yup"
import { AddComment, commentGetAPI } from '../../../Services/CommentsService'
import { useAuth } from '../../../Context/useAuth'
import { toast } from 'react-toastify'

type Props = {
    symbol: string,
    handleSubmitComment: (form:CommentFormInputs)=>void;
    
}

type CommentFormInputs = {
    title: string,
    content: string,
    
}

const validation = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    content: Yup.string().required("Contnet is Required"),
    
})


function StockCommentForm({symbol, handleSubmitComment}:Props) {
    const {user} = useAuth();
    
    const {register, handleSubmit, formState:{errors}} = useForm<CommentFormInputs>({
        resolver:yupResolver(validation)
    })

    

    // const handleSubmitComment = (form: CommentFormInputs)=>{
    //     console.log("submitign form: ", form);
    //     //title: string, content: string, companySymbol:string, stockId: number, date : Date 
    //     AddComment(form.title, form.content, symbol).then((res)=>{
    //         if(res){
    //             toast.success("Comment Created");
                
    //         }
    //     }).catch((e)=>{
    //         toast.warning(e);
    //     });
    // }
    
  return (
    <div>
      <form className="mt-4 ml-4" onSubmit={handleSubmit(handleSubmitComment)}>
        
        
      <input
        type="text"
        id="title"
        className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Title"
        {...register("title")}
      />
      
      {errors.title ? <p className='text-red-600'>{errors.title.message}</p>: ""}
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label htmlFor="comment" className="sr-only">
          Your comment
        </label>
        <textarea
          id="comment"
          rows={6}
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder="Write a comment..."
          required
          {...register("content")}
        ></textarea>
        {errors.content ? <p className='text-red-600'>{errors.content.message}</p> : ""}
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-lightGreen rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        Post comment
      </button>
    </form>
    </div>
  )
}

export default StockCommentForm
