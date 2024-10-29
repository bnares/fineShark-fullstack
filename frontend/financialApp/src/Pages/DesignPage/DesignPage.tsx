import React from 'react'
import Table from '../../Components/Table/Table'
import RatioList from '../../Components/RatioList/RatioList'
import { testIncomeStatementData } from '../../Components/Table/testData'

interface Props{

}

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: any)=>company.marketCapTTM,
    subTitle:"Total value of all a company's shares of stock"
  }
]
function DesignPage({}:Props) {
  return (
    <div>
      <h1>FinShark Design Page</h1>
      <h2>This is Finshark's design Page. This is where we will house various design aspcects of app</h2>
      <RatioList data={testIncomeStatementData} config={tableConfig}/>
      <Table  data={testIncomeStatementData} configs={tableConfig}/>
    </div>
  )
}

export default DesignPage
