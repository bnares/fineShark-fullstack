import React from 'react'
import "./CardList.css"
import Card from '../Card/Card'
import { CompanySearch } from '../../company'
import {v4 as uuidv4} from "uuid" 

interface Props{
  searchResult: CompanySearch[],
  onPortfolioCreate: (e:React.SyntheticEvent)=>void,
}

const CardList : React.FC<Props> =  ({searchResult,onPortfolioCreate}: Props) : JSX.Element => {

  return (
    <div>
      {
        searchResult.length>0 ?
        searchResult.map((item,idx)=>
          <Card 
           id={item.symbol} 
           key={uuidv4()} 
           searchResult={item}
           onPortfolioCreate = {onPortfolioCreate}
          />) :
          (
            <p className='mb-3 mt-3 text-xl font-semibold text-center md:text-xl'>No Results</p>
          )
      }
      
    </div>
  )
}

export default CardList
