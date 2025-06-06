import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const departments = [
  { name: "Computer Science", mission: "To provide quality education in computing.", vision: "To be a center of excellence in AI, ML, and cybersecurity." },
  { name: "Mechanical Engineering", mission: "To innovate and enhance mechanical solutions.", vision: "To lead advancements in robotics and automation." },
  { name: "Electrical Engineering", mission: "To design and develop efficient electrical systems.", vision: "To pioneer smart grid and renewable energy solutions." }
];

const DepartmentCard = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % departments.length);
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center",top:'101vw',width:'95%' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={departments[index].name}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            width: "400px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            color: "white",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
            position: "absolute"
          }}
        >
          <h2 style={{ fontSize: "1.8rem", color: "#ffcc00", marginBottom: "10px" }}>
            {departments[index].name}
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}><strong>Mission:</strong> {departments[index].mission}</p>
          <p style={{ fontSize: "1.1rem" }}><strong>Vision:</strong> {departments[index].vision}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DepartmentCard;
