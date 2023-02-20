import "./css/Card.css";
import React from "react";
import { Link } from "react-router-dom";

export default function Card({ id, name, diets, healthScore, image }) {
  return (
    <div className="carta">
      <h2>{name}</h2>
      <Link to={`/recipes/${id}`}>
        <img src={image} alt={name} />
      </Link>
      <p>Saludable: {healthScore}%</p>
      <div className="dieta">
        <h4>Tipo de Dieta</h4>
        <ul>
          {diets?.map((e) => {
            return <li>{e}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
