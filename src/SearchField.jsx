import React from "react";

function SearchInput({ value, onChange, onButtonClick }) {
  return (
    <div>
      <input
        type='text'
        value={value}
        placeholder='Enter word'
        onChange={onChange}
      />
      <button onClick={onButtonClick}>Get Definition</button>
    </div>
  );
}

export default SearchInput;
