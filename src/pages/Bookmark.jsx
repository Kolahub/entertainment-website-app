// import React from 'react'
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEntertainmentData } from "../store/entertainmentDataActions";
import EntertainmentItems from "../components/EntertainmentItems";
import PageLoader from "../components/PageLoader";
import useAuthProtection from "../Hooks/useAuthProtection";
import SearchResults from "../components/SearchResults";

function Bookmark() {
  useAuthProtection();
  const dispatch = useDispatch();
  const entertainmentdata = useSelector((state) => state.entertainmentData);
  const searchQuery = useSelector((state) => state.searchQuery);

  const bookmarkedAll = entertainmentdata.filter(
    (el) => el.isBookmarked === true
  );

  const bookmarkedMovies = entertainmentdata.filter(
    (el) => el.isBookmarked === true && el.category === "Movie"
  );
  const bookmarkedSeries = entertainmentdata.filter(
    (el) => el.isBookmarked === true && el.category === "TV Series"
  );

  useEffect(() => {
    dispatch(getAllEntertainmentData());
  }, [dispatch]);

  return (
    <section className="flex flex-col lg:flex-row" id="Bookmarked">
      <Sidebar />
      <div className="font-custom w-full text-white pl-5 sm:pl-8 lg:pl-0 pt-8 sm:pt-3 lg:pt-16 overflow-x-hidden">
        <Search placeholder="bookmarked shows" />
        {searchQuery ? (
          <SearchResults searchQueryRes={bookmarkedAll} />
        ) : (
          <>
            {entertainmentdata.length > 0 ? (
              <>
                <EntertainmentItems
                  title="Bookmarked Movies"
                  entertainment={bookmarkedMovies}
                />

                <EntertainmentItems
                  title="Bookmarked TV Series"
                  entertainment={bookmarkedSeries}
                />
              </>
            ) : (
              <PageLoader />
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Bookmark;
