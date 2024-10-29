import React from 'react'
import {testIncomeStatementData} from "./testData"

//const data = testIncomeStatementData;
//type Company = (typeof data)[0];
// const configs = [
//     {
//         label:"Year",
//         render:(company:Company)=>company.acceptedDate,

//     },
//     {
//         label:"Cost of Revenue",
//         render: (company: Company)=>company.costOfRevenue
//     }
// ]

interface Props{
    configs:any,
    data: any,
}

function Table({configs, data}:Props) {
    const renderedRow = data.map((company:any)=>{
        return(
            <tr key={company.cik}>
                {configs.map((val:any)=>{
                    return(
                        <td className='p-4 whitespace-nowrap text-sm font-normal text-grey-900'>
                            {val.render(company)}
                        </td>
                    );
                })}
                
            </tr>
        )
    })
    const renderedHead = configs.map((config:any)=>{
        return(
            <th key={config.label} className='p-4 text-left text-xs font-medium text-fray-500 uppercase tracking-wider'>
                {config.label}
            </th>
        )
    })
  return (
    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 container mx-auto overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200 m-5 '>
        <thead className='bg-gray-50'>
            {renderedHead}
        </thead>
        <tbody className=''>
            {renderedRow}
        </tbody>
      </table>
    </div>
  )
}

export default Table
