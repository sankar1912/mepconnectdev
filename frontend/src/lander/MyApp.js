import './App.css';
import Content from './Content'
import Navbar from './Navbar';
import Footer from './Footer';
function MyApp() {
  return (
    <div>
      <Content></Content>
      
      <div className='Footer'>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default MyApp;
