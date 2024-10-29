import React from 'react'
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio'
import { Link } from 'react-router-dom'
import { POrtfolioGet } from '../../../Models/PortfolioModel'

interface Props{
    portfolioValue: POrtfolioGet,
    onPortfolioDelete: (elem: any)=>void,
}
function CardPortfolio({portfolioValue,onPortfolioDelete}: Props) {
  return (
    <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
    <Link to={`/company/${portfolioValue.symbol}/company-profile`} className="pt-6 text-xl font-bold">{portfolioValue.symbol}</Link>
    <DeletePortfolio
      portfolioValue={portfolioValue.symbol}
      onPortfolioDelete={onPortfolioDelete}
    />
  </div>
  )
}

export default CardPortfolio
