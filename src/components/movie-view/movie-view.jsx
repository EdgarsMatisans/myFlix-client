import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

    componentDidMount() {
        document.addEventListener('keypress', event => {
            console.log(event.key);
        });
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <Link to={`/genres/${movie.Genre.Name}`} className="value">{movie.Genre.Name}</Link>

                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <Link to={`/directors/${movie.Director.Name}`} className="value">{movie.Director.Name}</Link>

                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>

            </div>
        );
    }
}