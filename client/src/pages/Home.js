import React from 'react';
import MealForm from '../components/MealForm';
import './Home.css';
import { useUser } from '../userContext/UserContext';
import { Link } from 'react-router-dom';
import logo from "../Assets/logo.png"
import Navbar from '../components/Navbar';

const Home = () => {
  const { user} = useUser();

  return (
    <>
    {user && <Navbar />}
    <div className="home-container">
    
       <div className="welcome-message">
        <img className="logo" src={logo} alt="logo" />
        <h1>Stronger Everyday!</h1>
      </div>
      {!user ? (
        <div className='box-register-login'>
          <Link className="login-register-link" to="/users/login"><button>Login</button></Link>
          <Link className="login-register-link" to="/users/register"><button>Register</button></Link>
        </div>
      )
      :
      (
        <>
        <div className='box-register-login'>
          <Link className="login-register-link" to="/myprofile"><button>My Profile</button></Link>
          <Link className="login-register-link" to="/meals"><button>Dashboard</button></Link>
        </div>
        {/* <div className="meal-form-container">

      </div> */}
        </>
      )}

    </div>
    </>
  );
};

export default Home;
