import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import MovieSearch from './Components/MovieSearch';
import utilsObject from './Utils/utils';
import Favourites from './Components/Favourites';


class App extends Component {

  constructor() {
    super();
    let favourites = localStorage.getItem('favouriteMovies') ? JSON.parse(localStorage.getItem('favouriteMovies')) : {};
    this.state = {
      dataForMovieSearched : {},
      favourites : favourites
    }
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <div className="navDiv">
            <NavLink exact to="/" activeClassName="activeNavs">Movie Search</NavLink>
            <NavLink exact to="/favourites" activeClassName="activeNavs">Favourites</NavLink>
          </div>
          
          <Switch>

            <Route exact path="/" render={(props) => { return <MovieSearch {...props} movieData={this.state.dataForMovieSearched} searchMovie={(url) => this.searchMovie(url)} favouriteUnfavourites={(movieObject) => this.favouriteUnfavourites(movieObject)}/>}} ></Route>

            <Route exact path="/favourites" render={(props) => { return <Favourites {...props} favourites={this.state.favourites} favouriteUnfavourites={(movieObj) => this.favouriteUnfavourites(movieObj)}/>}}></Route>

          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  checkIsFavourite(dataForMovieSearched) {
    let favourites = Object.assign({}, this.state.favourites);
    if(dataForMovieSearched.Response === 'True' && favourites[dataForMovieSearched.imdbID]) {
      dataForMovieSearched.favourites = true;
    }
  }

  async searchMovie(url) {
    let fetchMovieData = await utilsObject.fetchResult(url);
    let dataForMovieSearched = Object.assign({}, this.state.dataForMovieSearched);
    dataForMovieSearched = fetchMovieData;
    this.checkIsFavourite(dataForMovieSearched);
    this.setState({dataForMovieSearched : dataForMovieSearched});
  }

  favouriteUnfavourites(movieObj) {
    let favourites = Object.assign({}, this.state.favourites);
    movieObj.favourites = !movieObj.favourites;

    if(movieObj.favourites && !favourites[movieObj.imdbID]) {
      favourites[movieObj.imdbID] = movieObj;
    } else {
      delete favourites[movieObj.imdbID];
    }

    localStorage.setItem('favouriteMovies', JSON.stringify(favourites));
    this.setState({favourites : favourites});
  }
}

export default App;
