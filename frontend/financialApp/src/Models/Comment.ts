export type NewComment = {
    
        title: string,
        content: string,
        //createdOn: Date,
        stockId: number | null
    
}

export type CommentGet = {
        title: string,
        content: string,
        createdBy: string,
}