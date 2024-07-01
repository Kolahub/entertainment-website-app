// import React from 'react'
import propTypes from 'prop-types'
import searchIcon from '/assets/icon-search.svg'
import { useDispatch } from 'react-redux'
import { entertainmentDataActions } from '../store'

function Search({ placeholder }) {
  const dispatch = useDispatch()

   function handleUpdateSearchQuery (e) {
    dispatch(entertainmentDataActions.updateSearchQuery(e.target.value))
  }

  return (
    <div className="flex gap-3 items-center pr-5 sm:pr-8">
    <img src={searchIcon} alt="" className='w-6 sm:w-8 h-6 sm:h-8'/>
    <input type="text" placeholder={`Search for ${placeholder}`} className='font-light text-xl sm:text-2xl bg-transparent border border-transparent focus:outline-none focus:border-b-white w-full caret-customRed p-3' onChange={(e) => handleUpdateSearchQuery(e)}/>
  </div>
  )
}

Search.propTypes = {
    placeholder: propTypes.string.isRequired
}

export default Search