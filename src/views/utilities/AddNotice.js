import React, { useState } from 'react';
import axios from 'axios';

const NoticeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    order: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://server3.khaugalli.info/api/notice', formData);
      setFormData({
        title: '',
        content: '',
        order: '',
        date: ''
      });
      alert('Notice sent successfully');
    } catch (error) {
      console.error(error.message);
      alert('Failed to send notice');
    }
  };

  return (
    <div style={styles.container}>
             <h2 style={styles.heading}>Send Notice to Everyone</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
 
        <div style={styles.row}>
          <div style={styles.column}>
            <label style={styles.label}>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Content:
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                style={styles.inputb}
              ></textarea>
            </label>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Order:
                <select
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Order</option>
                  <option value="Principal">Principal</option>
                  <option value="Counselor">Counselor</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Students">Students</option>
                  <option value="Guard">Guard</option>
                </select>
              </label>
            </div>
            <label style={styles.label}>
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
          </div>
        </div>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '80px',
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '70%',
    padding: '20px',
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: '4px',
    // backgroundColor: '#f9f9f9'
  },
  heading: {
    // borderBottom: '1px solid lightGrey',
    paddingBottom: '10px',
    marginBottom: '20px',
    // color: 'blue',
    fontWeight: 'bold',
    fontSize: '34px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  column: {
    flex: '1 1 300px',
    padding: '10px'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px'
  },
  inputb: {
    width: '100%',
    height: '90px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px'
  },
  fieldGroup: {
    marginBottom: '20px'
  },
  button: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#f50057',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width:'250px',
    margin:'10px'
  }
};

export default NoticeForm;

