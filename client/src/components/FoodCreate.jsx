import React from "react";
import { useState } from "react";
import validation from "./validation";
import "./css/FoodCreate.css";
import Footer from "./Footer";
//import Swal from "sweetalert";

export default function FoodCreate() {
  const [alert, setAlert] = useState({ type: "", message: "" });

  function showAlert(type, message) {
    setAlert({ type, message });
  }

  async function createRecipe(userData) {
    try {
      await fetch(
        "http://localhost:3001/recipes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
        window.alert("Receta creada correctamente!")
      );
    } catch (error) {
      console.log(error);
      showAlert("error", "Complete todos los campos");
    }
  }

  const [inputs, setInputs] = useState({
    title: "",
    healthScore: 0,
    summary: "",
    instructions: "",
    image: "",
    diets: "",
    dishTypes: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    healthScore: "",
    summary: "",
    instructions: "",
    image: "",
    diets: "",
    dishTypes: "",
  });

  function handleInputChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...inputs,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Comprobar si se han ingresado datos en todos los campos
    const allFieldsFilled = Object.values(inputs).every(
      (value) => value.trim() !== ""
    );

    if (!allFieldsFilled) {
      // Mostrar mensaje de error
      showAlert("error", "Por favor, completa todos los campos");
      return;
      // Swal("Por favor, completa todos los campos", "", "error");
      // return;
    } else {
      showAlert("success", "Receta creada correctamente!");
      return;
    }

    // Enviar el formulario
    createRecipe(inputs);
  }

  return (
    <div className="food-create">
      <h1>Escribí tu propia receta!</h1>
      {alert.message && (
        <div className={`create-alert ${alert.type}`}>
          {alert.message}
          <button onClick={() => setAlert({ type: "", message: "" })}>x</button>
        </div>
      )}
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="options">
            <label htmlFor="title">Titulo: </label>
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleInputChange}
              className={errors.title && "danger"}
            />
            {errors.title && <span>{errors.title}</span>}
          </div>{" "}
          <div className="options">
            <label htmlFor="healthScore">Puntaje Saludable: </label>
            <input
              type="number"
              name="healthScore"
              value={inputs.healthScore}
              onChange={handleInputChange}
              className={errors.healthScore && "danger"}
            />
            {errors.healthScore && <span>{errors.healthScore}</span>}
          </div>{" "}
          <div className="options">
            <label htmlFor="summary">De que se trata?: </label>
            <input
              type="text"
              name="summary"
              value={inputs.summary}
              onChange={handleInputChange}
              className={errors.summary && "danger"}
            />
            {errors.summary && <span>{errors.summary}</span>}
          </div>
          <div className="options">
            <label htmlFor="instructions">Instrucciones: </label>
            <input
              type="textarea"
              name="instructions"
              value={inputs.instructions}
              onChange={handleInputChange}
              className={errors.instructions && "danger" && "instructions"}
            />
            {errors.instructions && <span>{errors.instructions}</span>}
          </div>{" "}
          <div className="options">
            <label htmlFor="image">Agregale una imagen (URL): </label>
            <input
              type="text"
              name="image"
              value={inputs.image}
              onChange={handleInputChange}
              className={errors.image && "danger"}
            />
            {errors.image && <span>{errors.image}</span>}
          </div>{" "}
          <div className="options">
            <label htmlFor="diets">Tipo de Dieta: </label>
            <input
              type="text"
              name="diets"
              value={inputs.diets}
              onChange={handleInputChange}
              className={errors.diets && "danger"}
            />
            {errors.diets && <span>{errors.diets}</span>}
          </div>{" "}
          <div className="options">
            <label htmlFor="dishTypes">Tipo de Plato: </label>
            <input
              type="text"
              name="dishTypes"
              value={inputs.dishTypes}
              onChange={handleInputChange}
              className={errors.dishTypes && "danger"}
            />
            {errors.dishTypes && <span>{errors.dishTypes}</span>}
          </div>
          <button>AGREGAR</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
