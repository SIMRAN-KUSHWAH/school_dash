import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubmitFeeForm = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [classList, setClassList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [feeSubmissions, setFeeSubmissions] = useState([]);
  const [studentData, setStudentData] = useState({});
  useEffect(() => {
    fetchClassList();
  }, []);

  const fetchClassList = async () => {
    try {
      const response = await axios.get('http://server3.khaugalli.info/api/classes');
      setClassList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedClass) {
      fetchStudentList();
    }
  }, [selectedClass]);

  const fetchStudentList = async () => {
    try {
      const response = await axios.get(`http://server3.khaugalli.info/api/students/${selectedClass}`);
      setStudentList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the fee submission request to the server
      const response = await axios.post('http://server3.khaugalli.info/api/fess', {
        studentId: selectedStudent,
        feeAmount: feeAmount
      });

      console.log(response.data); // Handle the response as needed

      // Reset the form
      setSelectedStudent('');
      setFeeAmount('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeeSubmissions();
  }, []);

  const fetchFeeSubmissions = async () => {
    try {
      const response = await axios.get('http://server3.khaugalli.info/api/fess/get');
      setFeeSubmissions(response.data);
      fetchStudentData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudentData = async (submissions) => {
    try {
      const studentIds = submissions.map((submission) => submission.studentId);
      const response = await axios.post('http://server3.khaugalli.info/api/student/bulk', {
        studentIds
      });
      const students = response.data;
      const studentDataMap = students.reduce((map, student) => {
        map[student._id] = student;
        return map;
      }, {});
      setStudentData(studentDataMap);
    } catch (error) {
      console.error(error);
    }
  };



  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedStudent('');
    setStudentList([]);
    fetchStudentList();
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  return (
    <>
    <div style={{flexDirection:'row',display:'flex', justifyContent:'space-between'}}> 
    <div style={{width:'35%'}}>
      <form onSubmit={handleSubmit} style={styles.form}>


        <h1 style={{marginBottom:'20px'}}>Fees Payment</h1>
        <br />
        <label style={styles.label}>
         <p>Class:</p> 
          <select value={selectedClass} onChange={handleClassChange} style={styles.select}>
            <option value="" disabled>Select Class</option>
            {classList && classList.length > 0 ? (
              classList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))
            ) : (
              <option value="" disabled>Loading...</option>
            )}
          </select>

        </label>
        <br />
        <label style={styles.label}>
         <p> Student:</p>
          <select value={selectedStudent} onChange={handleStudentChange} style={styles.select}>
            <option value="">Select Student</option>
            {studentList.map((student) => (
              <option key={student._id} value={student._id}>
                {student.studentName} - {student.fatherName}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label style={styles.label}>
        <p> Amount:</p>
          <input
            type="text"
            value={feeAmount}
            onChange={(e) => setFeeAmount(e.target.value)}
            style={styles.input}
          />
        </label>
        <br />
        <button type="submit" style={styles.button} onPress={handleSubmit}>
          Submit Fee
        </button>
      </form>
      </div>
      <div style={{ marginTop: '80px', width: '60%' }}>
  <h2>Fee Submissions</h2>
  <br/>
  {feeSubmissions.map((submission) => (
  <div key={submission._id} style={styles.card}>
    <p>Student: {submission.studentId?.studentName}</p>
    <p>Amount: {submission.feeAmount}</p>
    <p>Class ID: {submission.studentId?.className}</p>
  </div>
))}
</div>

</div>
    </>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    // backgroundColor: '#f2f2f2',
    borderRadius: '5px',
    marginTop: '70px',
    width: '110%',
    border: '2px solid lightgrey'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '10px',
    width:'100%'
  },
  select: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    color: 'black',
    appearance: 'menulist',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    marginTop: '20px',
    padding: '8px 12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default SubmitFeeForm;
