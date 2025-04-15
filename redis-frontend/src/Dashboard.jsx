import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import './App.css';
import Sidebar from './Sidebar';

const API_URL = 'http://localhost:5000/residents';

function Dashboard() {
  const [formData, setFormData] = useState({ id: '', name: '', middle: '', last: '', birthDate: '', age: '', address: '', gender: '', civil: '', employment: '', contact: '' });
  const [residents, setresidents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);  // Controls the popup visibility
  const [searchTerm, setSearchTerm] = useState('');
  

  const fetchresidents = async () => {
    try {
      const response = await axios.get(API_URL);
      setresidents(response.data);
    } catch (error) {
      console.error('Error fetching residents:', error);
    }
  };

  useEffect(() => {
    fetchresidents();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      toast.success('Resident added successfully!');
      fetchresidents();
      setFormData({ id: '', name: '', middle: '', last: '', birthDate: '', age: '', address: '', gender: '', civil: '', employment: '', contact: '' });
      setIsFormOpen(false);
    } catch (error) {
      toast.error('Error adding resident!');
    }
  };

  

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/${formData.id}`, formData); // ✅ Define response
      console.log('Update response:', response.data); // ✅ Now response is defined
      toast.success('Resident updated successfully!');
      fetchresidents();
      setFormData({ id: '', name: '', middle: '', last: '', birthDate: '', age: '', address: '', gender: '', civil: '', employment: '', contact: '' });
      setIsEditing(false);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error updating resident:', error.response?.data || error.message);
      toast.error('Error updating resident!');
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success('Resident deleted!');
      fetchresidents();
    } catch (error) {
      toast.error('Error deleting resident!');
    }
  };

  const handleEdit = (resident) => {
    setFormData(resident);
    setIsEditing(true);
    setIsFormOpen(true);
  };



  const filteredresidents = residents.filter(resident =>
    resident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.middle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.last.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.age.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.employment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.civil.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    
    <div className="container" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex' }}>
      <Sidebar />
      
    </div>
      <h1>Brgy. Hindang Profiling System</h1>
   
      {/* Button to open the form */}
      <button onClick={() => setIsFormOpen(true)}>Add Resident</button>

      {/* The Form Popup */}
      {isFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsFormOpen(false)}>&times;</span>
            <h2>{isEditing ? "Edit Resident" : "Add Resident"}</h2>
            <form onSubmit={isEditing ? handleEditSubmit : handleAddSubmit}>
              <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleChange} required={!isEditing} disabled={isEditing} />
              <input type="text" name="name" placeholder="First Name" value={formData.name} onChange={handleChange} required />
              <input type="text" name="middle" placeholder="Middle Name" value={formData.middle} onChange={handleChange} required />
              <input type="text" name="last" placeholder="Last Name" value={formData.last} onChange={handleChange} required />
              <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
              <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
              <input type="text" name="address" placeholder="Purok/Zone" value={formData.address} onChange={handleChange} required />
              
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <select name="civil" value={formData.civil} onChange={handleChange} required>
                <option value="">Select Civil Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
              </select>

              <select name="employment" value={formData.employment} onChange={handleChange} required>
                <option value="">Select Employment Status</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Employed">Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Student">Student</option>
                <option value="Retired">Retired</option>
              </select>

              <input type="number" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />

              <button type="submit">{isEditing ? "Update Resident" : "Add Resident"}</button>
            </form>
          </div>
        </div>
      )}

      <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />

     

      <h2>Resident List</h2>
      <table border="1" align="center" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Birth</th>
            <th>Age</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Civil</th>
            <th>Employment Status</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {filteredresidents.map((resident) => {
    console.log("Rendering resident:", resident); // 🔍 Debugging Line
    return (
      <tr key={resident.id}>
        <td>{resident.id}</td>
        <td>{`${resident.name} ${resident.middle} ${resident.last}`}</td>
        <td>{resident.birthDate}</td>
        <td>{resident.age}</td>
        <td>{resident.address}</td>
        <td>{resident.gender}</td>
        <td>{resident.civil}</td>
        <td>{resident.employment}</td>
        <td>{resident.contact}</td>
        <td>
          <button onClick={() => handleEdit(resident)}>✏️ Edit</button>
          <button onClick={() => handleDelete(resident.id)}>🗑️ Delete</button>
        </td>
      </tr>
    );
  })}
</tbody>

      </table>

      <ToastContainer />
      <Footer />

    </div>
  );
}

export default Dashboard;
