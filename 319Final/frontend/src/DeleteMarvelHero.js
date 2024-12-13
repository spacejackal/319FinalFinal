import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteMarvelHero = ({heroes, setHeroes }) => {
const [heroName, setHeroName] = useState("");
const [heroQuery, setHeroQuery] = useState([]);


// Search contacts by name or partial name
const fetchHeroes = async () => {
    if (!heroName.trim()) {
    alert("Please enter a contact name");
    return;
    }
    try {
    const response = await fetch(`http://localhost:8081/marvel-heroes/name?hero_name=${encodeURIComponent(heroName)}`);
    // Http status code 200, 201 is ok
     if (!response.ok) {
    throw new Error("Failed to fetch contacts");
    }
     // If response ok, convert the data javascript
    const data = await response.json();
    setHeroQuery(data);
    } catch (err) {
    alert("There was an Error loading searched contacts "+err);
    }
};



const deleteOnehero = async (id) => {
    try {
    const response = await fetch(`http://localhost:8081/marvel-heroes/${id}`, {
    method: "DELETE",
    });
     // Http status code 200, 201 is ok
    if (!response.ok) {
    throw new Error("Failed to delete hero");
    }
    alert("hero deleted successfully");
    // Refresh the contacts list after deletion
    setHeroQuery(heroQuery.filter(hero => hero.id !== id));
    } catch (err) {
    alert("There was an error deleting the contact: " + err);
    }
    };


return ( 

    <div className="container">
        {/* Input name or partial name for FETCH */}
        <h2 className="text-center mt-4">Delete Contact</h2>
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Enter contact name"
                value={heroName}
                onChange={(e) => setHeroName(e.target.value.toLowerCase())}
            />
            <button className="btn btn-primary" onClick={fetchHeroes}>
                Search
            </button>
        </div>
        {/* List the result and add Delete button to each */}
        <ul className="list-group">
        {heroQuery.map((hero) => (
        <li key={hero.id} className="list-group-item d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
            {hero.image_url && (
            <img
            src={`http://localhost:8081${hero.image_url}`}
            alt={hero.name}
            style={{ width: "200px", height: "200px", marginRight: "15px" }}
            />
            )}
            <div>
                <strong>{hero.name}</strong> - {hero.year}
                <p>{hero.description}</p>
            </div>
        </div>
        {/* Delete contact button */}
        <button className="btn btn-outline-secondary btn-sm rounded-pill"
         onClick={() => deleteOnehero(hero.id)}>
        Delete
        </button>
        </li>
        ))}
        </ul>
    </div>

 );
};


export default DeleteMarvelHero;