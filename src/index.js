// точка входа в проект

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import './pages/index.css';
import { HashRouter as Router,  Route,  Routes } from "react-router-dom";
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import ProtectedRoute from './components/ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
            <div>
              <Routes>
                <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            </div>
        </Router>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();