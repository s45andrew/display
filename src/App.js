import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { GlobalStateProvider } from './comp/txtfiles/GlobalStateContext';
import { JobProvider } from './comp/jobContext';
import { SportProvider } from './comp/sportContext';
import { NewsProvider } from './comp/newsContext';

import SportsFetcher from './comp/sportsFetcher';
import Stocks from './comp/stocks';
import Articles from './comp/articles';
import NFL from './comp/nfl';
import './App.css'; // Import the CSS file
import LoginPage from './comp/txtfiles/myStocks';
import NotFound from './comp/txtfiles/notfound';
import Navbar from './comp/txtfiles/navbar';
import Adding from './comp/txtfiles/adding';
import TodoList from './comp/txtfiles/todoList';
const App = () => {
  return (
    <Router>
      <GlobalStateProvider>
      <NewsProvider>
        <SportProvider>
          <JobProvider>
            <div className="App">
         
<Navbar />
              
              <div className="main-content">
                <Routes>
                  <Route path="/jobs" element={<Articles />} />
                  <Route path="/football" element={<SportsFetcher />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/nfl" element={<NFL />} />
                  <Route path="/stocks" element={<Stocks />} />
                  <Route path="/" element={<LoginPage />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="adding" element={<Adding /> } />
                  <Route path="todoList" element={<TodoList /> } />
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
