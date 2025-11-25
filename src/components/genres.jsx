import React, { Component } from "react";
class Genres extends Component {
    render() {
        const { genres, selectedGenre, onSelect } = this.props;
        return (
            <ul className="list-group text-center">
                {genres.map((genre) => (
                    <li
                        onClick={() => {
                            onSelect(genre);
                        }}
                        style={{ cursor: "pointer" }}
                        className={`list-group-item ${selectedGenre.id === genre.id ? "active" : ""}`}
                        key={genre.id}>
                        {genre.name}
                    </li>
                ))}
            </ul>
        );
    }
}

export default Genres;
