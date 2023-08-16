import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    fatherName: '',
    motherName: '',
    gender: '',
    age: '',
    qualification:'',
    experience:'',
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
  const teachersPerPage = 5;

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        qualification:'',
        experience:'',
        designation: '',
        JobId: '',
        JoinDate: '',
        adhaarNumber: '',
        Salary: ''
      });
      alert('Successfully sent data');
    } catch (error) {
      console.error(error.message);
      alert('Fill in the data');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Add Teacher / Staff</h2>
        <div style={styles.row}>
          <div style={styles.column}>
            <label style={styles.label}>
              User ID:
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Father's Name:
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Mother's Name:
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
          </div>
          <div style={styles.column}>
          <div style={styles.fieldGroup}>
  <label style={styles.label}>
    Gender:
    <select
      name="gender"
      value={formData.gender}
      onChange={handleChange}
      style={styles.input}
    >
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
  </label>
</div>

            <label style={styles.label}>
              Age [Date of Birth]:
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Qualification:
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Experience:
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
           
            
          </div>
          <div style={styles.column}>
          <div style={styles.fieldGroup}>
  <label style={styles.label}>
    Designation:
    <select
      name="designation"
      value={formData.designation}
      onChange={handleChange}
      style={styles.input}
    >
      <option value="">Select Designation</option>
      <option value="Principal">Principal</option>
      <option value="Vice Principal">Vice Principal</option>
      <option value="Teacher">Teacher</option>
      <option value="Hindi Teacher">Hindi Teacher</option>
      <option value="English Teacher">English Teacher</option>
      <option value="Sanskarit Teacher">Sanskarit Teacher</option>
      <option value="History Teacher">History Teacher</option> 
    <option value="Science Teacher">Science Teacher</option>
    <option value="Math Teacher">Math Teacher</option>
      <option value="Councller">Councller</option>
    </select>
  </label>
</div>

          <label style={styles.label}>
              Job ID:
              <input
                type="text"
                name="JobId"
                value={formData.JobId}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Join Date:
              <input
                type="date"
                name="JoinDate"
                value={formData.JoinDate}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Aadhaar Number:
              <input
                type="text"
                name="adhaarNumber"
                value={formData.adhaarNumber}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
           
          </div>
          <label style={styles.label}>
              Salary:
              <input
                type="text"
                name="Salary"
                value={formData.Salary}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
        </div>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TeacherForm;

const styles = {
  container: {
    marginTop: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    // maxWidth: '1000px',
    padding: '20px',
    // borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: '4px',
  },
  heading: {
    borderBottom: '2px solid blue',
    paddingBottom: '10px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flex: '1 1 300px',
    padding: '10px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom:'5px'
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom:'10px'
  },
  button: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#f50057',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width:'230px'
  },
};
