import React, { useState } from "react";
import "../styles/MobileSearch.css";
import { RiSearchLine } from "react-icons/ri";
import { BsBookmarkFill } from "react-icons/bs";
import empty from "../assets/search.svg";
import Spinner from "./spinner";

const MobileSearch = ({
  submitRecipe,
  recipesRef,
  data,
  getSingleRec,
  bookmarkData,
  isLoading,
  setShowMobileSearch,
}) => {
  const [active, setActive] = useState("");

  return (
    <section className="showMobile">
      <form onSubmit={submitRecipe} className="mobileMainSearch">
        <input type="text" placeholder="Search Recipes" ref={recipesRef} />
        <button>
          <RiSearchLine size={18} />
          Search
        </button>
      </form>

      {data?.recipes?.length > 0 && (
        <h2 className="mobCount">Search Result ({data?.recipes?.length})</h2>
      )}

      {isLoading && <Spinner />}

      {!isLoading && (
        <section className="mobList">
          {data?.recipes?.length > 0 ? (
            <>
              {data?.recipes?.map((recipe) => (
                <div
                  className={`recipesList ${
                    active === recipe?.id ? "active" : "notActive"
                  }`}
                  key={recipe.id}
                  onClick={() => {
                    getSingleRec(recipe.id);
                    setActive(recipe.id);
                    setShowMobileSearch(false);
                  }}
                >
                  <img src={recipe.image_url} alt="" />

                  <div className="recipesInfo">
                    <h3>
                      {recipe?.title?.length > 25
                        ? `${recipe?.title?.slice(0, 23)}...`
                        : recipe?.title}
                    </h3>
                    <span>{recipe.publisher}</span>
                  </div>

                  {bookmarkData?.find((rec) => rec.id === recipe.id) ? (
                    <p className="searchBookmarked">
                      <BsBookmarkFill color="white" />
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="emptySearch">
              <img src={empty} alt="empty" />
              <p>Search Recipe for List</p>
            </div>
          )}
        </section>
      )}

      <div
        className="closeMMobile"
        onClick={(e) => {
          e.stopPropagation();
          setShowMobileSearch(false);
        }}
      >
        Close
      </div>
    </section>
  );
};

export default MobileSearch;
