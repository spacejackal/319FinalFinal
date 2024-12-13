import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const SearchMarvelVillains = () => {
    const [villain_name, setVillainName] = useState("");
    const [villainQuery, setVillainQuery] = useState([]);

    const fetchVillains = async () => {
        if (!villain_name.trim()) {
            alert("Please enter a villain name");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/marvel-villains/name?villain_name=${encodeURIComponent(villain_name)}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch villains");
            }

            const data = await response.json();
            setVillainQuery(data);
        } catch (err) {
            alert("There was an error loading villains: " + err.message);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">Search Villains</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter villain name"
                    value={villain_name}
                    onChange={(e) => setVillainName(e.target.value.toLowerCase())}
                />
                <button className="btn btn-primary" onClick={fetchVillains}>
                    Search
                </button>
            </div>

            <ul className="list-group">
    {villainQuery.map((villain) => (
        <li 
            key={villain.id} 
            className="list-group-item d-flex justify-content-between align-items-center"
        >
            <div className="d-flex align-items-center">
                {villain.image_url && (
                    <img
                        src={`http://localhost:8081${villain.image_url}`}
                        alt={villain.name}
                        style={{
                            width: "200px",
                            height: "200px",
                            marginRight: "15px",
                        }}
                    />
                )}
                <div>
                    <strong >{villain.name}</strong>
                    <p>{villain.description}</p>
                    <strong>Year: {villain.year}</strong>
                </div>
            </div>
        </li>
    ))}
</ul>

        </div>
    );
};

export default SearchMarvelVillains;
