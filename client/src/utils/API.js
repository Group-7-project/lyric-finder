require('dotenv').config();
const { apiKey } = process.env;

// get request for popular Lyrics for initial page load
export const getPopularLyrics = () => {
    return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.apiKey}&language=en-US&page=1`);
}

// search for a single Lyric title
export const searchLyrics = (lyricTitle) => {
    return fetch(`https://api.themoviedb.org/3/search/movie/?api_key=55def83f6c5739d768f4cf225b79eed3&language=en-US&query=${lyricTitle}&page=1`)
}

// route to get logged in user's info (needs the token)
export const getMe = (token) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
};
  
  export const createUser = (userData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
};
  
  export const loginUser = (userData) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
};

// save Lyric data for a logged in user
export const saveLyric = (lyricData, token) => {
    return fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(lyricData)
    });
};

// remove a saved lyric 
export const deleteLyric = (lyricId, token) => {
    return fetch(`/api/users/lyrics/${lyricId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
};