import React from 'react';
import MovieCard from './MovieCard';
import './MovieSearch.css';

const MovieSearch = (props) => {
    let searchInput;
    let yearValue;
    let plotValue;
    let clickedSearchMovie = function() {
        let url = createUrl();
        props.searchMovie(url);
    }

    function checkMovieResponse() {
        return props.movieData.Response === 'True' ? true : false;
    }

    function createUrl() {
        let url = "http://www.omdbapi.com/?apikey=f47f441c";
        url = searchInput.value ? url + `&t=${searchInput.value.replace(/ /g, '+')}` : url ;
        url = yearValue.value ? url + `&y=${yearValue.value.replace(/ /g, '+')}` : url ;
        url = plotValue.value !== '' ? url + `&plot=${plotValue.value}` : url ;
        return url;
    }

    return (
        <div>
            <div className="searchDiv">
                <input class="searchInput" type="text" placeholder="Search movie name..." ref={(input) => { searchInput = input }}/>
                <input type="text" placeholder="Year" ref={(input) => { yearValue = input }}/>
                <select ref={(select) => plotValue = select}>
                    <option value="" defaultChecked >Select Plot</option>
                    <option value="short">Short</option>
                    <option value="full">Full</option>
                </select>
                <button onClick={clickedSearchMovie}> Search </button>
            </div>
            {checkMovieResponse() ? <div className="movieResult">
                <MovieCard movieObj={props.movieData} saveFavouritesToLS={(movieObject) => props.saveFavouritesToLS(movieObject)} favouriteUnfavourites={() => props.favouriteUnfavourites(props.movieData)}/>
            </div> : <p className="error">{props.movieData.Error}</p>}
        </div>
    );
}

export default MovieSearch;