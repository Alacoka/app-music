import React from 'react';

const SongList = ({ songs, onSelectSong }) => {
    return (
        <ul>
            {songs.map((song, index) => (
                <li key={index} onClick={() => onSelectSong(song)}>
                    {song.name} - {song.artist}
                </li>
            ))}
        </ul>
    );
};

export default SongList;
