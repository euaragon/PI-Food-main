import { useEffect, useState } from 'react';
import Searchbar from "./SearchBar"
import Logo from '../img/logo.png'
import { NavLink } from "react-router-dom";
import './css/Nav.css';

export default function Nav(props) {
  const { onSearch } = props;
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`barra ${hidden ? 'hidden' : ''}`}>
      <NavLink className="logo" to={'/'}>
        <img src={Logo} alt="Logo Henry Food Home" width="140"></img>
      </NavLink>

      <Searchbar className="buscador" onSearch={onSearch}/>
    </div>
  );
}