import axios from 'axios';
import 'babel-polyfill';
import { formatDate, compare } from '../utils/utils';

const initialState = {
  songs: [],
  hasSearched: false,
  loading: false,
};

const GET_SONGS_FROM_API = 'GET_SONGS_FROM_API';
const START_LOADING = 'START_LOADING';
const STOP_LOADING = 'STOP_LOADING';

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

const stopLoadingOnError = () => {
  return {
    type: STOP_LOADING,
  };
};

export const getSongsFromAPI = (
  artistSlug,
  startDate,
  endDate
) => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://itunes.apple.com/search?term=${artistSlug}&media=music&entity=song&attribute=artistTerm&limit=200`,
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );

    let songArray = data.results;

    if (startDate) {
      const checkStartDate = formatDate(startDate);
      songArray = songArray.filter(
        song => song.releaseDate.slice(0, 10) >= checkStartDate
      );
    }

    if (endDate) {
      const checkEndDate = formatDate(endDate);
      songArray = songArray.filter(
        song => song.releaseDate.slice(0, 10) <= checkEndDate
      );
    }

    // sorts songs in chronological order
    songArray.sort(compare);

    dispatch(getSongs(songArray));
  } catch (error) {
    console.error(error);
    dispatch(stopLoadingOnError());
    alert('Something went wrong internally. Please try again.');
  }
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
    case STOP_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default songReducer;
