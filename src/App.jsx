import React,{ useEffect, useState } from 'react'
import GameList from './GameList';
import PacmanLoader from "react-spinners/PacmanLoader";
import './App.css'

function App() {
  const errorList = [500, 502, 503, 504, 507, 508, 509]
  const [gameData, setGameData] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [errorStatus, setErrorStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000)
  const url = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/';
  const headers = {
    'dev-email-address': 'luannpraxedes@gmail.com'
  };
  
  const genres = [...new Set(gameData.map(game => game.genre))];

  useEffect(() => {
    const fetchData = async () => {
      fetch(url, { headers, signal: controller.signal})
      .then(response => {
        setErrorStatus(response.status)
        return response.json()
      })
      .then(data => {
        setGameData(data);
        setIsLoading(false);
      })
      .catch(error => {
        if(error.name==="AbortError") {
          setErrorStatus("timeout");
        }
        setIsLoading(false);
      });
    };

    fetchData();
  }, []);

  const filteredData = gameData.filter(game =>
    (selectedGenre === '' || game.genre === selectedGenre) &&
    game.title.includes(searchFilter)
  );

  if (isLoading) {
    return (
      <div className='loading-container'>
        <PacmanLoader color= "#ffff00" loading={isLoading}/>
      </div>
    )
  }

  if (errorList.includes(errorStatus)) {
    return (
      <div>
        <h3>O servidor falhou em responder, tente recarregar a página</h3>
      </div>
    )
  }

  else if (errorStatus==="timeout") {
    return (
      <div>
        <h3>O servidor demorou para responder, tente mais tarde</h3>
      </div>
    )
  }
  
  else if (errorStatus>=300) {
    return (
      <div>
        <h3>O servidor não conseguirá responder por agora, tente voltar novamente mais tarde</h3>
      </div>
    )
  }

  return (
    <>
      <header className='page-header'>
        <h1>Game Catalogue</h1>
        <input
        type="text"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        placeholder="Search by game name"
        />
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </header>
      <div>
        <GameList games={filteredData} />
      </div>
    </>
  )
}

export default App
