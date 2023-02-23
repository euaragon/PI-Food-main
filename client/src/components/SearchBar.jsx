import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getName } from "../actions/actions";
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

    if (!/^[a-zA-Z0-9]+$/.test(name)) {
      setAlertMessage("El término de búsqueda solo puede contener letras y números");
      return;
    }

    dispatch(getName(name));
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
