import React from 'react';
import MarvelHPic from './images/MarvelHeros.jpg'
import MarvelVPic from './images/MarvelVillans.jpg'

const Marvel = () => {
  return (
    <div>
      <header className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <a href="/" className="navbar-brand d-flex align-items-center">
            <strong>SuperHeros of DC and Marvel</strong>
          </a>
        </div>
      </header>

      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
            <div className="row-cols-1">
              <h1 className="heros"><strong>Heros</strong></h1>
              <a href="/MarvelHeros"><img src={MarvelHPic} alt="Marvel Heros" width="100%" height="100%" /></a>
            </div>
            <div className="col" style={{ paddingLeft: 150 }}>
              <h1 className="villans"><strong>Villains</strong></h1>
              <a href="/MarvelVillains"><img src={MarvelVPic} alt="Marvel Villains" width="150%" height="100%" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marvel;
