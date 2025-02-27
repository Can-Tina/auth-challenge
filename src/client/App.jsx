import { useEffect, useState } from 'react';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react/cjs/react.production.min';
import './App.css';
import MovieForm from './components/MovieForm';
import UserForm from './components/UserForm';

const apiUrl = 'http://localhost:4000';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/movie`)
      .then(res => res.json())
      .then(res => setMovies(res.data));
  }, []);

  const handleRegister = async ({ username, password }) => {
    const user = {
      username: username,
      password: password
    }

    fetch("http://localhost:4000/user/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(res => setRegisterResponse(res))
  };

  const handleLogin = async ({ username, password }) => {
    const user = {
      username: username,
      password: password
    }

    fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(res => setLoginResponse(res))
      .then(res => localStorage.setItem('loginInfo', res))
  };

  const handleCreateMovie = async ({ title, description, runtimeMins }) => {
    const movie = {
      title: title,
      description: description,
      runtimeMins: runtimeMins
    }

    fetch("http://localhost:4000/movie/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem('loginInfo')
      },
      body: JSON.stringify(movie)
    })
      .then(res => res.json())
      .then(res => setMovies(res))
  }

  return (
    <div className="App">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />

      <h1>Create a movie</h1>
      <MovieForm handleSubmit={handleCreateMovie} />

      <h1>Movie list</h1>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Description: {movie.description}</p>
              <p>Runtime: {movie.runtimeMins}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;