import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import './home.css';
import BoxContainer from './boxContainer';

const Home = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <div className="main-container">
        <h1 className="welcome-text">Welcome to <br /><span className='animated-text'>BruinsOnBoard</span></h1>
        <p className="share-ride-text">find other UCLA students <br />to share an Uber ride with!</p>
        <Link to={user ? '/rides' : '/signup'}>
          <button className="styled-button">Get Started</button>
        </Link>
      </div>
      <BoxContainer />
    </div>
  );
};

export default Home;
