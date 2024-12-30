import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import WriteLetter from './Pages/WriteLetter';
import SantaCatcher from './Pages/SantaCatcher';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/write-letter" element={<WriteLetter />} />
        <Route path="/santa-catcher" element={<SantaCatcher />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
