import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const SearchMarvelHeroes = () => {
    const [hero_name, setheroName] = useState("");
    const [heroQuery, setheroQuery] = useState([]);

    const fetchHeroes = async () => {
        if (!hero_name.trim()) {
            alert("Please enter a hero name");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/marvel-heroes/name?hero_name=${encodeURIComponent(hero_name)}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch heroes");
            }

            const data = await response.json();
            setheroQuery(data);
        } catch (err) {
            alert("There was an error loading heroes: " + err.message);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">Search Heroes</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter hero name"
                    value={hero_name}
                    onChange={(e) => setheroName(e.target.value.toLowerCase())}
                />
                <button className="btn btn-primary" onClick={fetchHeroes}>
                    Search
                </button>
            </div>

            <ul className="list-group">
    {heroQuery.map((hero) => (
        <li 
            key={hero.id} 
            className="list-group-item d-flex justify-content-between align-items-center"
        >
            <div className="d-flex align-items-center">
                {hero.image_url && (
                    <img
                        src={`http://localhost:8081${hero.image_url}`}
                        alt={hero.name}
                        style={{
                            width: "200px",
                            height: "200px",
                            marginRight: "15px",
                        }}
                    />
                )}
                <div>
                    <strong >{hero.name}</strong>
                    <p>{hero.description}</p>
                    <strong>Year: {hero.year}</strong>
                </div>
            </div>
        </li>
    ))}
</ul>

        </div>
    );
};

export default SearchMarvelHeroes;
