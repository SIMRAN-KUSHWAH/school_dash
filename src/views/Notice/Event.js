import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root'); // Set the root element for accessibility

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/event/getAll'); // Use your API URL here
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Other event handling functions...

  const getRandomColor = () => {
    const colors =  ['#F0FFF0', '#FDF5E6', '#F5FFFA', 'lavenderblush', '#F0F8FF', '#FFA07A'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div className="container" style={styles.container}>
        <h2 className="headerText" style={styles.headerText}>UPCOMING EVENTS</h2>
     
      {events.map((event) => (
        <div key={event._id} className="card" style={{ ...styles.card, backgroundColor: getRandomColor() }}>
          <div className="cardContent">
            <h3 className="cardTitle" style={styles.cardTitle}>{event.title}</h3>
            <p className="description" style={styles.description}>Description: {event.description}</p>
            <p className="description" style={styles.description}>Location: {event.location}</p>
            <p className="description" style={styles.description}>Date: {event.date}</p>
          </div>
        </div>
      ))}
      {/* Add modal and create button here */}
      {isModalVisible && (
        <Modal isOpen={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
          <div className="modalContainer" style={styles.modalContainer}>
            {/* Modal content */}
          </div>
        </Modal>
      )}
      {isDeleteModalVisible && (
        <Modal isOpen={isDeleteModalVisible} onRequestClose={() => setIsDeleteModalVisible(false)}>
          <div className="modalContainer" style={styles.modalContainer}>
            {/* Modal content */}
          </div>
        </Modal>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
 
    fontFamily: 'Arial, sans-serif',
    paddingTop: '80px',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: '15px',
    marginBottom: '20px',
  },
  headerText: {
 
    fontSize: '24px',
    fontWeight: 'bold',
paddingBottom:'20px'
  },
  card: {
    // border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '15px',
    backgroundColor: 'white',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',

  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  description: {
    marginTop: '10px',
    color: '#666',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '400px',
    margin: '0 auto',
  },
};

export default EventList;
