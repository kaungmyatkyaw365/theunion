import React, { useState } from "react";
import axios from "axios";

const VotPatientCreateForm = ({ volunteers, patient }) => {
    const [formData, setFormData] = useState({
        type: "",
        volunteer_id: "",
        patient_id: patient.id,
        start_at: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Frontend validation
        if (
            formData.start_at < patient.treatment_start_date ||
            formData.start_at > new Date().toISOString().slice(0, 10)
        ) {
            setErrors({
                start_at:
                    "VOT Start Date must be not earlier than Treatment Start Date and not greater than today.",
            });
            return;
        }
        try {
            const response = await axios.post(
                "/api/createvotpatient",
                formData
            );
            console.log("VotPatient created:", response.data); // Handle response accordingly
            window.location.reload();
        } catch (error) {
            console.error(
                "Error creating VotPatient:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="container">
            <h1>Create VotPatient</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                        Type
                    </label>
                    <select
                        className="form-select"
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="pure">Pure</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="volunteer_id" className="form-label">
                        Volunteer
                    </label>
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
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="start_at" className="form-label">
                        Start At
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="start_at"
                        name="start_at"
                        value={formData.start_at}
                        onChange={handleChange}
                        required
                    />
                    {errors.start_at && (
                        <div className="text-danger">{errors.start_at}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
};

export default VotPatientCreateForm;
