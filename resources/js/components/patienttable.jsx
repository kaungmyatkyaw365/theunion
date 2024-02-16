import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import PatientCreate from "./patientcreate";
import PatientEdit from "./patientedit";
import VotPatientCreateForm from "./createvot";

const PatientTable = ({
    patients,
    auth,
    votpatients,
    volunteers,
    regimens,
}) => {
    const [editPatient, setEditPatient] = useState(null);
    const [deletePatient, setDeletePatient] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showPatient, setShowPatient] = useState(null);
    const openVotModal = (patient) => {
        setShowPatient(patient);
    };
    const closeVotModal = () => {
        setShowPatient(null);
    };
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const handleEdit = (patient) => {
        setEditPatient(patient);
    };

    const handleDelete = (patient) => {
        setDeletePatient(patient);
    };

    const handleCloseModal = () => {
        setEditPatient(null);
        setDeletePatient(null);
    };

    const handleEditSubmit = async (editedPatient) => {
        try {
            const response = await axios.put(
                `/api/patients/${editedPatient.id}`,
                editedPatient
            );
            console.log("Patient updated:", response.data);
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
                `/api/patients/${deletePatient.id}`
            );
            console.log("Patient deleted:", response.data);
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
                <div className="d-flex justify-content-between">
                    <h2>Patient Table</h2>
                    <button
                        className={
                            auth.role == "admin" || auth.role == "m&e_manager"
                                ? "btn btn-primary btn-sm"
                                : "btn btn-primary d-none btn-sm"
                        }
                        onClick={() => openModal()}
                    >
                        Create
                    </button>
                </div>
                {showModal && (
                    <div
                        className="modal"
                        tabIndex="-1"
                        role="dialog"
                        style={{ display: "block" }}
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Create Patient
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        onClick={closeModal}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <PatientCreate
                                        volunteers={volunteers}
                                        regimens={regimens}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <table className="table w-100 table-striped">
                    {/* Table header */}
                    <thead>
                        {/* Table row */}
                        <tr>
                            <th>Name</th>
                            <th>Registration Year</th>
                            <th>Date of Birth</th>
                            <th>Age</th>
                            <th>DRTB Code</th>
                            <th>Township</th>
                            <th>Referred by Volunteer</th>
                            <th>Patient Code</th>
                            <th>Address</th>
                            <th>Treatment Start Date</th>
                            <th>Treatment Regimen</th>
                            <th>Actions</th> {/* New column for actions */}
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                        {/* Loop through patients and render table rows */}
                        {patients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.name}</td>
                                <td>{patient.registration_year}</td>
                                <td>{patient.dob}</td>
                                <td>{patient.age}</td>
                                <td>{patient.drtb_code}</td>
                                <td>{patient.township}</td>
                                <td>
                                    {/* Find volunteer name */}
                                    {
                                        volunteers.find(
                                            (volunteer) =>
                                                volunteer.id ===
                                                patient.volunteer_id
                                        )?.name
                                    }
                                </td>
                                <td>{patient.patient_code}</td>
                                <td>{patient.address}</td>
                                <td>{patient.treatment_start_date}</td>
                                <td>
                                    {/* Find regimen name */}
                                    {
                                        regimens.find(
                                            (regimen) =>
                                                regimen.id ===
                                                patient.regimen_id
                                        )?.name
                                    }
                                </td>
                                <td>
                                    {/* Edit button */}
                                    <button
                                        className={
                                            auth.role == "admin" ||
                                            auth.role == "m&e_manager"
                                                ? "btn btn-primary btn-sm"
                                                : "btn btn-primary d-none btn-sm"
                                        }
                                        onClick={() => handleEdit(patient)}
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
                                        onClick={() => handleDelete(patient)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                {votpatients.find(
                                    (vot) => vot.patient_id === patient.id
                                ) ? (
                                    <td></td>
                                ) : (
                                    <td>
                                        <button
                                            className={
                                                auth.role == "admin" ||
                                                auth.role == "m&e_manager"
                                                    ? "btn btn-warning btn-sm"
                                                    : "btn btn-warning d-none btn-sm"
                                            }
                                            onClick={() =>
                                                openVotModal(patient)
                                            }
                                        >
                                            Make VOT patient
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* VotModel */}
            {showPatient && (
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
                                <h5 className="modal-title">Make Vot</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={closeVotModal}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="modal-body">
                                <VotPatientCreateForm
                                    volunteers={volunteers}
                                    patient={showPatient}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Edit Modal */}
            {editPatient && (
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
                                {/* PatientCreate component with edit mode */}
                                <PatientEdit
                                    patient={editPatient}
                                    onSubmit={handleEditSubmit}
                                    onCancel={handleCloseModal}
                                    volunteers={volunteers}
                                    regimens={regimens}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Delete Modal */}
            {deletePatient && (
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
const regimens = window.myRegimens;
const votpatients = window.myVotpatients;
ReactDOM.render(
    <PatientTable
        patients={patients}
        volunteers={volunteers}
        regimens={regimens}
        votpatients={votpatients}
        auth={window.authUser}
    />,
    document.getElementById("patienttable")
);
