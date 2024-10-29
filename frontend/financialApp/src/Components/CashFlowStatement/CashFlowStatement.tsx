import React, { useEffect, useState } from 'react'
import { CompanyCashFlow } from '../../company';
import { useOutletContext } from 'react-router';
import Table from '../Table/Table';
import { getCashFLow } from '../../api';
import Spinner from '../Spinners/Spinner';
import { formatLargeMonetaryNumber } from '../../Helpers/NumberFormating';

interface Props{

}

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashUsedForInvestingActivites),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(
        company.netCashUsedProvidedByFinancingActivities
      ),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.commonStockIssued),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.freeCashFlow),
  },
  ];

function CashFlowStatement({}:Props) {
    const ticker = useOutletContext<string>();
    const [cashFlowData, setCashFLowData] = useState<CompanyCashFlow[]>();
    const [serverError, setServerError] = useState();

    useEffect(()=>{
        const getCashflow = async ()=>{
            try{
                const result = await getCashFLow(ticker);
                console.log("result in cashflow: ",result);
                setCashFLowData(result?.data);
            }catch(e : any){
                setServerError(e);
            }
            
        }
        getCashflow();
    },[])

  return (
    cashFlowData ? (
        <Table data={cashFlowData} configs={config} />
    ) : (
        <>
            <Spinner />
        </>
    )
  )
}

export default CashFlowStatement
