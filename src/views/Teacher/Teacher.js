import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const TeacherForm = () => {
  // State variables
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    fatherName: '',
    motherName: '',
    gender: '',
    age: '',
    designation: '',
    JobId: '',
    JoinDate: '',
    adhaarNumber: '',
    Salary: ''
  });
  const [teachers, setTeachers] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null); // Added state variable for selected teacher
  const teachersPerPage = 5;

  // Fetch teachers on component mount
  useEffect(() => {
    Modal.setAppElement('#root');
    fetchTeachers();
  }, []);

  // Fetch teachers data from the API
  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://server3.khaugalli.info/api/teacher/get');
      setTeachers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://server3.khaugalli.info/api/teacher', formData);
      setTeachers([...teachers, response.data]);
      setFormData({
        userId: '',
        name: '',
        fatherName: '',
        motherName: '',
        gender: '',
        age: '',
        designation: '',
        JobId: '',
        JoinDate: '',
        adhaarNumber: '',
        Salary: ''
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // Styles
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  };

  const paginationItemStyle = {
    margin: '0.5rem',
    padding: '0.3rem 0.6rem',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    cursor: 'pointer',
    padding: 20,
    borderRadius: 20
  };

  const activePaginationItemStyle = {
    ...paginationItemStyle,
    backgroundColor: 'blue',
    fontWeight: 'bold',
    color: 'white',
    padding: 20,
    borderRadius: 20
  };

  const thStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    backgroundColor: getRandomColor(),
    fontWeight: 'bold'
  };

  const tdStyle = {
    padding: '10px',
    border: '1px solid #ccc'
  };

  const evenRowStyle = {
    backgroundColor: '#f9f9f9'
  };

  const hoverRowStyle = {
    backgroundColor: '#e6e6e6'
  };

  // Search functionality
  const filteredTeachers = teachers.filter((teacher) => {
    const searchFields = [
      teacher.userId,
      teacher.name,
      teacher.fatherName,
      teacher.motherName,
      teacher.gender,
      teacher.age,
      teacher.designation,
      teacher.JobId,
      teacher.JoinDate,
      teacher.adhaarNumber,
      teacher.Salary
    ];
    return searchFields.some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = (teacher) => {
    setSelectedTeacher(teacher);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedTeacher(null);
    setModalIsOpen(false);
  };
// Update teacher data

const handleUpdate = async (_id) => {
  try {
    setModalIsOpen(true);
    console.log("open")
    const response = await axios.get(`http://server3.khaugalli.info/api/teacher/${_id}`);
    const teacher = response.data;
    setFormData({
      userId: teacher.userId,
      name: teacher.name,
      fatherName: teacher.fatherName,
      motherName: teacher.motherName,
      gender: teacher.gender,
      age: teacher.age,
      designation: teacher.designation,
      JobId: teacher.JobId,
      JoinDate: teacher.JoinDate,
      adhaarNumber: teacher.adhaarNumber,
      Salary: teacher.Salary
    });
  
  } catch (error) {
    console.error(error);
  }
};






/// Delete teacher data
const deleteTeacher = async (_id) => {
  const shouldDelete = window.confirm('Are you sure you want to delete this teacher?');
  if (!shouldDelete) {
    return;
  }

  try {
    await axios.delete(`http://server3.khaugalli.info/api/teacher-data/${_id}`);
    const updatedTeachers = teachers.filter((teacher) => teacher._id !== _id);
    setTeachers(updatedTeachers);
  } catch (error) {
    console.error(error.message);
  }
};
const styles = {
  
  button: {
    
    padding: '2px 4px',
    backgroundColor: '#00BFFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  
 
  },
  button2: {

    padding: '2px 4px',
    backgroundColor: '#f50057',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    
  },

};

const handleUpdateSubmit = async () => {
  try {
    await axios.put(`http://server3.khaugalli.info/api/teacher-data/${formData._id}`, formData);
    setModalIsOpen(false);
  } catch (error) {
    console.error(error);
  }
};

function getRandomColor() {
const lightColors = ['#F0FFF0', '#FDF5E6', '#F5FFFA', 'lavenderblush', '#F0F8FF'];
const randomIndex = Math.floor(Math.random() * lightColors.length);
return lightColors[randomIndex];
}


  return (
    <div style={{marginTop:'70px'}}>
      <div>
        <h2>Staff Search By Name</h2>
        <br></br>
        <input
          type="text"
          placeholder="Search By Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ height: 40, width: '28%', borderRadius: 20 }}
        />
      </div>
      <br></br>        <br></br>
      <div style={{ flexDirection: 'row', display: 'flex' }}>
        <h4>Staff List</h4>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>User ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Father's Name</th>
            <th style={thStyle}>Mother's Name</th>
            <th style={thStyle}>Gender</th>
            <th style={thStyle}>Age</th>
            <th style={thStyle}>Designation</th>
            <th style={thStyle}>Job ID</th>
            <th style={thStyle}>Join Date</th>
            <th style={thStyle}>Aadhaar Number</th>
            <th style={thStyle}>Salary</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTeachers.map((teacher, index) => (
            <tr
              key={teacher.userId}
              style={index % 2 === 0 ? evenRowStyle : {}}
              onMouseOver={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td style={tdStyle}>{teacher.userId}</td>
              <td style={tdStyle}>{teacher.name}</td>
              <td style={tdStyle}>{teacher.fatherName}</td>
              <td style={tdStyle}>{teacher.motherName}</td>
              <td style={tdStyle}>{teacher.gender}</td>
              <td style={tdStyle}>{teacher.age}</td>
              <td style={tdStyle}>{teacher.designation}</td>
              <td style={tdStyle}>{teacher.JobId}</td>
              <td style={tdStyle}>{teacher.JoinDate}</td>
              <td style={tdStyle}>{teacher.adhaarNumber}</td>
              <td style={tdStyle}>{teacher.Salary}</td>
              <td style={tdStyle}>
  <button style={styles.button} onClick={() => handleUpdate(teacher._id)}>Update</button>
  <button  style={styles.button2} onClick={() => deleteTeacher(teacher._id)}>Delete</button>
</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Teacher Modal */}
      <Modal
   isOpen={modalIsOpen}
   onRequestClose={closeModal}
   contentLabel="Update Teacher Modal"
   style={{
     overlay: {
       backgroundColor: 'rgba(0, 0, 0, 0.5)',
       zIndex: 1000
     },
     content: {
       position: 'absolute',
       top: '50%',
       left: '50%',
       transform: 'translate(-50%, -50%)',
       width: '90%',
       height:'800px',
       maxWidth: '500px',
       maxHeight: '90vh',
       overflow: 'auto',
       border: 'none',
       borderRadius: '8px',
       boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
       padding: '20px',
       background: '#fff'
     }
   }}
>
<h2 style={{ marginBottom: '1rem' }}>Update Teacher</h2>
<hr></hr>
<form onSubmit={handleUpdateSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ fontWeight: 'bold' }}>User ID:</label>
    <input
      type="text"
      name="userId"
      value={formData.userId}
      onChange={handleChange}
      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
    />
  </div>
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ fontWeight: 'bold' }}>Name:</label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
    />
  </div>
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ fontWeight: 'bold' }}>Father's Name:</label>
    <input
      type="text"
      name="fatherName"
      value={formData.fatherName}
      onChange={handleChange}
      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
    />
  </div>
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ fontWeight: 'bold' }}>Mother's Name:</label>
    <input
      type="text"
      name="motherName"
      value={formData.motherName}
      onChange={handleChange}
      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
    />
  </div>
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ fontWeight: 'bold' }}>Gender:</label>
    <input
      type="text"
      name="gender"
      value={formData.gender}
      onChange={handleChange}
      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
    />
  </div>
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ fontWeight: 'bold' }}>Age:</label>
    <input
      type="text"
      name="age"
      value={formData.age}
      onChange={handleChange}
      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
    />
  </div>
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ fontWeight: 'bold' }}>Designation:</label>
    <input
      type="text"
      name="designation"
      value={formData.designation}
      onChange={handleChange}
      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
    />
  </div>
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ fontWeight: 'bold' }}>Job ID:</label>
    <input
      type="text"
      name="JobId"
      value={formData.jobId}
      onChange={handleChange}
      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
    />
  </div>
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ fontWeight: 'bold' }}>Join Date:</label>
    <input
      type="text"
      name="JoinDate"
      value={formData.joinDate}
      onChange={handleChange}
      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
    />
  </div>
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ fontWeight: 'bold' }}>Aadhaar Number:</label>
    <input
      type="text"
      name="adhaarNumber"
      value={formData.adhaarNumber}
      onChange={handleChange}
      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
    />
  </div>
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ fontWeight: 'bold' }}>Salary:</label>
    <input
      type="text"
      name="Salary"
      value={formData.salary}
      onChange={handleChange}
      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
    />
  </div>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update</button>
    <button onClick={closeModal} style={{ padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
  </div>
</form>

</Modal>

      {/* Pagination */}
      <div style={paginationStyle}>
        {filteredTeachers.length > teachersPerPage && (
          <ul className="pagination" style={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
            {Array(Math.ceil(filteredTeachers.length / teachersPerPage))
              .fill()
              .map((_, i) => (
                <p
                  key={i}
                  onClick={() => paginate(i + 1)}
                  style={currentPage === i + 1 ? activePaginationItemStyle : paginationItemStyle}
                >
                  {i + 1}
                </p>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeacherForm;
