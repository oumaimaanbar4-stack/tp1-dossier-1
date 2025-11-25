import React, { Component } from "react";

class Movie extends Component {
    render() {
        const { title, overview, poster_path, original_title, release_date } = this.props.movie;
        const { movie, onShowDetails } = this.props;
        return (
            <div className="movie ">
                <div
                    className="card btn p-0 text-dark link-primary"
                    onClick={() => {
                        onShowDetails(movie);
                    }}>
                    <img
                        src={`https://media.themoviedb.org/t/p/w1920${poster_path}`}
                        alt={title || original_title}
                        className="card-img-top"
                    />
                    <div className="card-body">
                        <h5 className="card-title m-0">{title || original_title}</h5>
                        <p className="text-muted m-0">{release_date}</p>
                        <p className="card-text">
                            {overview.slice(0, 120)} <strong>...</strong>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Movie;
