import React, { useState } from "react";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can perform your signup logic using the username, email, and password state values
        // For example, you can send a POST request to your backend API to create a new user account
        console.log(
            `Signed up with username: ${username}, email: ${email}, and password: ${password}`
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </label>
            <br />
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
