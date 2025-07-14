import React, { useState } from 'react';
import employeesData from '../data/mockData';
import EmployeeCard from '../components/EmployeeCard';

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ department: '', role: '' });
  const [sortBy, setSortBy] = useState('');
  const [employees] = useState(employeesData);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const filteredEmployees = employees
    .filter(emp =>
      \`\${emp.firstName} \${emp.lastName}\`.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter(emp =>
      (filter.department ? emp.department === filter.department : true) &&
      (filter.role ? emp.role === filter.role : true)
    )
    .sort((a, b) => {
      if (!sortBy) return 0;
      return a[sortBy].localeCompare(b[sortBy]);
    });

  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Employee Directory</h1>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={handleSearch}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="flex flex-wrap gap-4 mb-4">
        <select onChange={(e) => setFilter({ ...filter, department: e.target.value })} className="p-2 border rounded">
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
        </select>
        <select onChange={(e) => setFilter({ ...filter, role: e.target.value })} className="p-2 border rounded">
          <option value="">All Roles</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="HR Manager">HR Manager</option>
        </select>
        <select onChange={(e) => setSortBy(e.target.value)} className="p-2 border rounded">
          <option value="">Sort By</option>
          <option value="firstName">First Name</option>
          <option value="department">Department</option>
        </select>
        <select onChange={handlePageSizeChange} value={pageSize} className="p-2 border rounded">
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
          <option value="100">100 per page</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {paginatedEmployees.map(emp => (
          <EmployeeCard key={emp.id} employee={emp} />
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <p className="text-sm">Page {currentPage} of {totalPages}</p>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
