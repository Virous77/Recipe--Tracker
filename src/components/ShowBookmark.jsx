import React from "react";
import "../styles/Bookmark.css";
import bookImg from "../assets/bookmark.svg";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";

export const ShowBookmark = ({
  setShowBookmark,
  bookmarkData,
  getSingleRec,
  setBookmarkData,
  setError,
}) => {
  const clearBookmark = () => {
    localStorage.removeItem("recipe");
    setBookmarkData([]);
    setError("All Recipes are removed from Bookmark!");
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const filterBookmark = (recipe) => {
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
  };

  return (
    <>
      <div className="overLay" onClick={() => setShowBookmark(false)}></div>
      <section className="showBookmark">
        <div className="bookmarkHead">
          <h2>Bookmark</h2>

          <AiOutlineClose
            color="black"
            size={21}
            cursor={"pointer"}
            onClick={() => setShowBookmark(false)}
          />
        </div>

        {bookmarkData?.length > 0 ? (
          <div className="showBookList">
            {bookmarkData?.map((recipe) => (
              <div
                className="recipesList notActive"
                key={recipe.id}
                onClick={() => {
                  getSingleRec(recipe.id);
                  setShowBookmark(false);
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

                <p className="searchBookmarked">
                  <AiOutlineDelete
                    color="white"
                    size={24}
                    onClick={(e) => {
                      e.stopPropagation();
                      filterBookmark(recipe);
                    }}
                  />
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="emptySearch">
            <img src={bookImg} alt="empty" />
            <p>Your BookMark List is empty</p>
          </div>
        )}

        {bookmarkData?.length > 0 && (
          <b onClick={clearBookmark}>Clear BookMark</b>
        )}
      </section>
    </>
  );
};
