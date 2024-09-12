import React, { useState } from 'react';
import './WelcomeScreen.css'; // Import your custom CSS
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for visibility toggle
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const hardcodedCredentials = {
    login: {
        username: 'testuser',
        password: 'testpassword'
    },
    signup: {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'newpassword'
    }
};

const WelcomeScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const handleFormSwitch = () => {
        setIsLogin(!isLogin);
        setError(''); // Clear any error message on form switch
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if (username === hardcodedCredentials.login.username && password === hardcodedCredentials.login.password) {
            // Redirect to homepage after successful login
            console.log('Login successful!');
            navigate('/homepage'); // Use navigate to go to the HomePage
        } else {
            setError('Invalid username or password');
        }
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        if (username === hardcodedCredentials.signup.username && email === hardcodedCredentials.signup.email && password === hardcodedCredentials.signup.password) {
            // Handle successful sign-up
            console.log('Sign-up successful!');
        } else {
            setError('Error during sign-up');
        }
    };

    return (
        <div className="welcome-screen">
            <div className="welcome-content">
                <h1 className="welcome-title">Welcome to Protest Quest!</h1>
                <p className="game-description">
                    Dive into a thrilling quest that explores the dynamics of protests. Choose your role, make impactful decisions, and navigate through intense scenarios.
                </p>
                <div className="auth-container">
                    {isLogin ? (
                        <div className="auth-form">
                            <h2>Login</h2>
                            <form onSubmit={handleLogin}>
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                <label htmlFor="password">Password:</label>
                                <div className="password-container">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <button type="submit">Login</button>
                                {error && <p className="error-message">{error}</p>}
                            </form>
                            <p>Don't have an account? <button onClick={handleFormSwitch}>Sign Up</button></p>
                        </div>
                    ) : (
                        <div className="auth-form">
                            <h2>Sign Up</h2>
                            <form onSubmit={handleSignUp}>
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <button type="submit">Sign Up</button>
                                {error && <p className="error-message">{error}</p>}
                            </form>
                            <p>Already have an account? <button onClick={handleFormSwitch}>Login</button></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
