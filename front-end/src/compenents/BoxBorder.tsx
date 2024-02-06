import { Box, BoxProps } from '@mui/material';

interface CustomBoxProps extends BoxProps {
  
}

const BoxBorder: React.FC<CustomBoxProps> = ({ children, ...props }) => {
  return <Box sx={{borderColor: '#DDDDDD', borderWidth: 2, borderStyle: 'double', borderRadius: 4,}} {...props}>{children}</Box>;
};

export default BoxBorder