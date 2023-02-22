/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./css/Paginate.css";

export default function Paginate({ recipesPerPage, allRecipes, paginado }) {
    const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      paginado(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginado(currentPage - 1);
    }
  };

  return (
    <nav className="paginado">
      <ul>
        <li>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
          {"<<"}
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a 
              className={currentPage === number ? "active" : ""}
              onClick={() => {
                setCurrentPage(number);
                paginado(number);
              }}
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          <button
            onClick={handleNextPage}
            disabled={currentPage === pageNumbers.length}
          >
            {">>"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
