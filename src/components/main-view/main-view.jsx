import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                {
                    _id: "619815065345f8c3362abc82",
                    Title: 'Shrek',
                    Description: 'A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.',
                    ImagePath: "https://www.imdb.com/title/tt0126029/mediaviewer/rm955136512/?ref_=tt_ov_i"
                },
                {
                    _id: "619815a45345f8c3362abc83",
                    Title: "Shrek 2",
                    Description: "Shrek and Fiona travel to the Kingdom of Far Far Away, where Fiona's parents are King and Queen, to celebrate their marriage. When they arrive, they find they are not as welcome as they thought they would be.",
                    ImagePath: "https://www.imdb.com/title/tt0298148/mediaviewer/rm183384576/?ref_=tt_ov_i"
                },
                {
                    _id: "6198176d5345f8c3362abc85",
                    Title: "Shrek the Third",
                    Description: "Reluctantly designated as the heir to the land of Far, Far Away, Shrek hatches a plan to install the rebellious Artie as the new king while Princess Fiona tries to fend off a coup d'état by the jilted Prince Charming.",
                    ImagePath: "https://www.imdb.com/title/tt0413267/mediaviewer/rm4214262784/?ref_=tt_ov_i"
                }

            ],
        }
    }

    componentDidMount() {
        axios.get('https://mysterious-refuge-92228.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }


    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                    ))
                }
            </div>
        );
    }
}

export default MainView;
