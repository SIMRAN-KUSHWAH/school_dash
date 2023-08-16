import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const DoubtBox = () => {
  const [doubt, setDoubt] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 8;
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://server3.khaugalli.info/api/messages');
      setMessages(response.data.reverse());
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      alert('Failed to fetch messages. Please try again.');
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://server3.khaugalli.info/api/messages/${messageId}`);
      fetchData();
      alert('Deleted Successfully.');
    } catch (error) {
      console.error('Failed to delete message:', error);
      alert('Failed to delete message. Please try again.');
    }
  };

  const getCurrentTime = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>Doubt Box</h1>
      </div>

      <table style={styles.table}>
        <thead style={{ height:'30px', backgroundColor: '#f50057', color: 'white' }}>
          <tr>
            <th>Message</th>
            <th>User Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentMessages.map((item) => (
            <tr key={item.id} className={item.isUser ? styles.userMessage : styles.botMessage}>
              <td style={styles.cell}>{item.text}</td>
              <td style={styles.cell}>{item.isUser}</td>
              <td style={styles.cell}>{new Date(item.date).toLocaleDateString()}</td>
              <td style={styles.cell}>{item.time}</td>
              <td style={styles.cell}>
                <button className={styles.deleteButton} onClick={() => deleteMessage(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.paginationControls}>
        {currentPage > 1 && (
          <button1
            className={styles.paginationButton}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button1>
        )}
        <span style={{ color: 'red', padding: '10px' }}>Page {currentPage}</span>
        {/* {indexOfLastMessage < messages.length && ( */}
          <button1
            className={styles.paginationButton}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button1>
        {/* )} */}
      </div>
    </div>
  );
};
const styles = {
  container: {
    marginTop: '80px',
    padding: '5px',
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  headerText: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #ccc',
  },
  cell: {
    padding: '10px',
    textAlign: 'center',
  },
  userMessage: {
    backgroundColor: '#ffcc5c',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  botMessage: {
    backgroundColor: '#405d27',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  inputArea: {
    display: 'flex',
    alignItems: 'center',
    borderTop: '1px solid #ccc',
    padding: '8px',
  },
  input: {
    flex: '1',
    borderWidth: '1px',
    borderColor: '#ccc',
    borderRadius: '8px',
    padding: '8px',
    marginRight: '8px',
  },
  sendButton: {
    backgroundColor: '#007BFF',
    padding: '8px 16px',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
  },
  sendButtonText: {
    color: '#fff',
  }
};

export default DoubtBox;
