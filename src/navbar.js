import React, { useContext } from 'react';
import { GlobalStateContext } from './comp/txtfiles/GlobalStateContext';

const Navbar = () => {
  const { buttonStates } = useContext(GlobalStateContext);

  return (
    <div className="myNavbar">
      <nav>
        <div className="nav-buttons">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            <button>FrAntIc StaTs</button>
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
            <button>
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
              Jobs
            </button>
          </NavLink>
          <NavLink to="/articles" className={({ isActive }) => (isActive ? 'active' : '')}>
            <button>
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
            <button>
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
