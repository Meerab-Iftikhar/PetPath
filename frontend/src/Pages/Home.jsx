import React from 'react'
import Header from '../Components/Header'
import {assets} from '../assets/assets'
import '../Styling/Home.css'

const Home = () => {
  return (
    <div>
      <Header/>
      <div class="body">
        <img src={assets.doggo} alt="" />
        <div class="p1">
          <span>1.2k+ Furry Friends <br/> Living Their Best Lives</span>
          <img src={assets.house} alt="" />
        </div>
        <div class="p2">
          <span>What We Do?</span>
          <p>At PetPath, we’re dedicated to helping pets find their forever homes. Our platform connects loving families with pets in need of adoption, providing a safe and seamless way to give or adopt a pet. We believe every pet deserves love, care, and a happy home, and we’re here to make that possible.</p>
        </div>
      </div>
      <div class="body2">
  <h4>Planning to Adopt a Pet?</h4>
  <div class="info-section">
    <div class="info-card">
      <h5>The Joy of Pet Adoption</h5>
      <p>
        Bringing a pet into your life can be an incredibly rewarding experience, not just for you but for the furry friend you welcome into your home. There’s a special kind of magic that comes with adopting any companion animal.
      </p>
    </div>
    <div class="info-card">
      <h5>A Guide to Pet Adoption</h5>
      <p>
        Are you considering adding a new pet to your family? Pet adoption is a wonderful option to consider. The journey of finding the ideal companion involves careful thought, research, and planning, but the rewards are immeasurable.
      </p>
    </div>
    <div class="info-card">
      <h5>Healing Power of Animals</h5>
      <p>
        Animals have an extraordinary ability to touch our lives in profound ways, offering not only companionship but also a therapeutic bond that can positively impact our physical, mental, and emotional well-being.
      </p>
    </div>
  </div>
</div>
    </div>
  );
};

export default Home;  