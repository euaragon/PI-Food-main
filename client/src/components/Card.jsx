import "./css/Card.css";
import React from "react";

export default function Card({ name, diets, healthScore, image }) {
  return (
    <div className="carta">
      <h2>{name}</h2>
      <img src={image} alt={name} />
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
