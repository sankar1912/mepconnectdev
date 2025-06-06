import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Grid, MobileStepper, Button } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const departments = [
    { 
        image: "/Assets/img/departments/cse.webp", 
        department: "Civil Engineering", 
        vision: "To serve the nation by providing a quality engineering education that enables students to enter a profession that can improve the civil infrastructure and economic welfare", 
        mission: "To provide students with a broad and thorough education in civil engineering fundamentals, applications and design that prepares them for the practice of civil engineering at the professional level with the confidence and skills necessary to meet the technical and social challenges of the future" 
    },
    { 
        image: "/Assets/img/departments/cse.webp", 
        department: "Electrical and Electronics Engineering", 
        vision: "To Render Services to Meet the Growing Global Challenges of Engineering Industries by Educating Students to become Exemplary Professional Electrical and Electronics Engineers of High Ethics", 
        mission: "To Provide the Students a Rigorous Learning Experience in Understanding Basics of Electrical & Electronics Engineering Built on the Foundation of Science, Mathematics, Computing and Technology by Emphasizing active Learning with Strongly Supported Laboratory Component and Prepare them for Professional Careers" 
    },
    { 
        image: "/Assets/img/departments/cse.webp", 
        department: "Computer Science and Engineering", 
        vision: "To become the centre of excellence in computer education and research and to create the platform for industrial consultancy", 
        mission: "To produce globally competent and quality computer professionals by educating computer concepts and techniques" 
    },
    { 
        image: "/Assets/img/departments/cse.webp", 
        department: "Mechanical Engineering", 
        vision: "To render services to the global needs of engineering industries by educating students to become professional mechanical engineers of excellent calibre", 
        mission: "To produce mechanical engineering technocrats with a perfect knowledge of intellectual and hands on experiences and to inculcate the spirit of moral values and ethics to serve the society" 
    },
    { 
        image: "/Assets/img/departments/cse.webp", 
        department: "Information Technology", 
        vision: "To emerge as Realm of Preeminence that empowers the students to reach the zenith, as assertive IT professionals by offering quality technical education and research environment to best serve the nation", 
        mission: "To produce globally competent and quality computer professionals by educating computer concepts and techniques" 
    },
];

const DepartmentCard = ({ image, department, vision, mission }) => {
    return (
        <Card
            sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                m: 2,
                width: "100%",
                borderRadius: 3,
                background: "linear-gradient(90deg, rgba(0, 162, 255, 0.6),rgba(255,255,255,0.7))",
                color: "black",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            }}
        >
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                    <CardContent sx={{ textAlign: 'justify' }}>
                        <Typography variant="h6" fontWeight="bold">{department}</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}><strong>Vision:</strong> {vision}</Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}><strong>Mission:</strong> {mission}</Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={4}>
                    <img src={image} height={250} width={250} alt={department} style={{ borderRadius: 10 }} />
                </Grid>
            </Grid>
        </Card>
    );
};

const SelectActionCard = () => {
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = departments.length;

    const handleNext = () => {
        setActiveStep((prevStep) => (prevStep + 1) % maxSteps);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => (prevStep - 1 + maxSteps) % maxSteps);
    };

    return (
        <Box sx={{ width: "90%", p: 3, display: "flex", flexDirection: "column", alignItems: "center",justifyItems:'center' }}>
            <DepartmentCard {...departments[activeStep]} />
            <MobileStepper
                variant="dots"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft /> Back
                    </Button>
                }
            />
        </Box>
    );
};

export default SelectActionCard;
