import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteMarvelVillain = ({villains, setVillains }) => {
const [villainName, setVillainName] = useState("");
const [villainQuery, setVillainQuery] = useState([]);


// Search contacts by name or partial name
const fetchVillains = async () => {
    if (!villainName.trim()) {
    alert("Please enter a contact name");
    return;
    }
    try {
    const response = await fetch(`http://localhost:8081/marvel-villains/name?villain_name=${encodeURIComponent(villainName)}`);
    // Http status code 200, 201 is ok
     if (!response.ok) {
    throw new Error("Failed to fetch contacts");
    }
     // If response ok, convert the data javascript
    const data = await response.json();
    setVillainQuery(data);
    } catch (err) {
    alert("There was an Error loading searched Villains "+err);
    }
};



const deleteOneVillain = async (id) => {
    try {
    const response = await fetch(`http://localhost:8081/marvel-villains/${id}`, {
    method: "DELETE",
    });
     // Http status code 200, 201 is ok
    if (!response.ok) {
    throw new Error("Failed to delete villain");
    }
    alert("villain deleted successfully");
    // Refresh the contacts list after deletion
    setVillainQuery(villainQuery.filter(villain => villain.id !== id));
    } catch (err) {
    alert("There was an error deleting the villain: " + err);
    }
    };


return ( 

    <div className="container">
        {/* Input name or partial name for FETCH */}
        <h2 className="text-center mt-4">Delete Villain</h2>
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Enter contact name"
                value={villainName}
                onChange={(e) => setVillainName(e.target.value.toLowerCase())}
            />
            <button className="btn btn-primary" onClick={fetchVillains}>
                Search
            </button>
        </div>
        {/* List the result and add Delete button to each */}
        <ul className="list-group">
        {villainQuery.map((villain) => (
        <li key={villain.id} className="list-group-item d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
            {villain.image_url && (
            <img
            src={`http://localhost:8081${villain.image_url}`}
            alt={villain.name}
            style={{ width: "200px", height: "200px", marginRight: "15px" }}
            />
            )}
            <div>
                <strong>{villain.name}</strong> Year: {villain.year}
                <p>{villain.description}</p>
            </div>
        </div>
        {/* Delete contact button */}
        <button className="btn btn-outline-secondary btn-sm rounded-pill"
         onClick={() => deleteOneVillain(villain.id)}>
        Delete
        </button>
        </li>
        ))}
        </ul>
    </div>

 );
};


export default DeleteMarvelVillain;