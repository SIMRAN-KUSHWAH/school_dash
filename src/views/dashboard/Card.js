import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CustomCard = (props) => {
  const randomColor = getRandomLightColor();

  const cardStyle = {
    background: randomColor,
    borderRadius: '10px',
    height:150,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    color: 'red',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px',
    textDecoration: 'underline',
    transition: 'color 0.2s ease-in-out',
    '&:hover': {
      color: 'darkred',
    },
  };

  return (
    <Card style={cardStyle}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {props.description}
        </Typography>
        <Typography>
          <button onClick={() => window.location.href = props.link} style={buttonStyle}>
            view
          </button>
        </Typography>
      </CardContent>
    </Card>
  );
};

const lightColors = ['#F0FFF0', '#FDF5E6', '#F5FFFA', 'lavenderblush', '#F0F8FF'];

const getRandomLightColor = () => {
  const randomIndex = Math.floor(Math.random() * lightColors.length);
  return lightColors[randomIndex];
};

export default CustomCard;
