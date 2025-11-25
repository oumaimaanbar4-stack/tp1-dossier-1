import React, { Component } from "react";
import Movie from "./movie";
// import Details from "./details";
import { Link, Outlet } from "react-router-dom";

class Movies extends Component {
    render() {
        const { movies, selectedList, selectedGenre, onShowDetails, isLoading } = this.props;
        return (
            <div className="row g-3">
                <h1>
                    {selectedList.replace("_", " ").toUpperCase() || selectedGenre.name.toUpperCase()}{" "}
                    {isLoading && <i className="spinner-border lead"></i>}
                </h1>
                {movies.map((movie) => (
                    <div key={movie.id} className="col-lg-6 col-xl-3 col-xxl-3">
                        <Link to={`/movies/${movie.id}`}>
                            <Movie key={movie.id} movie={movie} onShowDetails={onShowDetails} />
                        </Link>
                    </div>
                ))}
                <Outlet />
            </div>
        );
    }
}

export default Movies;