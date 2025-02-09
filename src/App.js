// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route,Routes,Link } from 'react-router-dom';
import JobList from './comp/jobs';
import Football from './comp/football';
import Stocks from './comp/stocks';
import Articles from'./comp/articles';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Stocks</Link>
            </li>
            <li>
              <Link to="/football">Football</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/Articles">articles</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/jobs" element={<JobList />} />
        
          <Route path="/football" element={<Football />} />
          
          <Route path="/articles" element={<Articles />} />
         
          <Route path="/"  element={<Stocks />} />
        
        </Routes>
      </div>
    </Router>
  );
};

export default App;
