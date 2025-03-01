import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { GlobalStateProvider } from './comp/txtfiles/GlobalStateContext';
import { JobProvider } from './comp/jobContext';
import { SportProvider } from './comp/sportContext';
import { NewsProvider } from './comp/newsContext';
import JobList from './comp/jobs';
import SportsFetcher from './comp/sportsFetcher';
import Stocks from './comp/stocks';
import Articles from './comp/articles';
import NFL from './comp/nfl';
import './App.css'; // Import the CSS file
import LoginPage from './comp/txtfiles/myStocks';

const App = () => {
  return (
    <Router>
      <GlobalStateProvider>
      <NewsProvider>
        <SportProvider>
          <JobProvider>
            <div className="App">
         
                <div className='myNavbar'>
                  <nav>
                    <div className="nav-buttons">
                      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                        <button>FrAntIc StaTs</button>
                      </NavLink>
                      <NavLink to="/stocks" className={({ isActive }) => isActive ? 'active' : ''}>
                        <button>Stocks</button>
                      </NavLink>
                      <NavLink to="/football" className={({ isActive }) => isActive ? 'active' : ''}>
                        <button>Football</button>
                      </NavLink>
                      <NavLink to="/jobs" className={({ isActive }) => isActive ? 'active' : ''}>
                        <button>Jobs</button>
                      </NavLink>
                      <NavLink to="/articles" className={({ isActive }) => isActive ? 'active' : ''}>
                        <button>Articles</button>
                      </NavLink>
                      <NavLink to="/nfl" className={({ isActive }) => isActive ? 'active' : ''}>
                        <button>NFL</button>
                      </NavLink>
                    </div>
                  </nav>
                </div>
              
              <div className="main-content">
                <Routes>
                  <Route path="/jobs" element={<JobList />} />
                  <Route path="/football" element={<SportsFetcher />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/nfl" element={<NFL />} />
                  <Route path="/stocks" element={<Stocks />} />
                  <Route path="/" element={<LoginPage />} />
                </Routes>
              </div>
            </div>
          </JobProvider>
        </SportProvider>
      </NewsProvider>
      </GlobalStateProvider>
    </Router>
  );
};

export default App;
