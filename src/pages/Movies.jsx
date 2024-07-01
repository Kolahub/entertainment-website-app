// import React from 'react'
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllEntertainmentData } from "../store/entertainmentDataActions.js";
import EntertainmentItems from "../components/EntertainmentItems";
import PageLoader from "../components/PageLoader";
import useAuthProtection from "../Hooks/useAuthProtection";
import SearchResults from "../components/SearchResults.jsx";

function Movies() {
  useAuthProtection();
  const dispatch = useDispatch();
  const entertainmentdata = useSelector((state) => state.entertainmentData);
  const searchQuery = useSelector((state) => state.searchQuery);
  const movies = entertainmentdata.filter((el) => el.category === "Movie");

  useEffect(() => {
    dispatch(getAllEntertainmentData());
  }, [dispatch]);

  return (
    <section className="flex flex-col lg:flex-row" id="Movie">
      <Sidebar />
      <div className="font-custom w-full text-white pl-5 sm:pl-8 lg:pl-0 pt-8 sm:pt-3 lg:pt-16 overflow-x-hidden">
        <Search placeholder="movies" />

        {searchQuery ? (
          <SearchResults searchQueryRes={movies} />
        ) : (
          <>
            {entertainmentdata.length > 0 ? (
              <EntertainmentItems title="Movies" entertainment={movies} />
            ) : (
              <PageLoader />
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Movies;
