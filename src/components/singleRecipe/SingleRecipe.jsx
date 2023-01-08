import React from "react";
import Spinner from "../Spinner";
import { GiCook } from "react-icons/gi";
import { RiCreativeCommonsByLine } from "react-icons/ri";
import Ingredient from "./Ingredient";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import Contact from "./Contact";
import "../../styles/SingleRecipe.css";

const SingleRecipe = ({
  isLoading,
  data,
  setError,
  bookmarkData,
  setBookmarkData,
}) => {
  const saveBookmark = (recipe) => {
    if (!recipe) return;
    const result = localStorage.getItem("recipe");
    const localData = result ? JSON.parse(result) : [];
    const findData = localData?.find((rec) => rec.id === recipe.id);

    if (findData) {
      const saveData = localData?.filter((rec) => rec.id !== recipe.id);
      localStorage.setItem("recipe", JSON.stringify(saveData));
      setBookmarkData(saveData);
      setError(
        `${
          recipe.title?.length > 23
            ? `${recipe.title.slice(0, 23)}...`
            : recipe.title
        } removed from Bookmark!`
      );
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    localStorage.setItem("recipe", JSON.stringify([...localData, recipe]));
    setBookmarkData([...localData, recipe]);
    setError(
      `${
        recipe.title?.length > 23
          ? `${recipe.title.slice(0, 23)}...`
          : recipe.title
      } added to Bookmark!`
    );
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="singleRecMain">
      <img src={data?.image_url} alt="" />

      <div className="singleRecInfo">
        <h1>{data?.title}</h1>

        <div className="cookRec">
          <div className="cookingTime">
            <span>
              <GiCook color="rgb(253, 112, 135)" /> Cook:- {data?.cooking_time}{" "}
              Minutes
            </span>
            <span>
              <RiCreativeCommonsByLine color="rgb(253, 112, 135)" /> Serving:-{" "}
              {data?.servings}
            </span>
          </div>

          <p>
            {bookmarkData &&
            bookmarkData?.find((rec) => rec?.id === data?.id) ? (
              <BsBookmarkFill color="pink" onClick={() => saveBookmark(data)} />
            ) : (
              <BsBookmark onClick={() => saveBookmark(data)} />
            )}
          </p>
        </div>
      </div>

      <Ingredient ing={data?.ingredients} />
      <Contact publisher={data?.publisher} source={data?.source_url} />
    </section>
  );
};

export default SingleRecipe;
