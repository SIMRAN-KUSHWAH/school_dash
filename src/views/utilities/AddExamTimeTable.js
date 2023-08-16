import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddExamTimeTable = () => {
  const [examTimeTable, setExamTimeTable] = useState([]);
  const [formData, setFormData] = useState({
    subject: '',
    class: '',
    date: '',
    startTime: '',
    endTime: '',
    venue: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchExamTimeTable();
  }, []);

  const fetchExamTimeTable = async () => {
    try {
      const response = await axios.get('http://server3.khaugalli.info/api/exam/get');
      setExamTimeTable(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.class) {
      newErrors.class = 'Class is required';
      isValid = false;
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
      isValid = false;
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
      isValid = false;
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
      isValid = false;
    }

    if (!formData.venue) {
      newErrors.venue = 'Venue is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleDelete = async (index) => {
    try {
      const examId = examTimeTable[index]._id;
      await axios.delete(`http://server3.khaugalli.info/api/exam/${examId}`);
      alert('Exam deleted successfully');
      const updatedExamTimeTable = [...examTimeTable];
      updatedExamTimeTable.splice(index, 1);
      setExamTimeTable(updatedExamTimeTable);
    } catch (error) {
      console.error(error.message);
      alert('Failed to delete exam');
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const selectedExam = examTimeTable[index];
    setFormData({
      subject: selectedExam.subject,
      class: selectedExam.class,
      date: selectedExam.date,
      startTime: selectedExam.startTime,
      endTime: selectedExam.endTime,
      venue: selectedExam.venue
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (editIndex !== null) {
        const examId = examTimeTable[editIndex]._id;
        const updatedExamData = { ...formData };
        delete updatedExamData._id;
        await axios.put(`http://server3.khaugalli.info/api/exam/${examId}`, updatedExamData);
        alert('Exam updated successfully');
        setEditIndex(null);
      } else {
        await axios.post('http://server3.khaugalli.info/api/exam', formData);
        alert('Exam time table added successfully');
      }
      setFormData({
        subject: '',
        class: '',
        date: '',
        startTime: '',
        endTime: '',
        venue: ''
      });
      fetchExamTimeTable();
    } catch (error) {
      console.error(error.message);
      alert('Failed to add/update exam time table');
    }
  };

  return (
    <div style={{marginTop:'90px'}}>
      <h2>Add Exam Time Table</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ padding: 10 }}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Subject:
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Subject</option>
                  <option value="Math">Math</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Sanskrit">Sanskrit</option>
                  <option value="General Knowledge">General Knowledge</option>
                  <option value="Computer">Computer</option>
                  <option value="Geography">Geography</option>
                  <option value="English">English</option>
                </select>
              </label>
              {errors.subject && <span style={styles.error}>{errors.subject}</span>}
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Class:
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Class</option>
                  <option value="All Classes 1-10">All Classes 1-10</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                  <option value="Class 6">Class 6</option>
                  <option value="Class 7">Class 7</option>
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                </select>
              </label>
              {errors.class && <span style={styles.error}>{errors.class}</span>}
            </div>
          </div>
          <div style={{ padding: 10 }}>
            <div style={styles.fieldGroup}>
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
              {errors.date && <span style={styles.error}>{errors.date}</span>}
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Start Time:
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              {errors.startTime && <span style={styles.error}>{errors.startTime}</span>}
            </div>
          </div>
          <div style={{ padding: 10 }}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                End Time:
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              {errors.endTime && <span style={styles.error}>{errors.endTime}</span>}
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Venue:
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  style={styles.input}
                />
              </label>
              {errors.venue && <span style={styles.error}>{errors.venue}</span>}
            </div>
          </div>
        </div>
        <button type="submit" style={editIndex !== null ? styles.updateButton : styles.button}>
          {editIndex !== null ? 'Update' : 'Submit'}
        </button>
      </form>
      <hr></hr>
<h3>Exam Time Table Data</h3>
      {examTimeTable.length > 0 ? (
        <div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Subject</th>
                <th style={styles.tableHeader}>Class</th>
                <th style={styles.tableHeader}>Date</th>
                <th style={styles.tableHeader}>Start Time</th>
                <th style={styles.tableHeader}>End Time</th>
                <th style={styles.tableHeader}>Venue</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {examTimeTable.map((field, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>{field.subject}</td>
                  <td style={styles.tableCell}>{field.class}</td>
                  <td style={styles.tableCell}>{field.date}</td>
                  <td style={styles.tableCell}>{field.startTime}</td>
                  <td style={styles.tableCell}>{field.endTime}</td>
                  <td style={styles.tableCell}>{field.venue}</td>
                  <td style={styles.tableCell}>
                    <button style={styles.editButton} onClick={() => handleEdit(index)}>
                      Edit
                    </button>
                    <button style={styles.deleteButton} onClick={() => handleDelete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No exam time table data available</p>
      )}
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    // margin: '0 auto',
    borderTop: '1px solid lightGrey',
    padding: '20px',
    // flex: 1,
    // alignItems: 'center'
  },
  fieldGroup: {
    marginBottom: '1rem',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    marginTop: '1rem',
    padding: '8px 12px',
    backgroundColor: '#f50057',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '250px',
    margin:'7px'
  },
  updateButton: {
    marginTop: '1rem',
    padding: '8px 12px',
    backgroundColor: '#f50057',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '250px',
    margin:'7px'
  },
  table: {
    marginTop: '1rem',
    borderCollapse: 'collapse',
    width: '100%',
    border: '1px solid #ccc',
  },
  tableRow: {
    border: '1px solid #ccc',
  },
  tableHeader: {
backgroundColor:'#87bdd8',
    color: 'white',
    padding: '8px',
    textAlign: 'left',
  },
  tableCell: {
    padding: '8px',
  },
  editButton: {
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '0.8rem',
  },
};

export default AddExamTimeTable;
