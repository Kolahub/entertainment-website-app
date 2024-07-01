// import React from 'react'
import PropTypes from "prop-types";
import iconPlay from "/assets/icon-play.svg";
import bookmarkIcon from "/assets/icon-bookmark-empty.svg";
import bookmarkedIcon from "/assets/icon-bookmark-full.svg";
import { updateBookmarkData } from "../store/entertainmentDataActions";
import { useDispatch } from "react-redux";

function EntertainmentItems({ title, entertainment }) {
  const dispatch = useDispatch();
  function bookmarkHandler(id) {
    dispatch(updateBookmarkData(id));
  }
  return (
    <div className="mt-8">
      <h1 className="font-light text-2xl sm:text-3xl mb-5">{title}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pr-5 sm:pr-8 pb-16 mt-10">
        {entertainment.map((el, i) => (
          <div key={`${el.id}${i}`}>
            <div className="">
              <div
                className={`relative w-full h-28 sm:h-48 lg:h-44 bg-cover rounded-t-xl cursor-pointer transition-all group`}
                style={{
                  backgroundImage: `url(${el.thumbnail.regular.large})`,
                }}
              >
                <div className="absolute inset-0 bg-black opacity-0 top-0 left-0 bottom-0 right-0 group-hover:opacity-30 transition-opacity"></div>

                <div className="absolute z-10 top-[65%] sm:top-[45%] left-1/2 -translate-x-1/2 sm:-translate-y-[45%] -translate-y-[65%] w-28 h-12">
                  <div className="absolute inset-0 bg-white p-2 opacity-0 group-hover:opacity-40 transition-opacity  rounded-full "></div>
                  <div className="hidden group-hover:block">
                    <img
                      src={iconPlay}
                      alt=""
                      className="absolute left-2 top-1/2 -translate-y-1/2"
                    />
                    <p className="absolute top-1/2 -translate-y-1/2 right-6">
                      Play
                    </p>
                  </div>
                </div>

                <button
                  className="absolute z-30 h-6 w-6 sm:h-10 sm:w-10 right-4 top-4"
                  onClick={() => bookmarkHandler(el.id)}
                >
                  <div className="absolute z-10 inset-0 bg-black opacity-30 rounded-full"></div>
                  <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {el.isBookmarked ? (
                      <img src={bookmarkedIcon} alt="" />
                    ) : (
                      <img src={bookmarkIcon} alt="" />
                    )}
                  </div>
                </button>
              </div>
              <div className="flex gap-1 sm:gap-2 items-center font-light text-sm sm:text-base mt-2">
                <p>{el.year}</p>
                <p>&#x2022;</p>
                <div className="">
                  {el.category === "Movie" ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="inline-block w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"
                          fill=" #FFFFFF"
                        />
                      </svg>{" "}
                      {el.category}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg
                        className="inline-block w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z"
                          fill=" #FFFFFF"
                        />
                      </svg>{" "}
                      {el.category}
                    </span>
                  )}
                </div>
                <p>&#x2022;</p>
                <p>{el.rating}</p>
              </div>
              <h1 className="text-lg">{el.title}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

EntertainmentItems.propTypes = {
  title: PropTypes.string.isRequired,
  entertainment: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired,
      isBookmarked: PropTypes.bool.isRequired,
      thumbnail: PropTypes.shape({
        trending: PropTypes.shape({
          large: PropTypes.string.isRequired,
        }),
        regular: PropTypes.shape({
          large: PropTypes.string.isRequired,
        }),
      }).isRequired,
    })
  ).isRequired,
};

export default EntertainmentItems;
