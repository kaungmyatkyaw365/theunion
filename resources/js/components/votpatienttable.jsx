import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import VotPatientCreateForm from "./createvot";
import VotPatientEdit from "./editvot";

const VotatientTable = ({ votpatients, auth, patients, volunteers }) => {
    const [editVotpatient, setEditVotpatient] = useState(null);
    const [deleteVotpatient, setDeleteVotpatient] = useState(null);

    const handleEdit = (votpatient) => {
        setEditVotpatient(votpatient);
    };

    const handleDelete = (votpatient) => {
        setDeleteVotpatient(votpatient);
    };

    const handleCloseModal = () => {
        setEditVotpatient(null);
        setDeleteVotpatient(null);
    };

    const handleEditSubmit = async (editedVotpatient) => {
        try {
            const response = await axios.put(
                `/api/patients/${votpatient.id}`,
                editedVotpatient
            );
            console.log("Votpatient updated:", response.data);
            // Update the patient list or handle accordingly
            // You may need to refresh patient data after edit
            handleCloseModal();
        } catch (error) {
            console.error("Error updating patient:", error.message);
        }
    };

    const handleDeleteSubmit = async () => {
        try {
            const response = await axios.delete(
                `/api/patients/${votpatient.id}`
            );
            console.log("Votpatient deleted:", response.data);
            // Update the patient list or handle accordingly
            // You may need to refresh patient data after delete
            handleCloseModal();
        } catch (error) {
            console.error("Error deleting patient:", error.message);
        }
    };

    return (
        <div className="d-flex container my-2 mx-auto">
            <div>
                <h2>Votpatient Table</h2>
                <table className="table w-100 table-striped">
                    {/* Table header */}
                    <thead>
                        {/* Table row */}
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Registration Year</th>
                            <th>Date of Birth</th>
                            <th>Age</th>
                            <th>DRTB Code</th>
                            <th>Township</th>
                            <th>Volunteer</th>
                            <th>Patient Code</th>
                            <th>Address</th>
                            <th>Treatment Start Date</th>
                            <th>VOT Start Date</th>
                            <th>Actions</th> {/* New column for actions */}
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                        {/* Loop through patients and render table rows */}
                        {votpatients.map((votpatient) => (
                            <tr key={votpatient.id}>
                                <td>
                                    {
                                        patients.find(
                                            (patient) =>
                                                patient.id ===
                                                votpatient.patient_id
                                        )?.name
                                    }
                                </td>
                                <td>{votpatient.type}</td>

                                <td>
                                    {
                                        patients.find(
                                            (patient) =>
                                                patient.id ===
                                                votpatient.patient_id
                                        )?.registration_year
                                    }
                                </td>
                                <td>
                                    {
                                        patients.find(
                                            (patient) =>
                                                patient.id ===
                                                votpatient.patient_id
                                        )?.dob
                                    }
                                </td>
                                <td>
                                    {
                                        patients.find(
                                            (patient) =>
                                                patient.id ===
                                                votpatient.patient_id
                                        )?.age
                                    }
                                </td>
                                <td>
                                    {
                                        patients.find(
                                            (patient) =>
                                                patient.id ===
                                                votpatient.patient_id
                                        )?.drtb_code
                                    }
                                </td>
                                <td>
                                    {
                                        patients.find(
                                            (patient) =>
                                                patient.id ===
                                                votpatient.patient_id
                                        )?.township
                                    }
                                </td>
                                <td>
                                    {/* Find volunteer name */}
                                    {
                                        volunteers.find(
                                            (volunteer) =>
                                                volunteer.id ===
                                                votpatient.volunteer_id
                                        )?.name
                                    }
                                </td>
                                <td>
                                    {
                                        patients.find(
                                            (patient) =>
                                                patient.id ===
                                                votpatient.patient_id
                                        )?.patient_code
                                    }
                                </td>
                                <td>
                                    {
                                        patients.find(
                                            (patient) =>
                                                patient.id ===
                                                votpatient.patient_id
                                        )?.address
                                    }
                                </td>
                                <td>
                                    {
                                        patients.find(
                                            (patient) =>
                                                patient.id ===
                                                votpatient.patient_id
                                        )?.treatment_start_date
                                    }
                                </td>
                                <td>{votpatient.start_at.substring(0, 10)}</td>

                                <td>
                                    {/* Edit button */}
                                    <button
                                        className={
                                            auth.role == "admin" ||
                                            auth.role == "m&e_manager"
                                                ? "btn btn-primary btn-sm"
                                                : "btn btn-primary d-none btn-sm"
                                        }
                                        onClick={() => handleEdit(votpatient)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    {/* Delete button */}
                                    <button
                                        className={
                                            auth.role == "admin" ||
                                            auth.role == "m&e_manager"
                                                ? "btn btn-danger btn-sm"
                                                : "btn btn-danger d-none btn-sm"
                                        }
                                        onClick={() => handleDelete(votpatient)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Edit Modal */}
            {editVotpatient && (
                <div
                    className="modal"
                    tabIndex="-1"
                    role="dialog"
                    style={{ display: "block" }}
                >
                    {/* Modal dialog */}
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            {/* Modal header */}
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Patient</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleCloseModal}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="modal-body">
                                <VotPatientEdit
                                    volunteers={volunteers}
                                    patient={patients.find(
                                        (p) => p.id === editVotpatient.id
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Delete Modal */}
            {deleteVotpatient && (
                <div
                    className="modal"
                    tabIndex="-1"
                    role="dialog"
                    style={{ display: "block" }}
                >
                    {/* Modal dialog */}
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            {/* Modal header */}
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Patient</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleCloseModal}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="modal-body">
                                <p>
                                    Are you sure you want to delete this
                                    patient?
                                </p>
                            </div>
                            {/* Modal footer */}
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDeleteSubmit}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Assuming 'window.myData' contains the patient, volunteers, and regimens data
const patients = window.myPatients;
const volunteers = window.myVolunteers;
const votpatients = window.myVotpatients;
ReactDOM.render(
    <VotatientTable
        patients={patients}
        volunteers={volunteers}
        votpatients={votpatients}
        auth={window.authUser}
    />,
    document.getElementById("votpatienttable")
);
