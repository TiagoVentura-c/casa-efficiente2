import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const TabStyle ={color: '#5F5F5F', textTransform: 'none', fontWeight: '550', fontSize: '16px', }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}  sx={{ color: 'red' }} >
            <Tab label="Summary" value="1"  sx={TabStyle}  />
            <Tab label="Usage History" value="2" sx={TabStyle}/>
            <Tab label="Profile" value="3" sx={TabStyle}/>
          </TabList>
        </Box>
        <TabPanel value="2">Usage History</TabPanel>
        <TabPanel value="3">Profile</TabPanel>
      </TabContext>
    </Box>
  );
}