import React from "react";
import "./AddButton.css";
export default function addButton({ onClick }) {
  return (
    <a className="AddButton" onClick={onClick} title="Add a task">
      <div className="text">+</div>
    </a>
  );
}
