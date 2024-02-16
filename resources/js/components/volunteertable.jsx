import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import CreateVolunteer from "./createvolunteer";

// Edit Form Modal Component
const EditFormModal = ({ user, onUpdate }) => {
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `api/volunteer/${editedUser.id}`,
                editedUser
            );
            onUpdate(editedUser.id, editedUser);
            console.log("User updated:", response.data); // Handle response accordingly
            window.location.reload();
        } catch (error) {
            console.error(
                "Error updating user:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div
            className="modal fade"
            id={`editModal-${user.id}`}
            tabIndex="-1"
            aria-labelledby={`editModalLabel-${user.id}`}
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5
                            className="modal-title"
                            id={`editModalLabel-${user.id}`}
                        >
                            Edit User
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label
                                    htmlFor={`name-${user.id}`}
                                    className="form-label"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`name-${user.id}`}
                                    name="name"
                                    value={editedUser.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor={`email-${user.id}`}
                                    className="form-label"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id={`email-${user.id}`}
                                    name="email"
                                    value={editedUser.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor={`role-${user.id}`}
                                    className="form-label"
                                >
                                    Password
                                </label>
                                <input
                                    className="form-control"
                                    id={`role-${user.id}`}
                                    name="password"
                                    value={editedUser.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor={`role-${user.id}`}
                                    className="form-label"
                                >
                                    Township
                                </label>
                                <select
                                    className="form-select"
                                    id={`township-${user.id}`}
                                    name="township"
                                    value={editedUser.township}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Township</option>
                                    <option value="CAT">CAT</option>
                                    <option value="CMT">CMT</option>
                                    <option value="PTG">PTG</option>
                                    <option value="PGT">PGT</option>
                                    <option value="AMT">AMT</option>
                                    <option value="MHA">MHA</option>
                                    <option value="AMP">AMP</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// User Table Component
const UserTable = ({ accounts, auth }) => {
    const [users, setUsers] = useState(accounts);

    const handleUpdateUser = (userId, updatedUser) => {
        const updatedUsers = users.map((user) => {
            if (user.id === userId) {
                return updatedUser;
            }
            return user;
        });
        setUsers(updatedUsers);
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this volunteer?")) {
            try {
                const response = await axios.delete(`api/volunteer/${userId}`);
                setUsers(users.filter((user) => user.id !== userId));
                console.log("User deleted:", response.data); // Handle response accordingly
            } catch (error) {
                console.error(
                    "Error deleting user:",
                    error.response?.data || error.message
                );
            }
        }
    };

    return (
        <div className="d-flex">
            <div className="d-flex col-8">
                <table
                    className="table  table-striped mx-auto w-75"
                    id="users_list"
                >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            {/* <th>Password</th> */}
                            <th>Township</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.township}</td>
                                {/* <td>{user.password}</td> */}
                                <td>
                                    <button
                                        className={
                                            auth.role == "admin" ||
                                            auth.role == "m&e_manager"
                                                ? "btn btn-primary btn-sm"
                                                : "btn btn-primary d-none btn-sm"
                                        }
                                        data-bs-toggle="modal"
                                        data-bs-target={`#editModal-${user.id}`}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={
                                            auth.role == "admin" ||
                                            auth.role == "m&e_manager"
                                                ? "btn btn-danger btn-sm"
                                                : "btn btn-danger d-none btn-sm"
                                        }
                                        onClick={() =>
                                            handleDeleteUser(user.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.map((user) => (
                    <EditFormModal
                        key={user.id}
                        user={user}
                        onUpdate={handleUpdateUser}
                    />
                ))}
            </div>
            {auth.role == "admin" || auth.role == "m&e_manager" ? (
                <CreateVolunteer />
            ) : (
                ""
            )}
        </div>
    );
};

// Render UserTable component
ReactDOM.render(
    <UserTable accounts={window.myData} auth={window.authUser} />,
    document.getElementById("volunteertable")
);
