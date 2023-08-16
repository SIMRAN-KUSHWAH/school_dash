import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: '30%',
    margin: '10px',
    backgroundColor: getRandomColor(),
    borderRadius: '5px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  cardContent: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  cardOrder: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '5px',
  },
  cardDate: {
    fontSize: '14px',
    color: '#888',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  button: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#00BFFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '250px',
    margin: '10px',
  },
  button1: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#f50057',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '250px',
    margin: '10px',
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
  },
  updateButton: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '200px',
  },
};

function getRandomColor() {
  const lightColors = ['#F0FFF0', '#FDF5E6', '#F5FFFA', 'lavenderblush', '#F0F8FF'];
  const randomIndex = Math.floor(Math.random() * lightColors.length);
  return lightColors[randomIndex];
}

const NoticeCard = ({ notice, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedNotice, setUpdatedNotice] = useState({
    title: notice.title,
    content: notice.content,
    order: notice.order,
    date: notice.date,
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    setUpdatedNotice({ ...updatedNotice, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://server3.khaugalli.info/api/notice/${notice._id}`, updatedNotice);
      onUpdate();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    onDelete(notice._id);
  };

  return (
    <div style={{ ...styles.card, backgroundColor: getRandomColor() }}>
      <h3 style={styles.cardTitle}>{notice.title}</h3>
      <p style={styles.cardContent}>{notice.content}</p>
      <p style={styles.cardOrder}>Order By: {notice.order}</p>
      <p style={styles.cardDate}>{notice.date}</p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleOpenModal}>
          Update
        </button>
        <button style={styles.button1} onClick={handleDelete}>
          Delete
        </button>
      </div>

      {isModalOpen && (
        <div style={styles.modalContainer}>
          <h2 style={styles.modalTitle}>Update Notice</h2>
          <input
            type="text"
            name="title"
            value={updatedNotice.title}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Title"
          />
          <textarea
            name="content"
            value={updatedNotice.content}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Content"
            rows={4}
          />
          <input
            type="text"
            name="order"
            value={updatedNotice.order}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Order"
          />
          <input
            type="date"
            name="date"
            value={updatedNotice.date}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Date"
          />
          <button style={styles.updateButton} onClick={handleUpdate}>
            Update Notice
          </button>
          <button style={styles.button1} onClick={handleCloseModal}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const NoticeList = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://server3.khaugalli.info/api/notice/get');
      setNotices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNotice = async (noticeId) => {
    try {
      await axios.delete(`http://server3.khaugalli.info/api/notice/${noticeId}`);
      setNotices((prevNotices) => prevNotices.filter((notice) => notice._id !== noticeId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateNotice = () => {
    fetchNotices();
  };

  return (
    <div style={styles.cardContainer}>
      {notices.map((notice) => (
        <NoticeCard
          key={notice._id}
          notice={notice}
          onDelete={handleDeleteNotice}
          onUpdate={handleUpdateNotice}
        />
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div style={styles.app}>
      <h1 style={styles.title}>Notice Board</h1>
      <NoticeList />
    </div>
  );
};

export default App;
