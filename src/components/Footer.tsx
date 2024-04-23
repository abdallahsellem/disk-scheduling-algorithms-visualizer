import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <Box sx={{ width: '100vw', position: 'fixed', bottom: 0, display: 'flex', justifyContent: 'center', p: 2, backgroundColor: 'background.paper' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © Made by Abdallah Selim , AbdelFatah Hamdi
      </Typography>
    </Box>
  );
};

export default Footer;
