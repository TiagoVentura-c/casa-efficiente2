import { Box, Stack, Typography, Badge } from '@mui/material';

const shapeStyles = { bgcolor: '#A92680', width: 10, height: 10 };
const shapeCircleStyles = { borderRadius: '50%' };

const Dot = () => (
  <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
);

export default Dot