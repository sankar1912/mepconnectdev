import React from "react";
import { Typography } from "@mui/material";

const DisplayList = ({ selectedTab, friendlist }) => {
  const getContent = () => {
    switch (selectedTab) {
      case "Home":
        return <Typography variant="h6">Welcome to the Home Page</Typography>;
      case "Friends":
        return (
          <div>
            <Typography variant="h6">Friends List</Typography>
            {friendlist.map((friend, index) => (
              <p key={index}>{friend.name}</p>
            ))}
          </div>
        );
      case "Invitations":
        return (
          <Typography variant="h6">Here are your Invitations</Typography>
        );
      case "Groups":
        return <Typography variant="h6">Your Groups</Typography>;
      case "Manage Groups":
        return <Typography variant="h6">Manage your Groups here</Typography>;
      default:
        return <Typography variant="h6">Select a Tab to View Content</Typography>;
    }
  };

  return <div style={{ padding: "20px" }}>{getContent()}</div>;
};

export default DisplayList;
