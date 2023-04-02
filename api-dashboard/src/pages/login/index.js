import React, { useState } from "react";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Logged in with username: ${username} and password: ${password}`);
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
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </label>
            <br />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
