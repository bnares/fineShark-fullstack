import React from 'react'
import { CommentGet } from '../../Models/Comment'
import StockCommentListItem from './StockCommentListItem/StockCommentListItem'

type Props = {
    comments: CommentGet[]
}

function StockCommentList({comments}:Props) {
    console.log("stockCommentList comment: ", comments);
  return (
    <>
        {comments ? comments.map((comment,idx)=>{
            return <StockCommentListItem comment = {comment} key={idx} />
        }) : (
            ""
        )}
    
    </>
  )
}

export default StockCommentList
