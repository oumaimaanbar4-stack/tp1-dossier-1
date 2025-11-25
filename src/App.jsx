// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Component } from "react";
import Movies from "./components/movies";
import Genres from "./components/genres";
import Navbar from "./components/navbar";
import Details from "./components/details";
import PageNotFound from "./components/pageNotFound";

let url = "";
const genreUrl = "https://api.themoviedb.org/3/genre/movie/list";

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjM5YmJiZmU0MGY4NTI4M2JkODdjZTlkOGZkNWYxZCIsIm5iZiI6MTc2MTkwMTU3Mi4wMjEsInN1YiI6IjY5MDQ3YzA0Yzg5MDBkN2I0MDQ3MWQ4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nxPUIb9m8asyMsQ2FftrP9g7PhUi4npzUaZ1NX2Baqc",
    },
};

export default class App extends Component {
    state = {
        movies: [],
        genres: [],
        selectedGenre: { id: "", name: "" },
        moviesList: ["popular", "upcoming", "top_rated", "now_playing"],
        selectedList: "popular",
        loading: false,
        error: {
            code: undefined,
            message: "",
        },
    };

    fetchMovies = async () => {
        this.setState({ movies: [] });
        this.setState({ loading: true });
        if (this.state.selectedList) {
            url = `https://api.themoviedb.org/3/movie/${this.state.selectedList}`;
        } else if (this.state.selectedGenre.id) {
            url = `https://api.themoviedb.org/3/discover/movie?with_genres=${this.state.selectedGenre.id}`;
        }
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            const movies = data.results;

            // console.log(movies);
            this.setState({ movies });
        } catch (error) {
            this.setState({ error });
        }
        this.setState({ loading: false });
    };

    fetchGenresList = async () => {
        try {
            const response = await fetch(genreUrl, options);
            const data = await response.json();
            const genres = data.genres;
            this.setState({ genres });
        } catch (error) {
            this.setState({ error });
        }
    };

    handleSelectGenre = (genre) => {
        this.setState({ selectedGenre: genre, selectedList: "" });
    };

    handleSelectList = (list) => {
        this.setState({ selectedList: list, selectedGenre: { id: "", name: "" } });
    };

    handleShowDetails = (movie) => {
        this.setState({ selectedMovie: movie.id });
    };

    componentDidMount() {
        this.fetchMovies();
        this.fetchGenresList();
    }

    componentDidUpdate(prevProps, prevState) {
        const movieListChanged = this.state.selectedList !== prevState.selectedList;
        const genreChanged = this.state.selectedGenre !== prevState.selectedGenre;
        if (movieListChanged || genreChanged) {
            this.fetchMovies();
        }
    }

    render() {
        const { movies, genres, selectedGenre, moviesList, selectedList, loading } = this.state;
        return (
            <BrowserRouter>
                <header>
                    <Navbar 
                        moviesList={moviesList} 
                        selectedList={selectedList} 
                        onSelectList={this.handleSelectList} 
                    />
                </header>
                <main className="container my-4">
                    <div className="row">
                        <Routes>
                            <Route path="/" element={<Navigate to="/movies" replace />} />{/* quand on visite la racine du site /, fais une redirection automatique vers /movies, navigate est un composant de redirection, replace: remplace la page actuelle dans l'historique de navigateur donc l'utilisateur ne peut pas revenir a la page precedente*/ }

                            <Route
                                path="/movies"
                                element={
                                    <>
                                        {" "}
                                        <div className="col-md-4 col-lg-3 col-xl-2">
                                            <Genres 
                                                genres={genres} 
                                                selectedGenre={selectedGenre} 
                                                onSelect={this.handleSelectGenre} 
                                            />
                                        </div>
                                        <div className="col-md-8 col-lg-9 col-xl-10">
                                            <Movies
                                                movies={movies}
                                                selectedGenre={selectedGenre}
                                                selectedList={selectedList}
                                                onShowDetails={this.handleShowDetails}
                                                isLoading={loading}
                                            />
                                        </div>
                                    </>
                                }>
                                <Route path=":id" element={<Details />} />
                            </Route>
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </div>
                </main>
            </BrowserRouter>
        );
    }
}
