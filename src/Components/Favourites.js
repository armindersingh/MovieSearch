import React, { Fragment } from 'react';
import MovieCard from './MovieCard';
import './Favourites.css';

const Favourites = (props) => {
    return (
        <div className="favouritesContainer">
            {
                Object.entries(props.favourites).map(([key, value]) => {
                    return (<Fragment key={key}>
                        <MovieCard movieObj={value} favouriteUnfavourites={() => props.favouriteUnfavourites(value)}/>
                    </Fragment>)
                })
            }
        </div>
    );
}

export default Favourites;