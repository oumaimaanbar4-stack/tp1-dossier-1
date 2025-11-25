import React, { useState,useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjM5YmJiZmU0MGY4NTI4M2JkODdjZTlkOGZkNWYxZCIsIm5iZiI6MTc2MTkwMTU3Mi4wMjEsInN1YiI6IjY5MDQ3YzA0Yzg5MDBkN2I0MDQ3MWQ4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nxPUIb9m8asyMsQ2FftrP9g7PhUi4npzUaZ1NX2Baqc",
    },
};

function Details() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    async function fetchDetailsMovie() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options);
        const data = await response.json();
        // console.log(data);
        if (data.success === false) {
            window.location.assign("/movies");
            return;
        }
        console.log(data);
        setMovie(data);
    }

    useEffect(() => {
        fetchDetailsMovie();
    }, [id]);
    

    if (!movie) return "";
    const {
        title,
        overview,
        poster_path,
        original_title,
        release_date,
        original_language,
        genres,
        runtime,
        tagline,
        backdrop_path,
    } = movie;

    return (
        <>
            {
                <div
                    id="details-container"
                    className="container-fluix fixed-top py-5 px-4 d-flex align-items-center justify-content-center h-100 m-0">
                    <div className="w-100  rounded-4 position-relative" style={{ backgroundColor: "#0b2035ff" }}>
                        <div
                            id="global-container"
                            style={{
                                backgroundImage: `linear-gradient(to right, #0b2035ff 5%, #0b2035c6 50%, #0b2035e7 90%), url(https://media.themoviedb.org/t/p/w1920${backdrop_path})`,
                            }}>
                            <header className="alert alert-dismissible position-absolute w-100 top-2 end-2">
                                <Link to="/movies">
                                    <button className="btn-close fs-4 bg-light rounded-circle p-2 m-3"></button>
                                </Link>
                            </header>

                            <main id="movie-detail">
                                <div className="container-lg d-flex align-items-center gap-4 px-4 py-lg-5 py-3">
                                    <aside id="image-container" className="py-lg-0 py-4">
                                        <img
                                            src={`https://media.themoviedb.org/t/p/w1920${poster_path}`}
                                            alt={title || original_title}
                                            className="rounded-4"
                                        />
                                    </aside>
                                    <aside id="info-container" className="py-3">
                                        <section>
                                            <h1>
                                                {title} <span>({release_date && release_date.slice(0, 4)})</span>
                                            </h1>
                                            <span className="m-0">
                                                {release_date} <span className="text-uppercase">({original_language})</span> •{" "}
                                                {genres.map((genre, index) => (index !== 0 ? ", " : "") + genre.name)} •{" "}
                                                {Math.floor(runtime / 60)}h {Math.floor(runtime % 60)}m
                                            </span>
                                        </section>

                                        <section>
                                            <h4>{tagline}</h4>
                                            <h3>Synposis:</h3>
                                            <p className="text-white form-text">{overview || "There's no overview at the moment !"}</p>
                                        </section>
                                    </aside>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default Details;


