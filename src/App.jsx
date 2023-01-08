import { useState, useRef, useEffect } from "react";
import { useMutation } from "react-query";
import { getRecipe, getSingleRecipe } from "./store/api";
import Search from "./components/Search";
import Error from "./components/Error";
import Bookmark from "./components/Bookmark";
import Logo from "./components/Logo";
import "./styles/Navbar.css";
import SearchRecipes from "./components/SearchRecipes";
import SingleRecipe from "./components/singleRecipe/SingleRecipe";
import { ShowBookmark } from "./components/ShowBookmark";
import MobileSearch from "./components/MobileSearch";

function App() {
  const [error, setError] = useState("");
  const [bookmarkData, setBookmarkData] = useState([]);
  const [showBookmark, setShowBookmark] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const recipesRef = useRef();

  const { mutate, data, isLoading } = useMutation(["user"], getRecipe);

  const {
    mutate: mutateRec,
    data: dataRec,
    isLoading: isLoadingRec,
  } = useMutation(getSingleRecipe);

  const submitRecipe = (e) => {
    e.preventDefault();

    if (!recipesRef.current.value) {
      setError("Input Field is empty!");

      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    mutate(recipesRef.current.value);
    recipesRef.current.value = "";
  };

  const getSingleRec = (id) => {
    if (!id) return;
    mutateRec(id);
  };

  useEffect(() => {
    const result = localStorage.getItem("recipe");
    const localData = result ? JSON.parse(result) : [];
    setBookmarkData(localData);

    mutateRec("5ed6604591c37cdc054bc886");
  }, []);

  useEffect(() => {
    if (data && data.recipes?.length === 0) {
      setError("Unable to find the recipe, Try other Recipe!");
    }

    setTimeout(() => {
      setError("");
    }, 4000);
  }, [data]);

  return (
    <main className="App">
      <header>
        <nav>
          <Logo />
          <Search
            recipesRef={recipesRef}
            submitRecipe={submitRecipe}
            setShowMobileSearch={setShowMobileSearch}
          />
          <Bookmark setShowBookmark={setShowBookmark} />
        </nav>
      </header>

      <section className="content">
        <article>
          {data?.recipes?.length > 0 && (
            <h2>Search Result ({data?.recipes?.length})</h2>
          )}
          <SearchRecipes
            isLoading={isLoading}
            data={data}
            getSingleRec={getSingleRec}
            bookmarkData={bookmarkData}
          />
        </article>

        <SingleRecipe
          isLoading={isLoadingRec}
          data={dataRec?.recipe}
          setError={setError}
          bookmarkData={bookmarkData}
          setBookmarkData={setBookmarkData}
        />
      </section>

      {showBookmark && (
        <ShowBookmark
          setShowBookmark={setShowBookmark}
          bookmarkData={bookmarkData}
          getSingleRec={getSingleRec}
          setBookmarkData={setBookmarkData}
          setError={setError}
        />
      )}
      {showMobileSearch && (
        <MobileSearch
          recipesRef={recipesRef}
          submitRecipe={submitRecipe}
          data={data}
          getSingleRec={getSingleRec}
          bookmarkData={bookmarkData}
          isLoading={isLoading}
          setShowMobileSearch={setShowMobileSearch}
        />
      )}
      {error && <Error error={error} />}
    </main>
  );
}

export default App;
