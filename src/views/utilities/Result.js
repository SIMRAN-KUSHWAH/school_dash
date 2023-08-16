import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MarksComponent = () => {
  const [studentData, setStudentData] = useState([]);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [searchClass, setSearchClass] = useState('');
  const [searchSubject, setSearchSubject] = useState('');

  useEffect(() => {
    fetchMarksData();
  }, []);

  const fetchMarksData = async () => {
    try {
      const response = await axios.get('http://server3.khaugalli.info/api/get/marks');
      const data = response.data;
      setStudentData(data);
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };

  const tableStyles = {
    textAlign: 'center',
    margin: '20px',
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #ccc',
  };

  const thStyles = {
    padding: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#f5f5f5',
  };

  
  const selectStyles = {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '10px',
    width:'40%',
    outline: 'none', // Remove focus outline
  };

  const tdStyles = {
    padding: '10px',
    border: '1px solid #ccc',
  };

  const evenRowStyles = {
    backgroundColor: '#f9f9f9',
  };

  const hoverRowStyles = {
    backgroundColor: '#f0f0f0',
  };

  const matchingStudentData = studentData.filter(
    (student) =>
      student.className.toLowerCase() === searchClass.toLowerCase() &&
      student.subject.toLowerCase() === searchSubject.toLowerCase()
  );

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1>Result - Marks Data</h1>
      <div style={{ marginBottom: '20px', marginTop:'30px' }}>
        <label htmlFor="classSelect">Select Class:</label>
        <select
          id="classSelect"
          style={selectStyles}
          value={searchClass}
          onChange={(e) => setSearchClass(e.target.value)}
        >
          <option value="">Select Class</option>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={`class-${i + 1}`} value={`${i + 1}`}>
              Class {i + 1}
            </option>
          ))}
        </select>
        <label htmlFor="subjectSelect">Select Subject:</label>
        <select
          id="subjectSelect"
          style={selectStyles}
          value={searchSubject}
          onChange={(e) => setSearchSubject(e.target.value)}
        >
          <option value="">Select Subject</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="History">History</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="Computer Science">Computer Science</option>
        </select>
      </div>
      {matchingStudentData.length > 0 ? (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Student Name</th>
              <th style={thStyles}>Class</th>
              <th style={thStyles}>Subject</th>
              <th style={thStyles}>Marks[20]</th>
            </tr>
          </thead>
          <tbody>
            {matchingStudentData.map((student, index) => (
              <tr
                key={student.id}
                style={index % 2 === 0 ? evenRowStyles : {}}
                onMouseOver={() => setHoveredRowIndex(index)}
                onMouseOut={() => setHoveredRowIndex(null)}
              >
                <td
                  style={{
                    ...tdStyles,
                    ...hoveredRowIndex === index ? hoverRowStyles : {},
                  }}
                >
                  {student.studentName}
                </td>
                <td style={tdStyles}>{student.className}</td>
                <td style={tdStyles}>{student.subject}</td>
                <td style={tdStyles}>{student.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No matching data found.</p>
      )}
    </div>
  );
};

export default MarksComponent;
