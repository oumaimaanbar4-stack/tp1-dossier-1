import React, { Component } from "react";
export default class Navbar extends Component {
    render() {
        const { moviesList, onSelectList, selectedList } = this.props;
        return (
            <nav className="navbar navbar-expand-md bg-secondary-subtle">
                <div className="container-fluid">
                    <span className="navbar-brand h1 mb-1">Movies</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="navbar-nav">
                            {moviesList.map((list, index) => (
                                <li key={index} className="nav-item">
                                    <a
                                        onClick={() => {
                                            onSelectList(list);
                                        }}
                                        style={{ cursor: "pointer" }}
                                        className={`link-primary nav-link text-${selectedList === list ? "dark" : "muted"}`}>
                                        {list.replace("_", " ").toUpperCase()}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

