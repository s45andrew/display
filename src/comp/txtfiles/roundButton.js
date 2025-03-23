import React from 'react';
import './roundbutton.css'; // Import CSS file (optional)

const RoundButton = ({ text, onClick }) => {
    return (
        <button className="round-button" onClick={onClick}>
            {text}
        </button>
    );
};

export default RoundButton;
