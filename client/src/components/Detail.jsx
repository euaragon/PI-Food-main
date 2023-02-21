import "./css/Detail.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";

export default function Detail() {
  const [recipe, setRecipe] = useState({
    id: "",
    name: "",
    healthScore: 0,
    summary: "",
    instructions: "",
    image: "",
    diets: [],
    dishTypes: [],
  });

  const navigate = useNavigate();

  const { recipeId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
      })
      .catch((error) => window.alert("Algo salio mal, intentalo nuevamente"));
  }, [recipeId]);

  function goHome() {
    return navigate("/home");
  }

  function RecipeSummary({ summary }) {
    return (
      <div dangerouslySetInnerHTML={{ __html: summary }} />
    );
  }

  return (
    <div className="det-cont">
      <button className="cerrar" onClick={() => goHome()}>
        volver
      </button>
      <div className="detalle">
        <h1 className="title">{recipe.name || recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <p>Saludable: {recipe.healthScore}%</p>
      <div className="diets">
        <h3>Tipo de Dieta: </h3>
        {recipe.diets.map((d) => (
          <span>
            {d} <br />
          </span>
        ))}
      </div>
      <div className="dish">
        <h3>Se puede comer en: </h3>
        {recipe.dishTypes.map((d) => (
          <span className="lista-dish">
            {d} <br />
          </span>
        ))}
      </div>
      
      <h3>De que se trata?</h3>
     
        <RecipeSummary summary={recipe.summary} />
      
      <h3>Paso a paso!</h3>
      <p>{recipe.instructions}</p>

      <Footer />
    </div>
  );
}
