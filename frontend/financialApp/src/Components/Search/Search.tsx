import React, { useState } from 'react'


interface Props{
  search: string | undefined,
  handleSearchChange: (e:React.ChangeEvent<HTMLInputElement>)=>void,
  onSearchSubmit:(e: React.SyntheticEvent)=>void,
  setSelectOption: (e: any)=>void,
}

const Search : React.FC<Props> = ({search, handleSearchChange, onSearchSubmit, setSelectOption}:Props) : JSX.Element=> {
     
  const onOptionChange = (e: any)=>{
    console.log("optionChange: ", e);
    setSelectOption(e.target.value);
  }

  return (
    <>
      <section className="relative bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <form
          className="form relative flex flex-col w-full p-10 space-y-4 bg-darkBlue rounded-lg md:flex-row md:space-y-0 md:space-x-3"
          onSubmit={onSearchSubmit}
        >
          <input
            className="flex-1 p-3 border-2 rounded-lg placeholder-black focus:outline-none"
            id="search-input"
            placeholder="Search companies"
            value={search}
            onChange={handleSearchChange}
          ></input>
          <select onChange={onOptionChange} className='flex-1 p-3 border-2 rounded-lg placeholder-black focus:outline-none'>
            <option value="WSE" selected>Warsaw Stock Exchange</option>
            <option value="NASDAQ">NASDAQ Global Select</option>
            <option value="LSE">London Stock Exchange</option>
            <option value="NYSE">New York Stock Exchange</option>
          </select>
        </form>
      </div>
    </section>
    </>
  )
}

export default Search
