import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeCard = ({ employee }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/form', { state: { employee } });
  };

  const handleDelete = () => {
    alert(`Deleting ${employee.firstName} (simulated)`);
  };

  return (
    <div className="border p-4 rounded shadow-sm flex justify-between items-center">
      <div>
        <p><strong>ID:</strong> {employee.id}</p>
        <p><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Role:</strong> {employee.role}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button onClick={handleEdit} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </div>
    </div>
  );
};

export default EmployeeCard;
