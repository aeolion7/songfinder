import axios from 'axios';
import 'babel-polyfill';

const initialState = {
  songs: [],
};

const GET_SONGS_FROM_API = 'GET_SONGS_FROM_API';

const getSongs = songs => {
  return {
    type: GET_SONGS_FROM_API,
    songs,
  };
};

export const getSongsFromAPI = artistSlug => async dispatch => {
  const { data } = await axios.get(
    `https://itunes.apple.com/search?term=${artistSlug}&media=music&entity=song&attribute=artistTerm&limit=200`,
    { headers: { 'Access-Control-Allow-Origin': '*' } }
  );
  dispatch(getSongs(data));
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS_FROM_API:
      return { ...state, songs: action.songs };
    default:
      return state;
  }
};

export default songReducer;
