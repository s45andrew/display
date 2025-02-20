
import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { JobProvider } from './comp/jobContext';
import { SportProvider } from './comp/sportContext';
import { NewsProvider } from './comp/newsContext';
import JobList from './comp/jobs';
import SportsFetcher from './comp/sportsFetcher';
import Stocks from './comp/stocks';
import Articles from './comp/articles';
import NFL from './comp/nfl';
import './App.css'; // Import the CSS file
import LoginPage
 from './comp/txtfiles/myStocks';
const App = () => {
  return (
    <Router>
      <NewsProvider>
        <SportProvider>
          <JobProvider>
            <div>
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
              <Routes>
                <Route path="/jobs" element={<JobList />} />
                <Route path="/football" element={<SportsFetcher />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/nfl" element={<NFL />} />
                <Route path="/stocks" element={<Stocks />} />
                <Route path="/" element ={<LoginPage />} />
               
              </Routes>
            </div>
          </JobProvider>
        </SportProvider>
      </NewsProvider>
    </Router>
  );
};

export default App;
