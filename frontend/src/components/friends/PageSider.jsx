import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Fab } from '@mui/material';
import { GroupAdd, Groups2, InsertInvitationOutlined, ManageAccounts, People, PersonAdd, Search } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const drawerBleeding = 56;

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[900],
  }),
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[800],
  }),
}));

// Menu Items
const menuItems = [
  { id: 1, name: 'My Friends', icon: <People /> },
  { id: 2, name: 'Search Friends', icon: <PersonAdd /> },
  { id: 3, name: 'Invitations', icon: <InsertInvitationOutlined /> },
];

const groupItems = [
  { id: 4, name: 'My Groups', icon: <Groups2 /> },
  { id: 5, name: 'Invitations', icon: <GroupAdd /> },
  { id: 6, name: 'Manage Groups', icon: <ManageAccounts /> },
];

export default function PageSider({ setContent }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => {
    setOpen(open);
  };

  const renderList = (items) => (
    <List>
      {items.map((item) => (
        <ListItem key={item.id} disablePadding sx={{ "&:hover": { backgroundColor: "lightblue" } }}>
          <ListItemButton onClick={() => setContent(item.name)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <div>
      <Fab
        color="primary"
        aria-label="swipe-up"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
        onClick={() => toggleDrawer(true)}
      >
        <Search />
      </Fab>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
        sx={{
          '& .MuiDrawer-paper': {
            height: `calc(25% + ${drawerBleeding}px)`,
            overflow: 'visible',
            position: 'absolute',
            bottom: 0,
            borderRadius: '16px 16px 0 0',
          },
        }}
      >
        <StyledBox sx={{ position: 'absolute', top: -drawerBleeding, left: 0, right: 0 }}>
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>Search Here</Typography>
        </StyledBox>
        <StyledBox sx={{ px: 2, pb: 2, height: '100%', overflow: 'auto' }}>
          {renderList(menuItems)}
          <Divider />
          {renderList(groupItems)}
        </StyledBox>
      </SwipeableDrawer>
    </div>
  );
}
