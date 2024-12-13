var express = require("express");
var cors = require("cors");
var multer = require("multer");
var bodyParser = require("body-parser");
var app = express();

app.use(cors());
app.use(bodyParser.json());


// MySQL
const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root"
    ,
    password: "Franky12!"
    ,
    database: "final2"
    ,
});


// Set up multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save images in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, String(Date.now()) ); // Unique filename
    }
});
const upload = multer({ storage: storage });

// Create "uploads" folder if it doesn't exist
const fs = require("fs");
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}



// Server
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads")); // Serve images statically

const port = "8081";
const host = "localhost";



 app.get('/api/marvel-heroes', (req, res) => {
    const query = 'SELECT * FROM marvel_heroes';
    db.query(query, (err, results) => {
        if (err) {
            console.error({error:"Error reading all posts:"+err});
            res.status(500).send(err);
            return;
        }
        res.status(200).send(results);
    });
});

app.get('/api/marvel-villains', (req, res) => {
    const query = 'SELECT * FROM marvel_villains';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(200).send(results);
    });
});



app.post("/api/marvel-heroes", upload.single("image"), (req, res) => {
    const { Name, year, description } = req.body; 
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const checkQuery = "SELECT * FROM marvel_heroes WHERE Name = ?";
    db.query(checkQuery, [Name], (checkErr, checkResult) => {
        if (checkErr) {
            console.error("Database error during validation:", checkErr);
            return res.status(500).json({ error: "Error checking contact name: " + checkErr.message });
        }
        if (checkResult.length > 0) {
            return res.status(409).json({ error: "Contact name already exists." });
        }

        const query = "INSERT INTO marvel_heroes (Name, year, description, image_url) VALUES (?, ?, ?, ?)";
        db.query(query, [Name, year, description, imageUrl], (err, result) => {
            if (err) {
                console.error("Database error during insertion:", err);
                return res.status(500).json({ error: "Error adding contact: " + err.message });
            }
            res.status(201).json({ message: "Contact added successfully" });
        });
    });
});


app.post("/api/marvel-villains", upload.single("image"), (req, res) => {
    const { Name, year, description } = req.body; 
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const checkQuery = "SELECT * FROM marvel_villains WHERE Name = ?";
    db.query(checkQuery, [Name], (checkErr, checkResult) => {
        if (checkErr) {
            console.error("Database error during validation:", checkErr);
            return res.status(500).json({ error: "Error checking contact name: " + checkErr.message });
        }
        if (checkResult.length > 0) {
            return res.status(409).json({ error: "Contact name already exists." });
        }

        const query = "INSERT INTO marvel_villains (Name, year, description, image_url) VALUES (?, ?, ?, ?)";
        db.query(query, [Name, year, description, imageUrl], (err, result) => {
            if (err) {
                console.error("Database error during insertion:", err);
                return res.status(500).json({ error: "Error adding villain: " + err.message });
            }
            res.status(201).json({ message: "villain added successfully" });
        });
    });
});




 app.delete("/marvel-heroes/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM marvel_heroes WHERE id = ?";
    try{
    db.query(query, [id], (err, result) => {
        if (err) {
        console.log(err);
        res.status(500).send({err:"Error deleting contact"});
        } else if (result.affectedRows === 0) {
        res.status(404).send({err:"Contact not found"});
        } else {
        res.status(200).send("Contact deleted successfully");
        }
    });}catch(err){
        console.error("Error in DELETE /marvel-heroes:", err);
        res.status(500).send({ error: "An unexpected error occurred in DELETE: " + err.message });
    }
 });


 app.delete("/marvel-villains/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM marvel_villains WHERE id = ?";
    try{
    db.query(query, [id], (err, result) => {
        if (err) {
        console.log(err);
        res.status(500).send({err:"Error deleting contact"});
        } else if (result.affectedRows === 0) {
        res.status(404).send({err:"Contact not found"});
        } else {
        res.status(200).send("Contact deleted successfully");
        }
    });}catch(err){
        console.error("Error in DELETE /marvel-villains:", err);
        res.status(500).send({ error: "An unexpected error occurred in DELETE: " + err.message });
    }
 });


 app.put("/contact/:id", (req, res) => {
    const id = req.params.id;

    const query = ` UPDATE contact SET contact_name = ?, phone_number = ?, message = ? WHERE id = ?`;
    try{
    db.query(query, [contact_name, phone_number, message, id], (err, result) => {
        if (err) {
        console.log(err);
        res.status(500).send({err:"Error updating contact"});
        } else if (result.affectedRows === 0) {
        res.status(404).send({err:"Contact not found"});
        } else {
        res.status(200).send("Contact updated successfully");
        }
    });
    }catch(err){
        console.error("Error in UPDATE /contact:", err);
        res.status(500).send({ error: "An unexpected error occurred in UPDATE: " + err.message });
    }
 });



  app.get("/marvel-heroes/name", (req, res) => {
    const { hero_name } = req.query;

    if (!hero_name) {
        return res.status(400).send({ error: "hero_name is required" });
    }

    const query = "SELECT * FROM marvel_heroes WHERE LOWER(Name) LIKE LOWER(?)";
    const searchValue = `%${hero_name}%`; // Add wildcards for partial match

    db.query(query, [searchValue], (err, result) => {
        if (err) {
            console.error("Error fetching contacts:", err);
            return res.status(500).send({ error: "Error fetching heroes" });
        }
        res.status(200).send(result);
    });
});


app.get("/marvel-villains/name", (req, res) => {
    const { villain_name } = req.query;

    if (!villain_name) {
        return res.status(400).send({ error: "villain_name is required" });
    }

    const query = "SELECT * FROM marvel_villains WHERE LOWER(Name) LIKE LOWER(?)";
    const searchValue = `%${villain_name}%`; // Add wildcards for partial match

    db.query(query, [searchValue], (err, result) => {
        if (err) {
            console.error("Error fetching contacts:", err);
            return res.status(500).send({ error: "Error fetching villain" });
        }
        res.status(200).send(result);
    });
});




app.listen(port, () => {
console.log("App listening at http://%s:%s", host, port);
});