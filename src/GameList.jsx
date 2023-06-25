import React from 'react';
import './GameList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faWindows } from '@fortawesome/free-brands-svg-icons';


const GameList = ({ games }) => {
  return (
    <div className="game-list">
      {games.map((game) => (
        <div key={game.id} className="game-item">
          <a href={game.freetogame_profile_url} target="_blank" rel="noopener noreferrer">
            <div className='game-summary'>
              <img src={game.thumbnail} alt={game.title} />
              <h3>{game.title}</h3>
              <p>{game.short_description}</p>
            </div>
          </a>
          <div className='game-tags'>
            <div className='tag' id='genre'>
              <span>{game.genre}</span>
            </div>
            <div className='tag'>
              <a href={game.game_url} target="_blank" rel="noopener noreferrer">
                {
                  game.platform==='PC (Windows)' 
                  ? <FontAwesomeIcon icon={faWindows} style={{color: "#929292",}} /> 
                  : game.platform==='PC (Windows), Web Browser'
                  ? <div className='platform-icons'>
                      <FontAwesomeIcon icon={faWindows} style={{color: "#929292",}} />
                      <FontAwesomeIcon icon={faGlobe} style={{color: "#929292",}} />
                    </div>
                  : <FontAwesomeIcon icon={faGlobe} style={{color: "#929292",}} />
                }
              </a>
            </div>
            <div className='tag'>
              <span>{game.developer}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameList;
