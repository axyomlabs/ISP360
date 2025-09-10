    import React from "react";
    import "../css/Chartmodal.css";

    const Chartmodal = ({ show, handleClose, children, title }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
        <div className="modal-container">
            <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close-button" onClick={handleClose}>
                &times;
            </button>
            </div>
            <div className="modal-body">
            {children}
            </div>
        </div>
        </div>
    );
    };

    export default Chartmodal;