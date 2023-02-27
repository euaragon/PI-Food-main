import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getName, searchByName } from "../actions/actions";
import "./css/Searchbar.css";

export default function Searchbar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  function handleInputChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      setAlertMessage("Escriba algo");
      return;
    }


    dispatch(searchByName(name.toLowerCase().trim())); //lo pasamos a minusculas y elminiamos los espacios en blanco
  }

  return (
    <div className="buscador">

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="recipes"
          placeholder="buscar receta"
          onChange={handleInputChange}
        ></input>
        <button type="submit" className="buscar">
          BUSCAR
        </button>
      </form>


     
      <NavLink className="crear-receta" to={"/foodcreate"}>
        CREAR RECETA
      </NavLink>

      {alertMessage && (
        <div className="alert">
          <span className="alert-message">{alertMessage}</span>
          <button className="alert-close" onClick={() => setAlertMessage("")}>
            X
          </button>
        </div>
      )}
    </div>
  );
}
