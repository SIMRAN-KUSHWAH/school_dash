import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegisterParent = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [userClass, setUserClass] = useState('');
  const [parents, setParents] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null); // New state for selected parent

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      const response = await axios.get('http://server3.khaugalli.info/api/parents/get');
      setParents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedParent) {
        // If selectedParent is present, it's an update operation
        await axios.put(`http://server3.khaugalli.info/api/parents/${selectedParent._id}`, {
          name,
          number,
          email,
          password,
          studentName,
          class: userClass,
        });
        setSelectedParent(null); // Clear selected parent after update
        alert('Parent updated successfully');
      } else {
        // If selectedParent is null, it's a create operation
        await axios.post('http://server3.khaugalli.info/api/parents/register', {
          name,
          number,
          email,
          password,
          studentName,
          class: userClass,
        });
        alert('Parent registered successfully');
      }
      fetchParents();
      setName('');
      setNumber('');
      setEmail('');
      setPassword('');
      setStudentName('');
      setUserClass('');
    } catch (error) {
      console.error(error.message);
      alert('Failed to perform the operation');
    }
  };

  const handleDelete = async (parentId) => {
    try {
      await axios.delete(`http://server3.khaugalli.info/api/parents/${parentId}`);
      fetchParents();
      alert('Parent deleted successfully');
    } catch (error) {
      console.error(error.message);
      alert('Failed to delete parent');
    }
  };

  const handleEdit = (parent) => {
    setSelectedParent(parent); // Set the selected parent for update
    setName(parent.name);
    setNumber(parent.number);
    setEmail(parent.email);
    setPassword(parent.password);
    setStudentName(parent.studentName);
    setUserClass(parent.class);
  };

  return (
    <div style={styles.container}>
      <div>
        <h2>Register Parent</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <label>
            Number:
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              style={styles.input}
            />
          </label>
          <br /><div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </label></div>
          <br />
          <div>
          <label>
            Student Name:
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              style={styles.input}
            />
          </label></div>
          <br />
          <label>
  Class:
  <select
    value={userClass}
    onChange={(e) => setUserClass(e.target.value)}
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
    

          <br />
          <button type="submit" style={styles.button}>
            {selectedParent ? 'Update' : 'Register'}
          </button>


     
        </form>
      
      </div>
      <hr style={{ marginTop: '40px', marginBottom: '30px' }}></hr>
      <div>
        <h2>Parent List</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Number</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Password</th>
              <th style={styles.th}>Student Name</th>
              <th style={styles.th}>Class</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parents.map((parent) => (
              <tr key={parent._id}>
                <td style={styles.td}>{parent.name}</td>
                <td style={styles.td}>{parent.number}</td>
                <td style={styles.td}>{parent.email}</td>
                <td style={styles.td}>{parent.password}</td>
                <td style={styles.td}>{parent.studentName}</td>
                <td style={styles.td}>{parent.class}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleDelete(parent._id)}
                    style={styles.actionButton}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(parent)}
                    style={styles.actionButton2}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    // display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    marginTop:'70px'
  },
  input: {
    width: '200px',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#f50057',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '200px',
    marginTop:"20px"
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
  },
  th: {
    backgroundColor: '#87bdd8',
    color: 'white',
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ccc',
  },
  td: {
    border: '1px solid #ccc',
    padding: '8px',
  },
  actionButton: {
    padding: '4px 8px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '4px',
  },
  actionButton2: {
    padding: '4px 8px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '4px',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'flex-start',
  }
  
};

export default RegisterParent;
