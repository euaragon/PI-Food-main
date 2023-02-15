import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getTypes, filterRecipesByType, orderByName, orderByScore} from "../actions/actions";
import Card from "./Card";
import Paginate from "./Paginate";
import "./css/CardsContainer.css";

export default function CardsContainer() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes); //usamos una hook para guardar en una constante todo lo que esta en el estado de las recetas
  
  const [currentPage, setCurrentPage] = useState(1);
  const [orden, setOrden] = useState('')
  const recipesPerPage = 9; // este estado local setea cuantas cartas entran por pagina
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  useEffect(() => {
    dispatch(getRecipes()); //esto es lo mismo que hacer el mapDispatchToProps
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterByType = (e) => {
    dispatch(filterRecipesByType(e.target.value))
  }

  const handleOrderByName = (e) => {
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  const handleOrderByScore = (e) => {
    dispatch(orderByScore(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }


  return (
    <div className="container">
      <Paginate
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        paginado={paginado}
      />
      <div className="filtros">
        <select defaultValue='Orden' onChange={e => handleOrderByName(e)}>
        <option disabled>Orden</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select defaultValue='Tipo' onChange={e => handleFilterByType(e)}>
        <option disabled>Tipo</option>
        <option value="gluten free">gluten free</option>
        <option value="dairy free">dairy free</option>
        <option value="paleolithic">paleolithic</option>
        <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
        <option value="primal">primal</option>
        <option value="whole 30">whole 30</option>
        <option value="vegan">vegan</option>
        <option value="fodmap friendly">fodmap friendly</option>
        <option value="ketogenic">ketogenic</option>
        <option value="pescatarian">pescatarian</option>
        </select>
        <select defaultValue='Puntaje' onChange={e => handleOrderByScore(e)}>
          <option disabled>Puntaje</option>
          <option key="mas" value="mas">
           Mas Saludable
          </option>
          <option key="menos" value="menos">
            Menos Saludable
          </option>
        </select>
        <button onClick={e => {handleClick(e)}}>Todos</button>
      </div>
      {currentRecipe?.map((e) => {
        return (
          <Card
            key={e.id}
            id={e.id}
            name={e.name}
            summary={e.summary}
            healthScore={e.healthScore}
            image={e.image}
            diets={e.diets}
            dishTypes={e.dishTypes}
            instructions={e.instructions}
            //onClose={onClose}
          />
        );
      })}
    </div>
  );
}





