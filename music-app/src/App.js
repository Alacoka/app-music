import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import MusicPlayer from './components/MusicPlayer';
import { getToken, login, logout } from './SpotifyAuth';

const App = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const _token = getToken();
    setToken(_token);

    if (!_token) {
      login();
    }
  }, []);

  const handleSearch = async (query) => {
    if (!token) {
      login();
      return;
    }

    try {
      const response = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: query,
          type: 'track',
          limit: 10,
        },
      });

      const tracks = response.data.tracks.items.map(track => ({
        name: track.name,
        artist: track.artists[0].name,
        preview_url: track.preview_url,
      }));

      setSongs(tracks);
      setCurrentSong(null); // Reseta a música atual para garantir que a nova seleção funcione corretamente
    } catch (error) {
      console.error('Error fetching data from Spotify API', error);
      if (error.response && error.response.status === 401) {
        // Token expirado, forçar login novamente
        login();
      }
    }
  };

  const handleSelectSong = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="App">
      <h1>Music App</h1>
      {token ? (
        <>
          <SearchBar onSearch={handleSearch} />
          <SongList songs={songs} onSelectSong={handleSelectSong} />
          <MusicPlayer song={currentSong} />
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login with Spotify</button>
      )}
    </div>
  );
};

export default App;
