import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import EntertainmentItems from './EntertainmentItems';

function SearchResults({ searchQueryRes }) {
  const searchQuery = useSelector((state) => state.searchQuery);
  const searchResult = searchQueryRes.filter((el) => {
    const title = el.title.toLowerCase();
    const searchQueryLowerCase = searchQuery.toLowerCase();

    return title.includes(searchQueryLowerCase);
  });

  const resultAmount = searchResult.length;

  if (resultAmount === 0) {
    return (
      <div className="h-calc-custom-2">
        <h1 className="font-light text-2xl sm:text-3xl mb-5 mt-8 text-customRed">
          No results found
        </h1>
      </div>
    );
  }


  return (
    <div className="h-calc-custom-2">
      <EntertainmentItems
        title={`Found ${resultAmount} results for '${searchQuery}'`}
        entertainment={searchResult}
      />
    </div>
  );
}

SearchResults.propTypes = {
  searchQueryRes: PropTypes.arrayOf(
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

export default SearchResults;
