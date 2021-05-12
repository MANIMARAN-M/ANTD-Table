import React from "react";
import { useState } from "react";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const searhClick = () => {
    if (query) {
      console.log(query);
    }
  };
  const updateQuery = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        name="search"
        placeholder="Search"
        onChange={updateQuery}
        value={query}
      />
      <button onClick={searhClick} data-testid="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBox;
