import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../init-firebase";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { email, password } = user;
    const [msg, SetMSG] = useState(<div></div>);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is already logged in
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
            setIsLoggedIn(true);
            SetMSG(<h2>Welcome back!</h2>);
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userRef = collection(db, "User-data");

        const res = await getDocs(userRef);
        const userdata = res.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
        }));

        var userFound = false;

        userdata.forEach((up) => {
            if (email === up.data.user["emailId"] && password === up.data.user["password"]) {
                SetMSG(<h2>Welcome, {up.data.user["firstName"]}</h2>);
                localStorage.setItem("authToken", "userToken"); // Store token in localStorage
                setIsLoggedIn(true);
                userFound = true;
            }
        });

        if (!userFound) {
            alert("Credentials do not match");
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem("authToken"); // Clear auth token
        setIsLoggedIn(false);
        SetMSG(<div></div>); // Clear welcome message
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="Login">
            {isLoggedIn && (
                <button className="sign-out-button" onClick={handleSignOut}>
                    Sign Out
                </button>
            )}

            <Link to='/signup'>
                <button className="sign-up">Sign up</button>
            </Link>
            <div className="login-details">
                {!isLoggedIn && (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Your email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Enter Your Email ID"
                            required
                        />

                        <label htmlFor="password">Your Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Enter Your Password"
                            required
                        />

                        <br />
                        <button className="login-button" type="submit">Login</button>
                    </form>
                )}
            </div>

            <div className="display-msg">
                {msg}
            </div>
        </div>
    );
}

export default Login;
