import React, { useState } from "react";
import axios from "axios";

const PatientCreate = ({ volunteers, regimens }) => {
    const [formData, setFormData] = useState({
        name: "",
        registration_year: "",
        dob: "",
        age: "",
        drtb_code: "",
        password: "",
        township: "",
        volunteer_id: "",
        patient_code: "",
        address: "",
        treatment_start_date: "",
        regimen_id: "",
    });

    const townships = ["CAT", "CMT", "PTG", "PGT", "AMT", "MHA", "AMP"];
    const registrationYears = ["2023", "2024", "2025", "2026"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedFormData = { ...formData };

        if (name === "dob") {
            const age = calculateAge(value);
            updatedFormData = { ...updatedFormData, [name]: value, age };
        } else {
            updatedFormData = { ...updatedFormData, [name]: value };
        }
        if (name !== "password") {
            updatedFormData = {
                ...updatedFormData,
                password: formData.password || generatePassword(),
            };
        }

        setFormData(updatedFormData);
    };

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    };

    const generatePassword = () => {
        return Math.floor(100000 + Math.random() * 900000); // Generate 6-digit random number
    };

    const generatePatientCode = () => {
        const { drtb_code, township, registration_year } = formData;
        return `${drtb_code}/${township}/${registration_year}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/createpatient", formData);
            console.log("Patient created:", response.data); // Handle response accordingly
            window.location.reload();
        } catch (error) {
            console.error(
                "Error creating patient:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="container">
            <h1>Create Patient</h1>
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
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="registration_year" className="form-label">
                        Registration Year
                    </label>
                    <select
                        className="form-select"
                        id="registration_year"
                        name="registration_year"
                        value={formData.registration_year}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Year</option>
                        {registrationYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="dob" className="form-label">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                        Age
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="age"
                        name="age"
                        value={formData.age}
                        readOnly
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="drtb_code" className="form-label">
                        DRTB Code (Unique Key)
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="drtb_code"
                        name="drtb_code"
                        value={formData.drtb_code}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password || generatePassword()}
                        readOnly
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="township" className="form-label">
                        Township
                    </label>
                    <select
                        className="form-select"
                        id="township"
                        name="township"
                        value={formData.township}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Township</option>
                        {townships.map((township) => (
                            <option key={township} value={township}>
                                {township}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="volunteer_id" className="form-label">
                        Referred by Volunteer
                    </label>
                    {/* Dropdown for Volunteer */}
                    <select
                        className="form-select"
                        id="volunteer_id"
                        name="volunteer_id"
                        value={formData.volunteer_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Volunteer</option>
                        {volunteers.map((volunteer) => (
                            <option key={volunteer.id} value={volunteer.id}>
                                {volunteer.name}
                            </option>
                        ))}
                        {/* Options for Volunteers */}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="patient_code" className="form-label">
                        Patient Code
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="patient_code"
                        name="patient_code"
                        value={generatePatientCode()}
                        readOnly
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        Address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="treatment_start_date"
                        className="form-label"
                    >
                        Treatment Start Date
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="treatment_start_date"
                        name="treatment_start_date"
                        value={formData.treatment_start_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="regimen_id" className="form-label">
                        Treatment Regimen
                    </label>
                    <select
                        className="form-select"
                        id="regimen_id"
                        name="regimen_id"
                        value={formData.regimen_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Regimen</option>
                        {regimens.map((regimen) => (
                            <option key={regimen.id} value={regimen.id}>
                                {regimen.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
};

export default PatientCreate;
