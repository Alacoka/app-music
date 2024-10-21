import React from 'react';

const MusicPlayer = ({ song }) => {
    if (!song) return null;

    return (
        <div>
            <h2>Now Playing:</h2>
            <p>{song.name} - {song.artist}</p>
            <audio controls>
                <source src={song.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default MusicPlayer;
