import React, { useState } from "react";
import Spinner from "./spinner";
import "../styles/SearchRecipe.css";
import empty from "../assets/search.svg";
import { BsBookmarkFill } from "react-icons/bs";

const SearchRecipes = ({ isLoading, data, getSingleRec, bookmarkData }) => {
  const [active, setActive] = useState("");

  if (isLoading) return <Spinner />;

  return (
    <section className="searchRecipe">
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
  );
};

export default SearchRecipes;
