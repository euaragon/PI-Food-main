import { NavLink } from "react-router-dom";
import "./css/Searchbar.css";

export default function Searchbar(props) {
  return (
    <div className="buscador">
      <input type="text" name="recipes" placeholder="buscar receta"></input>
      <button className="buscar">BUSCAR</button>

      <NavLink className="crear-receta" to={"/foodcreate"}>
        CREAR RECETA
      </NavLink>
    </div>
  );
}
