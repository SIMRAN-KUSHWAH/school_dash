import React, { useState } from 'react';
import axios from 'axios';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://server3.khaugalli.info/api/student', formData);
      if (response.status === 201) {
        setFormData({
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
          payMode: '',
        });
        alert('Successfully sent data');
      }
    } catch (error) {
      console.error(error.message);
      alert('Fill in the data properly');
    }
  };
  

  return (
    <div style={styles.container}>
      {/* <h1>Admission Form - 2023 </h1> */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Add Student</h2>
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
              Student Name:
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
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
    Class:
    <select
      name="className"
      value={formData.className}
      onChange={handleChange}
      style={styles.input}
    >
      <option value="">Select Class</option>
      {[...Array(10)].map((_, index) => (
        <option key={index} value={index + 1}>
          Class {index + 1}
        </option>
      ))}
    </select>
  </label>
</div>

            <label style={styles.label}>
              Age [Date of Birth] :
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
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
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    
    </select>
  </label>
</div>

          </div>
          <div style={styles.column}>
          <div style={styles.fieldGroup}>
  <label style={styles.label}>
    Medium:
    <select
      name="medium"
      value={formData.medium}
      onChange={handleChange}
      style={styles.input}
    >
      <option value="">Select Medium</option>
      <option value="English">English</option>
      <option value="Hindi">Hindi</option>
      <option value="French">French</option>
     
    </select>
  </label>
</div>

            <label style={styles.label}>
              Admission ID:
              <input
                type="text"
                name="admsnId"
                value={formData.admsnId}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Admission Date:
              <input
                type="date"
                name="admsnDate"
                value={formData.admsnDate}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
          </div>
          <div style={styles.column}>
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
            <div style={styles.fieldGroup}>
  <label style={styles.label}>
    Admission Fee:
    <select
      name="admsnFee"
      value={formData.admsnFee}
      onChange={handleChange}
      style={styles.input}
    >
      <option value="">Select Admission Fee</option>
      <option value="400">Class 1-4 / 500</option>
      <option value="1500">Class 5-8 / 1500</option>
      <option value="2500">Class 9-10 / 2500</option>
      
    </select>
  </label>
</div>

<div style={styles.fieldGroup}>
  <label style={styles.label}>
    Fee Structure:
    <select
      name="feeStatus"
      value={formData.feeStatus}
      onChange={handleChange}
      style={styles.input}
    >
      <option value="">Select Fee Status</option>
      <option value="20000">class 1 - 4 [20000]</option>
      <option value="40000">class 4 - 8 [40000]</option>
      <option value="50000">class 9 - 10 [50000]</option>
    </select>
  </label>
</div>

          </div>
        </div>
        <label style={styles.label}>
          Payment Mode:
          <select
            name="payMode"
            value={formData.payMode}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="Cash On Admission">Cash On Admission</option>
            <option value="Online Payment">Online Payment</option>
            <option value="Cash Payment">Cash Payment</option>
            <option value="Check Payment">Check Payment</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </label>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentForm;

const styles = {
  container: {
    marginTop: '70px',
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  
    padding: '20px',

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
  select: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    appearance: 'none',
  },
    button: {
      marginTop: '30px',
      padding: '8px 12px',
      backgroundColor: '#f50057',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      width:'250px',
      alignSelf:'flex-end'
    },
  };
  