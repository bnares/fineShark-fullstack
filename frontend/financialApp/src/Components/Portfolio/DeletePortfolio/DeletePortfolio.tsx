import React from 'react'
import { POrtfolioGet } from '../../../Models/PortfolioModel'

interface Props{
    onPortfolioDelete: (e: React.SyntheticEvent)=>void,
    portfolioValue: string
}
function DeletePortfolio({onPortfolioDelete, portfolioValue}:Props) {
  return (
    <div>
      <form onSubmit={onPortfolioDelete}>
        <input hidden={true} value={portfolioValue} />
        <button className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500">
          X
        </button>
      </form>
    </div>
  )
}

export default DeletePortfolio
