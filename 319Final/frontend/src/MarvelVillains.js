// Frontend Component (MarvelVillans.js)
import React, { useState, useEffect } from 'react';

const MarvelVillains = () => {
    const [villains, setVillains] = useState([]);  
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/marvel-villains");
                if (!response.ok) {
                    throw new Error("Failed to fetch contacts");
                }
                const data = await response.json();
                setVillains(data);
                console.log(data);
            } catch (error) {
                alert("There was an Error loading contacts "+error);
            }
        };
        fetchContacts();
    }, []);

    const sortOldest = () => {
        const sortedVillains = [...villains].sort((a, b) => a.year - b.year);
        setVillains(sortedVillains);
    };

    const sortNewest = () => {
        const sortedVillains = [...villains].sort((a, b) => b.year - a.year);
        setVillains(sortedVillains);
    };


    return (
        <div>
            <header className="navbar navbar-dark bg-dark shadow-sm">
                <div className="container">
                    <a href="/marvel" className="navbar-brand">Back</a>
                    <strong style={{color:'white'}} >Marvel Villains</strong>
                </div>
            </header>

            <div className="sorting1">
                <button onClick={sortOldest}>Sort by Oldest</button>
                <button onClick={sortNewest}>Sort by Most Recent</button>
            </div>

            <div className="album py-5 bg-body-tertiary">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                        {villains.map(villain => (
                            <div key={villain.id} className="col">
                                <div className="card shadow-sm">
                                {villain.image_url && (
                                        <img
                                        src={`http://localhost:8081${villain.image_url}`}
                                        alt={villain.name}
                                        
                                    />
                                    )}
                                    <div className="card-body">
                                        <h5>{villain.name}</h5>
                                        <p>{villain.description}</p>
                                        <p><strong>Year: </strong>{villain.year}</p>
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

export default MarvelVillains;