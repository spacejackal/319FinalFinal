import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar.js";
import MarvelHeros from "./MarvelHeros.js";
import MarvelVillains from "./MarvelVillains.js";
import Marvel from "./Marvel.js";
import AddMarvelHero from "./AddMarvelHero.js";
import AddMarvelVillain from "./AddMarvelVillain.js";
import SearchMarvelHeroes from "./SearchMarvelHeroes.js";
import DeleteMarvelHero from "./DeleteMarvelHero.js";
import SearchMarvelVillains from "./SearchMarvelVillains.js";
import DeleteMarvelVillain from "./DeleteMarvelVillain.js";



function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [villains, setVillains] = useState([]);  
  const [heroes, setHeroes] = useState([]);


  return (
    <Router>
      <div className="d-flex">
       <Sidebar />
        <div className="flex-grow-1 p-3">
          
          <Routes>
            <Route path="/Marvel" element={<Marvel/>}/>
            <Route path="/" element={<Marvel/>} />
            
            <Route path="/MarvelHeros" element={<MarvelHeros 
              heroes={heroes}
              setHeroes={setHeroes}
            />}

             />
            
            <Route path="/MarvelVillains" element={<MarvelVillains
              villains={villains}
              setVillains={setVillains}
            />}/>
            <Route path="/AddMarvelHero" element={<AddMarvelHero/>}/>
            <Route path="/AddMarvelVillain" element={<AddMarvelVillain/>}/>
            <Route path="/SearchMarvelHeroes" element={<SearchMarvelHeroes/>}
            heroes={heroes}
            setHeroes={setHeroes}
            />
            <Route path="/SearchMarvelVillains" element={<SearchMarvelVillains/>}/>
            <Route path="/DeleteMarvelHero" element={<DeleteMarvelHero/>}/> 
            <Route path="/DeleteMarvelVillain" element={<DeleteMarvelVillain/>}/>

          </Routes>
        </div>
      </div>
    </Router>
    );
}
export default App;