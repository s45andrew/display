import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { JobProvider } from './comp/jobContext';
import { SportProvider } from './comp/sportContext';
import { NewsProvider } from './comp/newsContext';
import JobList from './comp/jobs';
import Football from './comp/football';
import Stocks from './comp/stocks';
import Articles from './comp/articles';

const App = () => {
  return (
    <Router>
      <NewsProvider>
        <SportProvider>
          <JobProvider>
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
                    <Link to="/articles">Articles</Link>
                  </li>
                </ul>
              </nav>
              <Routes>
                <Route path="/jobs" element={<JobList />} />
                <Route path="/football" element={<Football />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/" element={<Stocks />} />
              </Routes>
            </div>
          </JobProvider>
        </SportProvider>
      </NewsProvider>
    </Router>
  );
};

export default App;
