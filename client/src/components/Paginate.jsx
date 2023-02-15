import React  from "react";
import "./css/Paginate.css";

export default function Paginate({recipesPerPage, allRecipes, paginado}) {
    const pageNumbers = [];
    for(let i = 1; i < Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
    }
  return (

      <nav className="paginado">
        <ul>
            {pageNumbers.map(number => (
                <li>
                    <a onClick={() => paginado(number)}>{number}</a>
                </li>
            ))}
        </ul>
      </nav>

  );
}