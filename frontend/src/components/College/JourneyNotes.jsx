import React, { useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion, useInView } from 'framer-motion';

const posts = [
  {
    img: 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&fit=crop&w=600&q=80',
    title: 'Nail your dream remote role with these tips from an alumni',
  },
  {
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    title: "The 'great reshuffle': how to put your best foot forward",
  },
  {
    img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80',
    title: 'A look into early talent programs at Campus',
  },
];

export default function JourneyNotes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 2, md: 8 },
        py: 10,
        background: '#f5f9ff',
        minHeight: '100vh',
      }}
    >
      {/* Left Title Section */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{ flex: 1 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: '#0d47a1',
            mb: 3,
            lineHeight: 1.2,
          }}
        >
          Journey<br />Notes
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#6a1b9a',
            color: '#fff',
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 'bold',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: '#4a148c',
            },
          }}
        >
          View All Notes
        </Button>
      </motion.div>

      {/* Right Post Cards */}
      <Box
        sx={{
          flex: 2,
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
          },
          pl: { md: 8 },
          mt: { xs: 6, md: 0 },
        }}
      >
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            style={{
              position: 'relative',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              backgroundColor: '#fff',
            }}
          >
            <img
              src={post.img}
              alt="alumni-post"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                p: 2,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
              }}
            >
              <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
                {post.title}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
