import React from 'react';
import {assets} from '../assets/assets';
import { Link } from 'react-router-dom';
// import { Link, useLocation } from 'react-router-dom';
import '../Styling/NavBar.css';

const NavBar = () => {
  // const location = useLocation();

  return (
    <div class="navbar">
      <div class="navbar-logo">
        <img src={assets.logo} alt="Logo" />
        <span>PetPath</span>
      </div>
      <ul class="navbar-links"> 
        <Link to="/" class={location.pathname === '/' ? 'nav-item active' : 'nav-item'}>
            <li>HOME</li>
        </Link>
        <Link to="/pets" class={location.pathname === "/pets" ? 'nav-item active' : 'nav-item'}>
            <li>PETS</li>
        </Link>
        <Link to="/services" class={location.pathname === "/services" ? 'nav-item active' : 'nav-item'}>
            <li>SERVICES</li>
        </Link>
        <Link to="/contact" class={location.pathname === "/contact" ? 'nav-item active' : 'nav-item'}>
            <li>CONTACT US</li>
        </Link>
      </ul>
      <div class="navbar-button">
        <Link to="/services">
          <button>Give a Pet</button> 
        </Link>
      </div>
      <hr/>
    </div>
  );
};

export default NavBar;
