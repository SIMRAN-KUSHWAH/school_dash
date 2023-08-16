import React from 'react';
import { Box, styled, Stack } from '@mui/material';
import PropTypes from 'prop-types';

import Img from "../../../assets/logout.png";
import Img2 from "../../../assets/images/img/Sperkid.png"
const Header = (props) => {
  const HeaderContainer = styled('div')({
    width: '100%',
    position: 'fixed',
    top: 0,
    paddingRight:"300px",
    backgroundColor: '#fff', // You can set the background color here
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // You can add shadow styles
    zIndex: 1000,
  });

  return (
    <HeaderContainer>
      <Box p={2}>
        <Stack  direction="row" alignItems="center" justifyContent="space-between">
          {/* <img src={Img2} alt="Logo" style={{ height: 40, width: 40 }} /> */}
          <h3>Super Kids Public School / Dashboard</h3>
          <img src={Img} alt="Logo" style={{ height: 40, width: 40 }} />
        </Stack>
      </Box>
    </HeaderContainer>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
