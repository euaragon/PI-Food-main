import Searchbar from "./SearchBar"
import Logo from '../img/logo.png'
import { NavLink } from "react-router-dom";
import './css/Nav.css';

export default function Nav(props){
    const { onSearch } = props; // desctructuring
    return(
        <div className="barra">
            <NavLink className="logo" to={'/home'}>
             <img src={Logo} alt="Logo Henry Food Home" width="140"></img>
             </NavLink>
            
            <Searchbar className="buscador" onSearch={onSearch}/>

           
            
        </div>
    )
}