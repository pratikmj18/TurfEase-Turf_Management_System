import React, { useState } from 'react';
//import './App.css';
import { Link } from 'react-router-dom';

import '../style/Home.css';

const HomePage = () => {
  const [menuActive, setMenuActive] = useState(false);

  const handleToggleClick = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className={`App ${menuActive ? 'active' : ''}`}>
      <section className={`showcase ${menuActive ? 'active' : ''}`}>
        <header>
          <h2 className="logo">Book Your Turf</h2>
          <div className={`toggle ${menuActive ? 'active' : ''}`} onClick={handleToggleClick}></div>
        </header>
        <video src="https://videos.pexels.com/video-files/3192082/3192082-uhd_3840_2160_25fps.mp4" muted loop autoPlay></video>
        <div className="overlay"></div>
        <div className="text">
          <h2>Reserve Your Perfect Playing Field</h2>
          <p>
            Experience the thrill of your favorite sport on our well-maintained turfs. Choose from a variety of sizes and surfaces to suit your needs. Book your turf online quickly and easily!
          </p>

          <Link to="/user/login" >Book Now</Link>
        </div>
        <ul className="social">
          <li><a href="#"><img src="https://i.ibb.co/x7P24fL/facebook.png" alt="Facebook" /></a></li>
          <li><a href="#"><img src="https://i.ibb.co/Wnxq2Nq/twitter.png" alt="Twitter" /></a></li>
          <li><a href="#"><img src="https://i.ibb.co/ySwtH4B/instagram.png" alt="Instagram" /></a></li>
        </ul>
      </section>
      <div className="menu">
        <ul>
          <li><Link to="/home" >Home</Link></li>
          <li><Link to="/about" >About US</Link></li>
          <li><Link to="/contact" >Partner With Us</Link></li>
          <li><Link to="/user/login" >Book Now</Link></li>
          <li><a href="#">News and Events</a></li>
          <li><Link to="/]/user/login" >Login</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
