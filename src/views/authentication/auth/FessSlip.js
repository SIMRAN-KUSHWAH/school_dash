import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeeSubmissions = () => {
  const [feeSubmissions, setFeeSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFeeSubmissions();
  }, []);

  const fetchFeeSubmissions = async () => {
    try {
      const response = await axios.get('http://server3.khaugalli.info/api/fess/get');
      setFeeSubmissions(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSubmissions = feeSubmissions.filter((submission) => {
    const searchValue = searchQuery.toLowerCase();
    const submissionDate = new Date(submission.submissionDate).toLocaleDateString();

    return submissionDate.includes(searchValue);
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by date (DD-MM-YYYY)"
          value={searchQuery}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
      </div>
      {isLoading ? (
        <p style={styles.loading}>Loading...</p>
      ) : (
        <div style={styles.content}>
          <h2 style={styles.heading}>Fee Submissions</h2>
          <button onClick={handlePrint} style={styles.printButton}>
            Print
          </button>
          <table style={styles.table}>
            <thead>
              <tr style={styles.th}>
                <th>User Id</th>
                <th>Student Name</th>
                <th>Father's Name</th>
                <th>Class</th>
                <th>Medium</th>
                <th>Total Fee</th>
                <th>Pay Fee</th>
                <th>Submission Date</th>
                <th>Remaining Fee</th>
              </tr>
            </thead>
            <tbody>
            {filteredSubmissions.map((submission, index) => (
  <React.Fragment key={submission._id}>
    <tr key={submission._id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
      <td>{submission.studentId?.userId}</td>
      <td>{submission.studentId?.studentName}</td>
      <td>{submission.studentId?.fatherName}</td>
      <td>{submission.studentId?.className}</td>
      <td>{submission.studentId?.medium}</td>
      <td>{submission.studentId?.feeStatus}</td>
      <td>{submission.feeAmount}</td>
      <td>{new Date(submission.submissionDate).toLocaleDateString('en-US')}</td>
      <td style={submission.studentId && submission.studentId.feeStatus - submission.feeAmount > 0 ? styles.remainingFee : {}}>
        {submission.studentId && submission.studentId.feeStatus - submission.feeAmount}
      </td>
    </tr>
    <tr style={styles.spacerRow}>
      <td colSpan="9">&nbsp;</td>
    </tr>
  </React.Fragment>
))}

            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  loading: {
    textAlign: 'center',
  },
  heading: {
    marginBottom: '16px',
    color: '#333',
  },
  searchContainer: {
    marginBottom: '16px',
  },
  searchInput: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '14px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderBottom: '1px solid grey',
  },
  th: {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid grey',
    backgroundColor: '#f2f2f2',
  },
  td: {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid grey',
   
  },
  remainingFee: {
    fontWeight: 'bold',
    color: 'red',
    backgroundColor: 'yellow',
  },
  printButton: {
    marginBottom: '16px',
    padding: '8px 12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  hoverRow: {
    backgroundColor: '#e6e6e6',
  },
};

export default FeeSubmissions;
