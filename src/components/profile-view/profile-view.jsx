import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { setUser, updateUser } from '../../actions/actions';
import { connect } from 'react-redux';

import './profile-view.scss';



export class ProfileView extends React.Component {

    constructor() {
        super();

        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: []
        };
    }

    componentDidMount() {
        const accessToken = localStorage
            .getItem('token');
        this
            .getUser(accessToken);
    }


    getUser(token) {
        const username = localStorage
            .getItem('user');
        axios
            .get(`https://mysterious-refuge-92228.herokuapp.com//users/${username}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                this
                    .setState({
                        Username: response.data.Username,
                        Password: response.data.Password,
                        Email: response.data.Email,
                        Birthday: response.data.Birthday,
                        FavoriteMovies: response.data.FavoriteMovies
                    });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    editUser(e) {
        e.preventDefault();
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://mysterious-refuge-92228.herokuapp.com/users/${username}`,
            {
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday
                });
                localStorage.setItem('user',
                    this.state.Username);
                const data = response.data;
                console.log(data);
                console.log(this.state.Username);
                alert("Profile has been updated.");
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onRemoveFavorite(id) {
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://mysterious-refuge-92228.herokuapp.com/users/${username}/movies/` + (id), {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                console.log(response);
                alert("Movie was removed");
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onDeleteUser() {

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        axios.delete(`https://mysterious-refuge-92228.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                console.log(response);
                alert('Profile has been deleted.');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open('/', '_self');
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    setUsername(value) {
        this.state.Username = value;
    }

    setPassword(value) {
        this.state.Password = value;
    }

    setEmail(value) {
        this.state.Email = value;
    }

    setBirthday(value) {
        this.state.Birthday = value;
    }


    render() {

        const { user, username, movies } = this.props;
        console.log("movies", movies);
        console.log("log user", user);


        return (
            <Container>
                <Card
                    className="card">
                    <Card.Body
                        className="card-body">
                        <Card.Title>
                            Profile Information
                        </Card.Title>
                        <Card.Text>
                            Username: {`${user.Username}`}
                        </Card.Text>
                        <Card.Text>
                            Password: {`${user.Password}`}
                        </Card.Text>
                        <Card.Text>
                            Email: {`${user.Email}`}
                        </Card.Text>
                        {user.Birthday &&
                            <Card.Text>
                                Birthdate: {`${user.Birthday}`}
                            </Card.Text>}
                        <Link
                            to={`/users/update/${user.Username}`}>
                            <Button
                                className="button-update"
                                variant="link">
                                Update Profile
                            </Button>
                        </Link>

                        <Link
                            to={`/users/${user}`}>
                            <Button
                                className="button-deregister"
                                user={username}
                                variant="link"
                                onClick={() => {
                                    this.handleDelete();
                                }}
                            >
                                Deregister
                            </Button>
                        </Link>
                    </Card.Body>
                </Card>
                <Row className="justify-content-center">
                    <h3>Favourite Films</h3>
                </Row>
                <Row
                    className="favourite-movies">
                    {movies.map((movie) => {
                        if (this.state.FavoriteMovies.includes(movie._id)) {
                            return <MovieCard
                                key={movie._id} movie={movie} />;
                        }
                    })}
                </Row>
            </Container>
        );
    }
}

let mapStateToProps = state => {
    return {
        user: state.user,
        movies: state.movies
    }
}

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);