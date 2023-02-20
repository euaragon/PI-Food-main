import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import { NavLink } from "react-router-dom";
import {getName} from "../actions/actions"
import "./css/Searchbar.css";

export default function Searchbar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e){
    e.preventDefault();
    dispatch(getName(name))
  }


  return (
    <div className="buscador">
      <input type="text" name="recipes" placeholder="buscar receta" onChange={(e) => handleInputChange(e)}></input>
      <button type="submit" className="buscar" onClick={(e) => handleSubmit(e)}>BUSCAR</button>

      <NavLink className="crear-receta" to={"/foodcreate"}>
        CREAR RECETA
      </NavLink>
    </div>
  );
}
