import React, { useEffect, useState } from 'react'
import { CompanySearch } from '../../company';
import { searchCompanis } from '../../api';
import Navbar from '../../Components/Navbar/Navbar';
import Search from '../../Components/Search/Search';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';
import { POrtfolioGet } from '../../Models/PortfolioModel';
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from '../../Services/PortfolioService';
import { toast } from 'react-toastify';

interface Props{

}

function SearchPage({}:Props) {

  const [search, setSearch] = useState<string>("");
  const [selectOption, setSelectOption] = useState<string>(""); 
  const [portfolioValues, setPortfolioValues] = useState<POrtfolioGet[] | null>([])
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  //const [portfolioValues, setPortfolioValues] = useState([])

  const getPortfolio = async ()=>{
    await portfolioGetAPI().then((res)=>{
      if(res){
        setPortfolioValues(res.data);
      }
    }).catch(e=>{
      toast.warn("Could not get Portfolio values!")
    });

  }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value);
        console.log(e);
    }

    const onSearchSubmit = async (e: React.SyntheticEvent)=>{
        e.preventDefault();
        const result = await searchCompanis(search, selectOption);
        if(typeof result ==='string'){
          setServerError(result)
        }else if(Array.isArray(result.data)){
          setSearchResult(result.data);
        }
        console.log("searchResult: ",searchResult);
    }

    const onPortfolioCreate = (e: any)=>{
      e.preventDefault();
      portfolioAddAPI(e.target[0].value).then((res)=>{
        if(res?.status ===204){
          toast.success("Stock Added to Portfolio!");
          getPortfolio();
        }
      }).catch(e=>{
        toast.warning("Could not create portfolio item!");
      })
      
    }

    const onPortfolioDelete = (e: any)=>{
      e.preventDefault();
      portfolioDeleteAPI(e.target[0].value).then(res=>{
        if(res?.status===200){
          toast.success("Stock deleted from portfolio!");
          getPortfolio();
        } 
      })
      
    }

    useEffect(()=>{
      getPortfolio();
    },[])

    console.log("selectOption: ", selectOption);

  return (
    <div className='App'>
      {/* <Navbar /> */}
      
      <Search handleSearchChange = {handleSearchChange} search = {search} setSelectOption = {setSelectOption} onSearchSubmit={onSearchSubmit}/>
      <ListPortfolio portfolioValues ={portfolioValues!} onPortfolioDelete ={onPortfolioDelete} />
      {serverError && <h1>{serverError}</h1>}
      <CardList searchResult = {searchResult} onPortfolioCreate= {onPortfolioCreate} />
       
    </div>
  )
}

export default SearchPage
