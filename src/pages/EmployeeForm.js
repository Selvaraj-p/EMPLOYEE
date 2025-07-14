import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
  role: '',
};

const EmployeeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editEmployee = location.state?.employee || null;

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editEmployee) {
      setFormData(editEmployee);
    }
  }, [editEmployee]);

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Email format is invalid';
    }
    if (!formData.department.trim()) errs.department = 'Department is required';
    if (!formData.role.trim()) errs.role = 'Role is required';
    return errs;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    if (editEmployee) {
      console.log('Updated Employee:', formData);
      alert('Employee updated successfully! (Simulated)');
    } else {
      console.log('New Employee:', formData);
      alert('Employee added successfully! (Simulated)');
    }

    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{editEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['firstName', 'lastName', 'email', 'department', 'role'].map(field => (
          <div key={field}>
            <label className="block mb-1 font-medium">
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              className="w-full border p-2 rounded"
              value={formData[field]}
              onChange={handleChange}
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            {editEmployee ? 'Update' : 'Add'}
          </button>
          <button type="button" onClick={() => navigate('/')} className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
