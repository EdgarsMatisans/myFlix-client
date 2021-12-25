import React from "react";
import axios from "axios";
import { connect } from 'react-redux';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Routes,
} from "react-router-dom";
import { setMovies } from '../../actions/actions';
// import MoviesList from '../movies-list/movies-list';

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
// import { NavbarView } from "../navbar-view/navbar-view";
// import { DirectorView } from '../director-view/director-view';
// import { GenreView } from '../genre-view/genre-view';
// import { Userview } from '../user-view/user-view';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token");
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem("user"),
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios
            .get("https://mysterious-refuge-92228.herokuapp.com/movies", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                // Assign the result to the state
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username,
        });

        localStorage.setItem("token", authData.token);
        localStorage.setItem("user", authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
            user: null,
        });
        window.open("/", "_self");
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie,
        });
    }

    render() {
        let { movies } = this.props;
        let { user } = this.state;

        return (
            <Router>
                <Row className="main-view justify-content-md-center">
                    {/* route for link on main-view to movie-card, otherwise the login-view. */}
                    <Route
                        exact
                        path="/"
                        render={() => {
                            if (!user)
                                return (
                                    <Col>
                                        <LoginView
                                            onLoggedIn={(user) => this.onLoggedIn(user)}
                                        />
                                    </Col>
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return <MovieList movies={movies} />;
                        }}
                    />
                    {/* route for link on main-view to register-view */}
                    <Route
                        exact
                        path="/register"
                        render={() => {
                            if (user) return <Redirect to="/" />;
                            return (
                                <Col>
                                    <RegistrationView />
                                </Col>
                            );
                        }}
                    />

                    <Route
                        path="/movies/:movieId"
                        render={({ match, history }) => {
                            if (!user) {
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            }
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <Col md={8}>
                                    <MovieView
                                        movie={movies.find((m) => m._id === match.params.movieId)}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />

                    <Route
                        path="/directors/:Name"
                        render={({ match, history }) => {
                            if (!user) {
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            }
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <Col md={8}>
                                    <DirectorView
                                        Director={
                                            movies.find((m) => m.Director.Name === match.params.Name)
                                                .Director
                                        }
                                        movies={movies}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />

                    <Route
                        path="/genres/:Name"
                        render={({ match, history }) => {
                            if (!user) {
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            }
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <Col md={8}>
                                    <GenreView
                                        movies={movies}
                                        Genre={
                                            movies.find((m) => m.Genre.Name === match.params.Name)
                                                .Genre
                                        }
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />
                </Row>
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps,
    { setMovies })(MainView);
