import React from "react";
import { RiSearchLine } from "react-icons/ri";

const Search = ({ recipesRef, submitRecipe, setShowMobileSearch }) => {
  return (
    <>
      <form onSubmit={submitRecipe} className="mainSearch">
        <input type="text" placeholder="Search Recipes" ref={recipesRef} />
        <button>
          <RiSearchLine size={18} />
          Search
        </button>
      </form>

      <form className="mobileSearch" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search Recipes"
          onClick={() => setShowMobileSearch(true)}
        />
        <button>
          <RiSearchLine size={15} />
          Search
        </button>
      </form>
    </>
  );
};

export default Search;
