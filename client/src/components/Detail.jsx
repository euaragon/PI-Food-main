import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Detail(){
    const [recipe, setRecipe] = useState({
        id: "",
        title: "",
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

  return (
    <div className="detalle">
      <button className="cerrar" onClick={() => goHome()}>
        volver
      </button>
      <div>
        <h1>{recipe.title}</h1>
        <>
          {recipe.diets.map((d) => (
            <span>{d}</span>
          ))}
        </>
        <hr />
        <>
          {recipe.dishTypes.map((d) => (
            <span>{d}</span>
          ))}
        </>
        <hr />
      </div>
      <h4>{recipe.summary}</h4>
      <p>{recipe.instructions}</p>
      <div>
        <img src={recipe.image} alt={recipe.title} />
        <h3>Health Score: {recipe.healthScore}</h3>
      </div>
    </div>
  );
}