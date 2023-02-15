import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getTypes, getFilterByDiets,filterByOrder, orderByScore } from "../actions/actions";
import Card from "./Card";
import Paginate from "./Paginate";
import "./css/CardsContainer.css";

export default function CardsContainer({typesAll,setCurrPage, setOrder}) {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes); //usamos una hook para guardar en una constante todo lo que esta en el estado de las recetas
  
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9; // este estado local setea cuantas cartas entran por pagina
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // function handleClick(e) {
  //   e.preventDefault();
  //   dispatch(getRecipes());
  // }

  useEffect(() => {
    dispatch(getRecipes()); //esto es lo mismo que hacer el mapDispatchToProps
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleFilterByDiets(evt){
    dispatch(getFilterByDiets(evt.target.value))
    setCurrPage(1)
    setOrder(`${evt.target.value}`)
}

function handleFilterByOrder(evt){
    evt.preventDefault()
    dispatch(filterByOrder(evt.target.value))
    setCurrPage(1)
    setOrder(`${evt.target.value}`)
}

function handleOrderByScore(evt){
    evt.preventDefault()
    dispatch(orderByScore(evt.target.value))
    setCurrPage(1)
    setOrder(`${evt.target.value}`)
}


  return (
    <div className="container">
      <Paginate
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        paginado={paginado}
      />
      <div className="filtros">
        <select defaultValue='Orden' onChange={evt => handleFilterByOrder(evt)}>
        <option disabled>Orden</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select defaultValue='Tipo' onChange={evt => handleFilterByDiets(evt)}>
        <option disabled>Tipo</option>
        {typesAll?.map((type) => <option key={type.name} value={type.name}>{type.name}</option>)}
        </select>
        <select defaultValue='Puntaje' onChange={evt => handleOrderByScore(evt)}>
          <option disabled>Puntaje</option>
          <option key="SSc" value="SSc">
            Puntaje Spoonacular
          </option>
          <option key="HSc" value="HSc">
            Puntaje Saludable
          </option>
        </select>
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
