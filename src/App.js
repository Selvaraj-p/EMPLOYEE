import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmployeeForm from './pages/EmployeeForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/form" element={<EmployeeForm />} />
      </Routes>
    </Router>
  );
}

export default App;