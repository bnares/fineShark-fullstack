import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CompanyProfile } from '../../company';
import { getCompanyProfile } from '../../api';
import Sidebar from '../../Components/Sidebar/Sidebar';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Tile from '../../Components/Tiles/Tile';
import Spinner from '../../Components/Spinners/Spinner';
import TenKFinder from '../../Components/TenKFinder/TenKFinder';

interface Props{

}

function CompanyPage({}:Props) {
  let {ticker} = useParams();
  const [companyState, setCompanyState] = useState<CompanyProfile>();
  const [serverError, setServerError] = useState<string | null>(null);

  const getCompanyData = async () =>{
    if(typeof ticker === 'string'){
      const company = await getCompanyProfile(ticker);
      console.log("company varialble: ", company);
      if(typeof company === 'string') setServerError(company);
      else if(Array.isArray(company.data)){
        setCompanyState(company.data[0]);
      }

    }else{
      setServerError("Wrong Url, no campany name");
    }
    
  }

  useEffect(()=>{
    getCompanyData();
  },[])
  
  console.log("companyState: ", companyState);
  return (
    <div>
      {companyState ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
        <Sidebar />
        <CompanyDashboard ticker={ticker!}>
          <Tile title='Company Name' subTitle={companyState.companyName}/>
          <Tile title='Price' subTitle={"$"+companyState.price.toString()}/>
          <Tile title='Sector' subTitle={companyState.sector}/>
          <Tile title='DCF' subTitle={"$"+(Math.round(companyState.dcf*100)/100).toString()}/>
          <TenKFinder ticker={companyState.symbol} />
          <p className='bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4'>
            {companyState.description}
          </p>
          
        </CompanyDashboard>
      </div>
      ) : (<Spinner />)}
    </div>
  )
}

export default CompanyPage
