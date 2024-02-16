import React, { useState } from "react";
import axios from "axios";

const UserCreate = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handlePasswordGenerate = () => {
        const characters =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        let password = "";
        for (let i = 0; i < 10; i++) {
            const char = characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
            password += char;
        }
        setUserData({ ...userData, password });
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/usercreate", userData);
            console.log("User created:", response.data.message); // Handle response accordingly
            // Clear form fields after successful submission
            setUserData({
                name: "",
                email: "",
                password: "",
                role: "",
            });
            window.location.reload();
        } catch (error) {
            console.error(
                "Error creating user:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="container  col-4">
            <h1 className="my-4">Create User</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handlePasswordGenerate}
                        >
                            Generate
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleTogglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                        Role
                    </label>
                    <select
                        className="form-select"
                        id="role"
                        name="role"
                        value={userData.role}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="m&e_manager">M&E Manager</option>
                        <option value="project_manager">Project Manager</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Create User
                </button>
            </form>
        </div>
    );
};

export default UserCreate;
