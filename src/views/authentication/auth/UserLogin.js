import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserComponent = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // New state for selected user
  const [type, setType] = useState('');
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://server3.khaugalli.info/api/user/get');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        // If selectedUser is present, it's an update operation
        await axios.put(`http://server3.khaugalli.info/api/user/${selectedUser._id}`, {
          name,
         userId,
          email,
          password,
          type
        });
        setSelectedUser(null); // Clear selected user after update
        alert('User updated successfully');
      } else {
        // If selectedUser is null, it's a create operation
        await axios.post('http://server3.khaugalli.info/api/register', {
          name,
          userId,
          email,
          password,
          type
        });
        alert('User created successfully');
      }
      fetchUsers();
      setName('');
      setUserId('');
      setEmail('');
      setPassword('');
      setType('')
    } catch (error) {
      console.error(error.message);
      alert('Failed to perform the operation');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://server3.khaugalli.info/api/user/${userId}`);
      fetchUsers();
      alert('User deleted successfully');
    } catch (error) {
      console.error(error.message);
      alert('Failed to delete user');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user); // Set the selected user for update
    setName(user.name);
    setUserId(user.userId);
    setEmail(user.email);
    setPassword(user.password);
  };

  return (
    <div style={styles.container}>
      <div>
        <h2>Create User</h2>
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
            userId:
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              style={styles.input}
            />
          </label>
          <br />
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
  Type:
  <select
    value={type}
    onChange={(e) => setType(e.target.value)}
    style={styles.input}
  >
    <option value="">Select Type</option>
    <option value="Teacher">Teacher</option>
    <option value="Student">Student</option>
    <option value="Staff">Other Staff</option>
  </select>
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
          </label>
          <br />
        <button type="submit" style={styles.button}>
            {selectedUser ? 'Update' : 'Create'}
          </button>
        </form>
        
      </div>
      <hr style={{marginTop:'40px',marginBottom:'30px'}}></hr>
      <div>
        <h2>User List</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>userId</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Password</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.userId}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.type}</td>
                <td style={styles.td}>{user.password}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleDelete(user._id)}
                    style={styles.actionButton}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(user)}
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
 marginTop:'20px',
    backgroundColor: '#f50057',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width:'90px',
    height:'40px'
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
  form:{
    display:"flex",
    flexDirection:'row',
   
  }
};

export default UserComponent;