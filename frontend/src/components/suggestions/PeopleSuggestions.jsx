import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { searchresults } from '../../redux/slice/searchPeopleSlice';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  Tooltip,
  useTheme,
  Zoom,
  IconButton,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';

function PeopleSuggestions() {
  const users = useSelector(searchresults);
  const theme = useTheme();
  const navigate = useNavigate();

  const profilesPerPage = 3;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(users.length / profilesPerPage);

  const currentProfiles = users.slice(
    page * profilesPerPage,
    page * profilesPerPage + profilesPerPage
  );

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: theme.palette.background.paper,
        boxShadow: 3,
        borderRadius: 4,
        maxHeight: 740,
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      <Typography variant="h6" mb={2} fontWeight="bold">
        Suggested People
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {currentProfiles.map((user, index) => (
          <Tooltip
            key={index}
            title={user.name}
            arrow
            placement="top"
            TransitionComponent={Zoom}
          >
            <Card
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                },
              //  background: `linear-gradient(137deg, rgba(255, 255, 255, 0.8), rgba(0, 75, 237, 0.8),rgba(255, 255, 255, 0.8))`,
              }}
              onClick={() => navigate(`/publicprofile/${user._id}`)}
            >
              <CardActionArea
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  p: 2,
                }}
              >
                <CardMedia
                  component="img"
                  image={user.profileImage || '/default-avatar.png'}
                  alt={user.name}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginRight: 2,
                  }}
                />
                <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textAlign:'left'
                    }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      textAlign:'left'
                    }}
                  >
                    {user.department || 'No Department'}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Tooltip>
        ))}
      </Box>

      {/* Pagination Dots */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3,
          gap: 1,
        }}
      >
        {Array.from({ length: totalPages }).map((_, idx) => (
          <IconButton
            key={idx}
            onClick={() => setPage(idx)}
            size="small"
            sx={{ color: page === idx ? theme.palette.primary.main : '#ccc' }}
          >
            <FiberManualRecordIcon fontSize="small" />
          </IconButton>
        ))}
      </Box>
    </Box>
  );
}

export default PeopleSuggestions;
