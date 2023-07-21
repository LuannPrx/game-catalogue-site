import React, { useState } from 'react';
import './GameList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { firestore } from '../firebase/config';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const GameList = ({ games, user }) => {
  const [userGames, setUserGames] = useState([])
  const navigate = useNavigate();

  if(user){
    const userDocExists = async () => {
      const docSnap = await getDoc(doc(firestore, "users", user.email))
      if(docSnap.exists()) {
        return true
      } else {
        return false
      }
    }

    if (!userDocExists) {
      setDoc(doc(firestore, "users", user.email), {
        games: []
      })
    }
  }

  if(user){
    const unsub = onSnapshot(doc(firestore, "users", user.email), (doc) => {
      setUserGames(doc.data().games);
    });
  }

  const updateFavorite = (gameId) => {
    if(user) {
      const updateIndex = userGames.findIndex((game) => game.gameId === gameId)

      if( updateIndex !== -1){
        userGames[updateIndex].favorite = !userGames[updateIndex].favorite
      } else {
        userGames.push({
          gameId: gameId,
          favorite: true,
          rating: 0
        })
      }
      
      setDoc(doc(firestore, "users", user.email), {
        games: userGames
      })
    }  else {
      navigate("/auth")
    }
  }

  const updateRating = (gameId, rating) => {
    if(user) {
      const updateIndex = userGames.findIndex((game) => game.gameId === gameId)

      if( updateIndex !== -1){
        userGames[updateIndex].rating = rating
      } else {
        userGames.push({
          gameId: gameId,
          favorite: false,
          rating: rating
        })
      }
      
      setDoc(doc(firestore, "users", user.email), {
        games: userGames
      })
    }  else {
      navigate("/auth")
    }
  }

  const isFavorite = (gameId) => {
    const gameIndex = userGames.findIndex((userGame) => userGame.gameId === gameId)
    if(gameIndex !== -1) {
      if (userGames[gameIndex].favorite) {
        return true
      }
    }
    return false
  }

  const gameRating = (gameId) => {
    const gameIndex = userGames.findIndex((userGame) => userGame.gameId === gameId)
    if(gameIndex !== -1) {
      if (userGames[gameIndex].rating !== 0) {
        return userGames[gameIndex].rating
      }
    }
    return 0
  }

  return (
    <>
    <div className="game-list">
      {games.map((game) => {
        return (
        <div key={game.id} className="game-item">
          <div className='game-summary'>
            <a href={game.freetogame_profile_url} target="_blank" rel="noopener noreferrer">
              <img src={game.thumbnail} alt={game.title} />
            </a>
            <h3>{game.title}</h3>
            <div className='game-icons'>
              <div className="game-rating">
                {[...Array(4)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={
                        index <= gameRating(game.id)
                        ? "on" : "off"
                      }
                      onClick={() => updateRating(game.id, index)}
                    >
                      <span className="star">&#9733;</span>
                    </button>
                  );
                })}
              </div>
              <button 
                onClick={() => updateFavorite(game.id)}
                className={
                  isFavorite(game.id)
                  ? "favorite" : "off"
                }
              >
                <FontAwesomeIcon icon={faHeart} className='heart-icon'/>
              </button>
            </div>
            <p>{game.short_description}</p>
          </div>
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
      )})}
    </div>
    </>
  );
};

export default GameList;
