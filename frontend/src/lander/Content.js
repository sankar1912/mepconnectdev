import React, { useEffect, useState } from "react";
import "./content.css";

const Content = () => {
  const [videoSize, setVideoSize] = useState({ width: "85%", height: "720px", left: "8%" });
  const [vSize, setVSize] = useState({ width: "85%" });
  const navcontent=[
    "Administration",
    "Admin",
    "Contact us",
    "Get Help",
    "Scroll to main"
  ]
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images1.length);
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images1.length) % images1.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setVideoSize({ width: "100%", height: "720px", left: "0%" });
      } else {
        setVideoSize({ width: "85%", height: "720px", left: "8%" ,right:"10%"
        });
      }
      if (scrollPosition > 200) {
        setVSize({ width: "85%"});
      } else {
        setVSize({ width: "0%"
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const count=120;
  const images = [
    { src: '1.jpeg', alt: 'Image 1', text: 'Arun Thirumurugan' },
    { src: '2.jpeg', alt: 'Image 2', text: 'Seyed M Buhari' },
    { src: '3.jpeg', alt: 'Image 3', text: 'Anand Swaminathan' },
    { src: '4.jpeg', alt: 'Image 4', text: 'Sujayath Ali' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Track the current image
  const totalImages = 9; // Adjust based on the number of images you have
  const images1 = [
    "we.jpg",
    "we1.jpg",
    "we.jpg",
    "we1.jpg",
    "we.jpg",
    "we1.jpg",
    "we.jpg",
    "we1.jpg",
    "we.jpg"
];

const missionText = `"To provide students with a broad and thorough education in civil engineering fundamentals, applications, and design that prepares them for the practice of civil engineering at the professional level with the confidence and skills necessary to meet the technical and social challenges of the future"`;
const visionText = `"To serve the nation by providing a quality engineering education that enables students to enter a profession that can improve the civil infrastructure and economic welfare"`;


// useEffect(() => {
//   const slideInterval = setInterval(() => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
//   }, 3000); // Slide every 3 seconds

//   return () => clearInterval(slideInterval); // Clean up the interval on component unmount
// }, [totalImages]);
  
  return (
    <div>
      
      <div style={{ backgroundColor: "black", position: "fixed", inset: 0, height: "100%", width: "100%" }}></div>
      <video id="myVideo" className="video1" autoPlay muted loop style={videoSize}>
        <source src="/123.mp4" type="video/mp4" />
        Your browser does not support this video file
      </video>
      
      <p className="hello">
        Hello Alumni!<br />
        <span style={{ position:"absolute",fontSize:"25px", top:"80px" , letterSpacing:"0px" }}>Mepco Schlenk Engineering College</span>
      </p>
      <div>
        <img className="logo" src="./mep.jpg" alt="Logo" />
      </div>
      <div className="bar">
        <div></div>
      </div>
      <div className="kol"></div>
      <div className="whit" style={vSize}></div>
      <p className="whit1">Dr.S.Arivazhagan, <br></br><span>M.E., Ph.D. - Principal</span></p>
      <img className="principal" src="./principal.jpg" alt="Principal" />
      <p className="q">
        “Dream is not that which you see while sleeping and it is something that does not let you sleep” – a famous quote by Dr. Abdul Kalam. You should always dream high to scale up new altitudes in your profession. To succeed in your mission, you must have single-minded devotion towards your goal. Wherever you serve, you should always be sincere, devoted, and dedicated. You must uphold the dignity of yourself, your institution, and the Nation by disciplined behavior showing loyalty and integrity under all circumstances to win the confidence of your employers and colleagues. Always establish and maintain your professional ethics. I wish you all good health, happiness, and prosperity.
      </p>
      {/* <div className="gridc">
      <div className="image-container">
        <img src="principal.jpg"  alt="Principal"/>
        <p style={{ color: 'black', fontSize:"15px", width:'50%', letterSpacing:'10px'}}>MISSION</p>
        <p style={{ color: 'black', fontSize:"15px", opacity:'0.8', width:'50%' }}>"To provide students with a broad and thorough education in civil engineering fundamentals, applications and design that prepares them for the practice of civil engineering at the professional level with the confidence and skills necessary to meet the technical and social challenges of the future"</p>
        <p style={{ color: 'black', fontSize:"15px", width:'50%' ,letterSpacing:'10px'}}>VISION</p>
        <p style={{ color: 'black', fontSize:"15px", opacity:'0.8', width:'50%' }}>"To serve the nation by providing a quality engineering education that enables students to enter a profession that can improve the civil infrastructure and economic welfare"</p>

      </div>
      <div className="image-container">
        <img src="principal.jpg"  alt="Principal"/>
        <p style={{ color: 'black', fontSize:"15px", width:'50%', letterSpacing:'10px'}}>MISSION</p>
        <p style={{ color: 'black', fontSize:"15px", opacity:'0.8', width:'50%' }}>"To provide students with a broad and thorough education in civil engineering fundamentals, applications and design that prepares them for the practice of civil engineering at the professional level with the confidence and skills necessary to meet the technical and social challenges of the future"</p>
        <p style={{ color: 'black', fontSize:"15px", width:'50%' ,letterSpacing:'10px'}}>VISION</p>
        <p style={{ color: 'black', fontSize:"15px", opacity:'0.8', width:'50%' }}>"To serve the nation by providing a quality engineering education that enables students to enter a profession that can improve the civil infrastructure and economic welfare"</p>

      </div><div className="image-container">
        <img src="principal.jpg"  alt="Principal"/>
        <p style={{ color: 'black', fontSize:"15px", width:'50%', letterSpacing:'10px'}}>MISSION</p>
        <p style={{ color: 'black', fontSize:"15px", opacity:'0.8', width:'50%' }}>"To provide students with a broad and thorough education in civil engineering fundamentals, applications and design that prepares them for the practice of civil engineering at the professional level with the confidence and skills necessary to meet the technical and social challenges of the future"</p>
        <p style={{ color: 'black', fontSize:"15px", width:'50%' ,letterSpacing:'10px'}}>VISION</p>
        <p style={{ color: 'black', fontSize:"15px", opacity:'0.8', width:'50%' }}>"To serve the nation by providing a quality engineering education that enables students to enter a profession that can improve the civil infrastructure and economic welfare"</p>

      </div>
    </div> 
*/}
        <p className="alu" style={{top:"235%",fontSize:"5.5rem"}}>Departments</p>

       <div className="holder">
      <div
        className="holder-inner"
        style={{
          transform: `translateX(-${currentIndex * (250 + 20)}px)`, // Adjust the translateX to match image width + gap
        }}
      >
        {images1.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`image-${index}`}
            style={{
              width: currentIndex === index ? '780px' : '250px', // Increase width for focused image
              height: currentIndex === index ? '1050px' : '250px', // Increase width for focused image
              transition: 'width 0.0s ease-in-out', // Smooth transition for resizing
            }}
          />
        ))}
            </div>
    
    {/* <div className="back1">
      Civil
      </div> */}
      


</div>


    <button onClick={prevImage} className="prev-button">
          &#10094; 
        </button>
        <button onClick={nextImage} className="next-button">
          &#10095; 
        </button>
        
        <div className="blur1">
          <strong>Mission</strong>
          <p>{missionText}</p>
          <strong>Vision</strong>
          <p>{visionText}</p>
        </div>
        
        <p className="alu">Notable Aluminies</p>
        <div className="holder1">
  <div className="holder-inner">
    {images1.map((src, index) => (
      <div className="image-container" key={index}>
        <img
          className="image"
          src={src}
          alt={`image-${index}`}
          style={{
            width: '450px',
            height: '850px',
          }}
        />
        <div className="description">
          
          <h1>Name:   </h1>
          <br/>
          <p>This is the description for image {index + 1}</p>
        </div>
      </div>
    ))}
  </div>
</div>

    <button className="login">Login</button>
    <button className="connect">Connect with </button>
    {/* <p className="not">Notable Aluminies</p>
    <div className="grid-container">
      {images.map((image, index) => (
        <div className="grid-item" key={index}>
          <img src={image.src} alt={image.alt} />
          <p>{image.text}</p>
        </div>
      ))}
    </div>
    */}
    <div style={{position:'absolute',top:'4200px', borderRadius: '5%',width: '50%', height: '400px'}}>
      <iframe
        
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: '0', left:'2%', borderRadius: '25%'}}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.8092913426376!2d77.85086187520689!3d9.525292190557217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06d3287794055d%3A0x9c7b889bf154fb86!2sMepco%20Schlenk%20Engineering%20College!5e0!3m2!1sen!2sin!4v1739758752526!5m2!1sen!2sin"
        allowFullScreen
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
    </div>
    <p className="foot"><strong>Contact</strong>Mepco Schlenk Engineering College</p>
      <div className="overlay" id="summa1"></div>
      <div className="header-bar"></div>
      <div className="background-blur" id="sum2"></div>
      <nav className="nav-links">
        {navcontent.map((item, index) => (
          <div key={index} className="nav-item" onMouseOver={() => console.log(`Hovered on ${item}`)}>
            {item}
          </div>
        ))}
      </nav>
    </div>
    
  );
};
  
export default Content;
