import axios from 'axios';
import 'babel-polyfill';

const initialState = {
  songs: [],
  hasSearched: false,
  loading: false,
};

const GET_SONGS_FROM_API = 'GET_SONGS_FROM_API';
const START_LOADING = 'START_LOADING';

const getSongs = songs => {
  return {
    type: GET_SONGS_FROM_API,
    songs,
  };
};

export const startLoading = () => {
  return {
    type: START_LOADING,
  };
};

export const getSongsFromAPI = (
  artistSlug,
  startYear,
  endYear
) => async dispatch => {
  const { data } = await axios.get(
    `https://itunes.apple.com/search?term=${artistSlug}&media=music&entity=song&attribute=artistTerm&limit=200`,
    { headers: { 'Access-Control-Allow-Origin': '*' } }
  );

  let songArray = data.results;

  if (startYear) {
    songArray = songArray.filter(
      song => song.releaseDate.slice(0, 4) >= startYear
    );
  }

  if (endYear) {
    songArray = songArray.filter(
      song => song.releaseDate.slice(0, 4) <= endYear
    );
  }

  function compare(a, b) {
    if (a.releaseDate < b.releaseDate) return -1;
    if (a.releaseDate > b.releaseDate) return 1;
    return 0;
  }

  // sorts songs in chronological order
  songArray.sort(compare);

  dispatch(getSongs(songArray));
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS_FROM_API:
      return {
        ...state,
        songs: action.songs,
        hasSearched: true,
        loading: false,
      };
    case START_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default songReducer;
