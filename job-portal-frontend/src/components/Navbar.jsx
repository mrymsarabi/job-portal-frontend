import React, { useState, useEffect } from 'react';

//Modules andLibraries:
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

// APIs:
import { checkLoginStatus } from '/src/apis/checkLoginStatus';

// Components:
import Icon from "/src/icons/Icon";

// CSS:
import styles from "/src/styles/Navbar.module.css";

const Navbar = () => {
    const navigate = useNavigate();

    // States:
    const [loggedIn, setLoggedIn] = useState(false);
    const [show, setShow] = useState(false);

    // Functions:
    useEffect(() => {
        loginCheck();
    }, []);

    // Checking if the user is logged in:
    const loginCheck = async () => {
        const response = await checkLoginStatus();
        if (response.status === "success") {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        };
    };

    // Handle showing more profile related items:
    const showHandler = () => {
        setShow(prev => !prev);
    };

    //Handle logging out of the account:
    const logoutHandler = () => {
        Cookies.remove("token");
        setShow(false);
        loginCheck();
        navigate('/home')
    };

    return (
        <div className={styles.navContainer}>
            <nav className={styles.navbar}>
                <ul className={styles.navItems}>
                    {/* First part of the navbar */}
                    <div className={styles.firstPart}>
                        <li className={styles.home}>
                            <Link to="/home">Home</Link>
                        </li>
                        <li className={styles.add}>
                            <Link to="/add-job">Add a Position</Link>
                        </li>
                        <li className={styles.about_us}>
                            <Link to="/about-us">About Us</Link>
                        </li>
                    </div>
                    
                    {/* Profile/Login container */}
                    <div className={styles.profileContainer}>
                        {loggedIn ? (
                            <li className={styles.profile} onClick={showHandler}>
                                <Icon icon="account-circle-1" color="#ffffff" width="24px" height="24px" />
                            </li>
                        ) : (
                            <li className={styles.login}>
                                <Link to="/signup">Sign Up</Link>/<Link to="/login">Login</Link>
                            </li>
                        )}
                        {show && (
                            <ul className={styles.dropDown}>
                                <li>
                                    <Link to="/profile">My Profile</Link>    
                                </li>
                                <li>
                                    <Link to="/jobs-uploaded">My Jobs</Link>
                                </li>
                                <li>
                                    <Link to="/my-messages">Messages</Link>
                                </li>
                                <li>
                                    <Link to="/my-company">Company</Link>
                                </li>
                                <li onClick={logoutHandler}>Logout</li>
                            </ul>
                        )}
                    </div>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
