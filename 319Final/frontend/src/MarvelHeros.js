import React, { useState, useEffect } from 'react';

const MarvelHeros = () => {
  const [heroes, setHeroes] = useState([]);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/marvel-heroes");
            if (!response.ok) {
                throw new Error("Failed to fetch contacts");
            }
            const data = await response.json();
            setHeroes(data);
            console.log(data);
        } catch (error) {
            alert("There was an Error loading contacts "+error);
        }
    };
    fetchContacts();
}, []);

  const sortOldest = () => {
    const sortedHeroes = [...heroes].sort((a, b) => a.year - b.year);
    setHeroes(sortedHeroes);
    setSorted(true);
  };

  const sortNewest = () => {
    const sortedHeroes = [...heroes].sort((a, b) => b.year - a.year);
    setHeroes(sortedHeroes);
    setSorted(true);
  };

  return (
    <div>
      <header className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          
          <a href="/marvel" className="navbar-brand">
            Back
          </a>
          <strong style={{color:'white'}}>Marvel Heroes</strong>
        </div>
      </header>

      <div className="sorting1">
        <button onClick={sortOldest}>Sort by Oldest</button>
        <button onClick={sortNewest}>Sort by Most Recent</button>
      </div>

      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {heroes.map(hero => (
              <div key={hero.id} className="col">
                <div className="card shadow-sm">
                {hero.image_url && (
                                    <img
                                    src={`http://localhost:8081${hero.image_url}`}
                                    alt={hero.name}    
                                    />
                                    )}
                  <div className="card-body">
                    <h5>{hero.name}</h5>
                    <p>{hero.description}</p>
                    <p><strong>Year: </strong>{hero.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarvelHeros;
