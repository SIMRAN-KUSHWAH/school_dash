import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    studentName: '',
    fatherName: '',
    motherName: '',
    className: '',
    age: '',
    gender: '',
    medium: '',
    admsnId: '',
    admsnDate: '',
    adhaarNumber: '',
    admsnFee: '',
    feeStatus: '',
    payMode: 'Cash On Admission',
  });

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

  const [student, setStudent] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const studentPerPage = 5;

  useEffect(() => {
    Modal.setAppElement('#root');

    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axios.get('http://server3.khaugalli.info/api/students');
      setStudent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://server3.khaugalli.info/api/student', formData);
  //     setStudent([...student, response.data]);
  //     setFormData({
  //       userId: '',
  //       studentName: '',
  //       fatherName: '',
  //       motherName: '',
  //       className: '',
  //       age: '',
  //       gender: '',
  //       medium: '',
  //       admsnId: '',
  //       admsnDate: '',
  //       adhaarNumber: '',
  //       admsnFee: '',
  //       feeStatus: '',
  //       payMode: 'Cash On Admission',
  //     });
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const handleUpdate = async (_id) => {
    try {
      setModalIsOpen(true);
      console.log("open")
      const response = await axios.get(`http://server3.khaugalli.info/api/student/${_id}`);
      const updatedStudent = response.data;
      setFormData({
        userId: updatedStudent.userId,
        studentName: updatedStudent.studentName,
        fatherName: updatedStudent.fatherName,
        motherName: updatedStudent.motherName,
        className: updatedStudent.className,
        age: updatedStudent.age,
        gender: updatedStudent.gender,
        medium: updatedStudent.medium,
        admsnId: updatedStudent.admsnId,
        admsnDate: updatedStudent.admsnDate,
        adhaarNumber: updatedStudent.adhaarNumber,
        admsnFee: updatedStudent.admsnFee,
        feeStatus: updatedStudent.feeStatus,
        payMode: updatedStudent.payMode,
        _id: updatedStudent._id,
      });
    
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this student?');
      if (confirmed) {
        await axios.delete(`http://server3.khaugalli.info/api/student/${_id}`);
        setStudent((prevStudents) => prevStudents.filter((stu) => stu._id !== _id));
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://server3.khaugalli.info/api/student/${formData._id}`, formData);
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

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
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
    borderRadius: '20px',
  };

  const activePaginationItemStyle = {
    ...paginationItemStyle,
    backgroundColor: 'blue',
    fontWeight: 'bold',
    color: 'white',
  };

  const thStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    backgroundColor:getRandomColor(),
    fontWeight: 'bold',
  };

  const tdStyle = {
    padding: '10px',
    border: '1px solid #ccc',
  
  };

  const evenRowStyle = {
    backgroundColor: '#f9f9f9',
  };

  const hoverRowStyle = {
    backgroundColor: '#e6e6e6',
  };

  // Search functionality
  const filteredStudent = student.filter((stu) => {
    const searchFields = [
      stu.userId,
      stu.studentName,
      stu.fatherName,
      stu.motherName,
      stu.gender,
      stu.age,
      stu.className,
      stu.medium,
      stu.admsnId,
      stu.admsnDate,
      stu.adhaarNumber,
      stu.admsnFee,
      stu.feeStatus,
    ];
    return searchFields.some((field) =>
      (field ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination
  const indexOfLastStudent = currentPage * studentPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentPerPage;
  const currentStudent = filteredStudent.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudent.length / studentPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div style={{marginTop:"70px"}}>
      <div>
        <h2>Student Search By Name</h2>
        <br></br>
        <input
          type="text"
          placeholder="Search By Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ height: 40, width: '28%', borderRadius: 20 }}
        />
      </div>
      <br></br> <br></br>
      <div style={{ flexDirection: 'row', display: 'flex' }}>
        <h4>Student List</h4>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>User ID</th>
            <th style={thStyle}>Student Name</th>
            <th style={thStyle}>Father's Name</th>
            <th style={thStyle}>Mother's Name</th>
            <th style={thStyle}>Class</th>
            <th style={thStyle}>Age</th>
            <th style={thStyle}>Gender</th>
            <th style={thStyle}>Medium</th>
            <th style={thStyle}>Admission ID</th>
            <th style={thStyle}>Admission Date</th>
            <th style={thStyle}>Aadhaar Number</th>
            <th style={thStyle}>Admission Fee</th>
            <th style={thStyle}>Fee Status</th>
          
            <th style={thStyle}>Status</th>
          
          </tr>
        </thead>
        <tbody>
          {currentStudent.map((stu, index) => (
            <tr
              key={stu._id}
              style={index % 2 === 0 ? evenRowStyle : {}}
              onMouseOver={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td style={tdStyle}>{stu.userId}</td>
              <td style={tdStyle}>{stu.studentName}</td>
              <td style={tdStyle}>{stu.fatherName}</td>
              <td style={tdStyle}>{stu.motherName}</td>
              <td style={tdStyle}>{stu.className}</td>
              <td style={tdStyle}>{stu.age}</td>
              <td style={tdStyle}>{stu.gender}</td>
              <td style={tdStyle}>{stu.medium}</td>
              <td style={tdStyle}>{stu.admsnId}</td>
              <td style={tdStyle}>{stu.admsnDate}</td>
              <td style={tdStyle}>{stu.adhaarNumber}</td>
              <td style={tdStyle}>{stu.admsnFee}</td>
              <td style={tdStyle}>{stu.feeStatus}</td>
           
              <td style={tdStyle}>
                <button  style={styles.button} onClick={() => handleUpdate(stu._id)}>Update</button>
                <button  style={styles.button2} onClick={() => handleDelete(stu._id)}>Delete</button>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={paginationStyle}>
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            style={paginationItemStyle}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              style={currentPage === page ? activePaginationItemStyle : paginationItemStyle}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            style={paginationItemStyle}
          >
            Next
          </button>
        </div>
      )}

      {/* Update Modal */}
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
      background: '#fff',

    }
  }}
>
      <h2 style={{ marginBottom: '20px' }}>Update Student</h2>
      <hr></hr>
      <form onSubmit={handleUpdateSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label>User ID:</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            readOnly
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Student Name:</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Father's Name:</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Mother's Name:</label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Class:</label>
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Age:</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Medium:</label>
          <input
            type="text"
            name="medium"
            value={formData.medium}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Admission ID:</label>
          <input
            type="text"
            name="admsnId"
            value={formData.admsnId}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Admission Date:</label>
          <input
            type="text"
            name="admsnDate"
            value={formData.admsnDate}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Aadhaar Number:</label>
          <input
            type="text"
            name="adhaarNumber"
            value={formData.adhaarNumber}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Admission Fee:</label>
          <input
            type="text"
            name="admsnFee"
            value={formData.admsnFee}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>Fee Status:</label>
          <input
            type="text"
            name="feeStatus"
            value={formData.feeStatus}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>
        <div>
          <button type="submit" style={{ marginRight: '10px', padding: '8px 16px', background: 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update</button>
          <button onClick={closeModal} style={{ padding: '8px 16px', background: 'gray', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
        </div>
      </form>
    </Modal>
    </div>
  );
};

export default StudentForm;
