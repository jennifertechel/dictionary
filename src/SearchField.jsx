import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchInput({ value, onChange, onButtonClick }) {
  return (
    <div className='searchInput'>
      <input
        type='text'
        value={value}
        placeholder='Enter word'
        onChange={onChange}
      />
      <button onClick={onButtonClick}>
        <CiSearch />
      </button>
    </div>
  );
}

export default SearchInput;
