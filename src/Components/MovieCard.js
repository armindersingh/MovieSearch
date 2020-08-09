import React from 'react';
import './MovieCard.css';

const MovieCard = (props) => {
    return (
        <div className="movieCardContainer">
            <img src={props?.movieObj?.Poster} alt="No Image Found"/>
            <p>{props?.movieObj?.Title}</p>
            <p>{props?.movieObj?.Released}</p>
            <p className={`addRemoveFavouritesText ${props.movieObj.favourites ? "removeFavourite" : "addFavourite"}`} onClick={props.favouriteUnfavourites}>{props.movieObj.favourites ? 'Remove From Favourites' : 'Add To Favourites'}</p>
        </div>
    )
}

export default MovieCard;