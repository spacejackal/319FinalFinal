import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const AddMarvelHero = () => {
    const [Name, setName] = useState('');
    const [year, setyear] = useState('');
    const [description, setdescription] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file)); // Show preview
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addOneContact();
        // Reset form fields
        setName('');
        setyear('');
        setdescription('');
        setImage(null);
        setPreview(null);
    };

    const addOneContact = async () => {
        try {
            // Create a FormData object to hold the fields and the file
            const formData = new FormData();
            formData.append("Name", Name);
            formData.append("description", description);
            formData.append("image", image); // Backend expects this key
            formData.append("year", year);

            // Send the FormData object to the backend
            const response = await fetch("http://localhost:8081/api/marvel-heroes", {
                method: "POST",
                body: formData, // Let fetch handle Content-Type
            });

            if (!response.ok) {
                // Handle errors (status code 4xx or 5xx)
                let errorMessage = "Unknown error occurred.";
                try {
                    const errorData = await response.json(); // Parse JSON error response
                    errorMessage = errorData.error;
                } catch (jsonError) {
                    errorMessage = await response.text(); // Handle plain text response
                }
                alert("Error: " + errorMessage);
            } else {
                // Status code 201 indicates success
                const successMessage = await response.text();
                alert(successMessage);
            }
        } catch (err) {
            alert("An error occurred: " + err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Add New Hero</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Hero Name</label>
                    <input type="text" className="form-control" value={Name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Year of Release</label>
                    <input type="text" className="form-control" value={year} onChange={(e) => setyear(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" value={description} onChange={(e) => setdescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input type="file" className="form-control" onChange={handleImageChange} />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-3"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Hero
                </button>
            </form>
        </div>
    );
};

export default AddMarvelHero;
