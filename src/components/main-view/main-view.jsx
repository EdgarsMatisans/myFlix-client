// import React from 'react';
// import axios from 'axios';

// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// import { MovieCard } from '../movie-card/movie-card';
// import { MovieView } from '../movie-view/movie-view';
// import { LoginView } from '../login-view/login-view';
// import { RegistrationView } from '../registration-view/registration-view';
// // import { DirectorView } from '../director-view/director-view';
// // import { GenreView } from '../genre-view/genre-view';
// // import { Userview } from '../user-view/user-view';

// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// export class MainView extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             movies: [],
//         }
//     }

//     componentDidMount() {
//         let accessToken = localStorage.getItem('token');
//         if (accessToken !== null) {
//             this.setState({
//                 user: localStorage.getItem('user')
//             });
//             this.getMovies(accessToken);
//         }
//     }

//     getMovies(token) {
//         axios.get('https://mysterious-refuge-92228.herokuapp.com/movies', {
//             headers: { Authorization: `Bearer ${token}` }
//         })
//             .then(response => {
//                 // Assign the result to the state
//                 this.setState({
//                     movies: response.data
//                 });
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }



//     setSelectedMovie(newSelectedMovie) {
//         this.setState({
//             selectedMovie: newSelectedMovie
//         });
//     }

//     onLoggedIn(authData) {
//         console.log(authData);
//         this.setState({
//             user: authData.user.Username
//         });

//         localStorage.setItem('token', authData.token);
//         localStorage.setItem('user', authData.user.Username);
//         this.getMovies(authData.token);
//     }

//     onLoggedOut() {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         this.setState({
//             user: null
//         });
//         window.open("/", "_self");
//     }

//     render() {
//         const { movies, user } = this.state;

//         if (!user)
//             return <Row>
//                 <Col>
//                     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
//                 </Col>
//             </Row>
//         if (movies.length === 0) return <div className="main-view" />;

//         return (
//             <Router>
//                 <Row className="main-view justify-content-md-center">
//                     <Route exact path="/" render={() => {
//                         if (!user)
//                             return
//                         <Col>
//                             <LoginView onLoggedIn={user =>
//                                 this.onLoggedIn(user)} />
//                         </Col>
//                         // Before the movies have been loaded
//                         if (movies.length === 0) return <div className="main-view"></div>
//                         return movies.map(m => (
//                             <Col md={3} key={m._id}>
//                                 <MovieCard movie={m}
//                                 />
//                             </Col>
//                         ))
//                     }}
//                     />

//                     <Route path="/register" render={() => {
//                         if (user)
//                             return <Redirect to="/" />
//                         return <Col>
//                             <RegistrationView />
//                         </Col>
//                     }}
//                     />

//                     <Route path="/movies/:movieId" render={({ match, history }) => {
//                         if (!user)
//                             return
//                         <Col>
//                             <LoginView onLoggedIn={user =>
//                                 this.onLoggedIn(user)}
//                             />
//                         </Col>
//                         if (movies.length === 0) return <div className="main-view" />;
//                         return <Col md={8}>
//                             <MovieView movie={movies.find(m => m._id === match.params.movieId)}
//                                 onBackClick={() => history.goBack()}
//                             />
//                         </Col>
//                     }}
//                     />

//                     <Route
//                         path="/directors/:Name"
//                         render={({ match, history }) => {
//                             if (!user)
//                                 return (
//                                     <LoginView onLoggedIn={(user) =>
//                                         this.onLoggedIn(user)} />
//                                 );
//                             if (movies.length === 0) return <div className="main-view" />;
//                             return (
//                                 <Col md={8}>
//                                     <DirectorView
//                                         Director={
//                                             movies.find(
//                                                 (m) => m.Director.Name === match.params.Name).Director
//                                         }
//                                         movies={movies}
//                                         onBackClick={() => history.goBack()}
//                                     />
//                                 </Col>
//                             );
//                         }}
//                     />

//                     <Route
//                         path="/genres/:Name"
//                         render={({ match, history }) => {
//                             if (!user) return (
//                                 <LoginView onLoggedIn={(user) =>
//                                     this.onLoggedIn(user)}
//                                 />
//                             );
//                             if (movies.length === 0) return <div className="main-view" />;
//                             return (
//                                 <Col md={8}>
//                                     <GenreView
//                                         movies={movies}
//                                         Genre={
//                                             movies.find((m) => m.Genre.Name === match.params.Name).Genre
//                                         }
//                                         onBackClick={() => history.goBack()}
//                                     />
//                                 </Col>
//                             );
//                         }}
//                     />


//                 </Row>
//             </Router>
//         );
//     }
// }

// export default MainView;



import React from "react";
import axios from "axios";

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Routes,
} from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
// import { DirectorView } from '../director-view/director-view';
// import { GenreView } from '../genre-view/genre-view';
// import { Userview } from '../user-view/user-view';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
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
            .then((response) => {
                // Assign the result to the state
                this.setState({
                    movies: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie,
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

    render() {
        const { movies, user } = this.state;

        // if (!user)
        //   return (
        //     <Row>
        //       <Col>
        //         <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
        //       </Col>
        //     </Row>
        //   );
        // if (movies.length === 0) return <div className="main-view" />;

        return (
            <Router>
                <Row className="main-view justify-content-md-center">
                    <Route
                        exact
                        path="/"
                        render={() => {
                            if (!user) {
                                return (
                                    <Col>
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    </Col>
                                );
                            }

                            // Before the movies have been loaded
                            if (movies.length === 0) return <div className="main-view"></div>;
                            return movies.map((m) => (
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            ));
                        }}
                    />

                    <Route
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

export default MainView;
