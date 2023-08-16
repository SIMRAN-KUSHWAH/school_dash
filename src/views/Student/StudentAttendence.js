import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherAttendanceScreen = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]); // State for filtered data
  const [isLoading, setIsLoading] = useState(true);
  const [teacherFilter, setTeacherFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://server3.khaugalli.info/api/attendance/get');
      setAttendanceData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (attendanceData.length > 0) {
      // Apply filters to attendanceData whenever filters change
      const filteredData = attendanceData.filter((attendance) => {
        const teacherMatch = attendance.student && attendance.student.studentName.includes(teacherFilter);
        const dateMatch = dateFilter === '' || new Date(attendance.date).toLocaleDateString().includes(dateFilter);
  
        return teacherMatch && dateMatch;
      });
  
      setFilteredAttendance(filteredData);
    }
  }, [attendanceData, teacherFilter, dateFilter]);
  
  const renderTable = () => (
    <table style={styles.table}>
      <thead>
        <tr style={styles.headerRow}>
          <th style={styles.headerCell}>Student Name </th>
          <th style={styles.headerCell}>Date</th>
          <th style={styles.headerCell}>Attendence</th>
       
        </tr>
      </thead>
      <tbody>
        {filteredAttendance.map((item) => (
          <tr key={item._id}>
            <td style={styles.cell}>{item.student.studentName}</td>
            <td style={styles.cell}>{new Date(item.date).toLocaleDateString()}</td>
            <td style={{ ...styles.cell, color: item.isStudentPresent ? 'green' : 'red' }}>
  {item.isStudentPresent === false ? 'Absent' : 'Present'}
</td>

          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div style={styles.container}>
      <div style={styles.filters}>
      <p style={{padding:5}}> Name:</p>
        <input
          type="text"
          placeholder="Search By name......."
          value={teacherFilter}
          onChange={(e) => setTeacherFilter(e.target.value)}
          style={styles.input}
        />
        <p style={{padding:5}}> Date:</p>
        <input
          type="text"
          placeholder="Search By Date......."
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={styles.input}
        />
      </div>
      <p style={{marginTop:'20px'}}>Student Attendance Sheet</p>
      {isLoading ? <p style={styles.loading}>Loading...</p> : renderTable()}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    marginTop: '70px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    // marginTop: '20px',
    border:'2px solid lightgrey',
    justifyContent:'center',
    textAlign:'center'
  },
  headerRow: {
    backgroundColor: '#f50057',
    color: 'white',
    justifyContent:'center',
    textAlign:'center'
  },
  headerCell: {
    padding: '12px 8px',
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
  },
  cell: {
    padding: '10px 8px',
    borderBottom: '1px solid #ddd',
  },
  filters: {
    display: 'flex',
    marginBottom: '10px',
  },
  input: {
    flex: 1,
    marginRight: '10px',
    padding: '8px',
    borderWidth: '1px',
    borderColor: '#ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '8px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
  },
};

export default TeacherAttendanceScreen;
