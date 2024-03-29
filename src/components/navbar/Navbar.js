import React, { useState, useEffect } from "react";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchTerm } from "../../features/searchSlice";
import { useHistory } from "react-router-dom";
import { toggleTheme, selectTheme } from "../../features/themeSlice";

// images
import logo from "./images/reddit.png";
import logoNight from "./images/logo-ni.png";
import search from "./images/search.svg";
import searchNight from "./images/search-night.svg";
import day from "./images/day.svg";
// import github from "./images/github.png";
import night from "./images/night.svg";


export const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useSelector(selectTheme);

  // day-night switch for <html>
  let htmlElement = document.querySelector("html");
  useEffect(() => {
    if (!theme) {
      htmlElement.style.backgroundColor = "#121c2d";
    } else {
      htmlElement.style.backgroundColor = "#fcfcfc";
    }
  }, [theme, htmlElement.style]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(searchTerm);
    dispatch(changeSearchTerm({ searchTerm }));
    history.push(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <nav className={!theme ? "night-nav" : null}>
      <section className="nav-content">
        <div className="logo">
          <a href="https://reddit-short.netlify.app">
            <img src={!theme ? logoNight : logo} alt="logo" />
          </a>
        </div>
        <form
          className={!theme ? "night-form search-bar" : "search-bar"}
          onSubmit={handleSubmit}
        >
          <label htmlFor="searchTerm">
            <button
              className={
                !theme ? "search-icon night-search-icon" : "search-icon"
              }
              type="button"
              onClick={handleSubmit}
            >
              <img src={!theme ? searchNight : search} alt="" />
            </button>
          </label>
          <input
            type="text"
            className={!theme ? "night-input" : "day-input"}
            id="searchTerm"
            placeholder="Search for Topics"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="nav-icons">
          <button onClick={() => dispatch(toggleTheme())} className="day">
            <img src={!theme ? day : night} alt="day" />
          </button>
        </div>
      </section>
    </nav>
  );
};
