import React from 'react';
import {assets} from '../assets/assets';
import { Link } from 'react-router-dom';
import '../Styling/Header.css';

const Header = () => {
  return (
    <div class="header" >
        {/* left side */}
        <div class="leftside">
            <br/>
           <span>"Helping pets find <br/> their forever <br/> home"  </span>
            <div class="subtext">
                <p>If you're ready to adopt and offer your time, love, and care, embark on the journey to<br/> providing a forever home</p>
            </div>
            <Link to="/pets" class="adopt-button-wrapper">
                <button class="adopt-button">
                    Adopt a Pet <img src={assets.paw} alt="paw" class="button-icon" />
                </button>
            </Link>
            
        </div>

        {/* Right side */}
        <div class="rightside">
            <img src={assets.adopt} alt="" />
        </div>
    </div>
  )
};

export default Header;
