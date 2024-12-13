import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    return (
        <div className="d-flex flex-column vh-100 p-3 bg-light" style={{ width: '250px' }}>
            <h2 className="text-center">Navigation</h2>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/" className="nav-link text-dark">Home</Link>
                </li>

                <strong>Heroes</strong>
                <li className='nav-item'>
                    <Link to="/MarvelHeros" className='nav-link text-dark'>Marvel Heros</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/AddMarvelHero" className='nav-link text-dark'>Add Marvel Hero</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/SearchMarvelHeroes' className='nav-link text-dark'>Search Marvel Heroes</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/DeleteMarvelHero' className='nav-link text-dark'>Delete Marvel Hero</Link>
                </li>

                <strong>Villains</strong>

                <li className='nav-item'>
                    <Link to="/MarvelVillains" className='nav-link text-dark'>Marvel Villains</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/AddMarvelVillain' className='nav-link text-dark'>Add Marvel Villain</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/SearchMarvelVillains' className='nav-link text-dark'>Search Marval Villains</Link>
                </li>
                <li className='nav_item'>
                    <Link to='/DeleteMarvelVillain' className='nav-link text-dark'>Delete Marvel Villain</Link>
                </li>
            </ul>
        </div>
    );
};
export default Sidebar;