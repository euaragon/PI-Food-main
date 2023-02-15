import React from "react";
import { NavLink } from "react-router-dom";
import LogoLanding from '../img/logolanding.png'
import "./css/Landing.css"


export default function LandingPage(){
    return (
        <div className="ingresar">
             <img className="logo-landing" src={LogoLanding} alt="Henry Food Logo" width="250"></img>
             <br />
            <NavLink  to={'/home'}>
            <button className="entrar">ENTRAR</button>
             </NavLink>
        </div>
    )
}