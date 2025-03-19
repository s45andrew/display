import React, { useContext } from 'react';
import { GlobalStateContext } from './GlobalStateContext';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { buttonStates, handleReset } = useContext(GlobalStateContext);

  return (
    <div className="myNavbar">
      <nav>
        <div className="nav-buttons">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            <button>FRANTIC Stats</button>
          </NavLink>

          <NavLink to="/stocks" className={({ isActive }) => (isActive ? 'active' : '')}>
            <button>
              <img
                src="star.png"
                alt=""
                style={{
                  width: '15px',
                  height: '15px',
                  marginRight: '8px',
                  opacity: buttonStates.buttonJobData ? 1 : 0.3,
                }}
              />
              Stocks
            </button>
          </NavLink>

          <NavLink to="/football" className={({ isActive }) => (isActive ? 'active' : '')}>
            <button onClick={() => handleReset('buttonfootball')}>
              <img
                src="star.png"
                alt=""
                style={{
                  width: '15px',
                  height: '15px',
                  marginRight: '8px',
                  opacity: buttonStates.buttonfootball ? 1 : 0.3,
                }}
              />
              Football
            </button>
          </NavLink>

          <NavLink to="/jobs" className={({ isActive }) => (isActive ? 'active' : '')}>
            <button onClick={() => handleReset('buttonJobData')}>
              <img
                src="star.png"
                alt=""
                style={{
                  width: '15px',
                  height: '15px',
                  marginRight: '8px',
                  opacity: buttonStates.buttonJobData ? 1 : 0.3,
                }}
              />
              Jobs
            </button>
          </NavLink>

          <NavLink to="/articles" className={({ isActive }) => (isActive ? 'active' : '')}>
            <button onClick={() => handleReset('buttonLocalNews')}>
              <img
                src="star.png"
                alt=""
                style={{
                  width: '15px',
                  height: '15px',
                  marginRight: '8px',
                  opacity: buttonStates.buttonLocalNews ? 1 : 0.3,
                }}
              />
              Articles
            </button>
          </NavLink>

          <NavLink to="/nfl" className={({ isActive }) => (isActive ? 'active' : '')}>
            <button onClick={() => handleReset('buttonNFL')}>
              <img
                src="star.png"
                alt=""
                style={{
                  width: '15px',
                  height: '15px',
                  marginRight: '8px',
                  opacity: buttonStates.buttonNFL ? 1 : 0.3,
                }}
              />
              NFL
            </button>
          </NavLink>
               
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
