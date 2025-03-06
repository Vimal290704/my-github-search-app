import React from "react";
import { useNavigate } from "react-router-dom";
const ErrorMessage = ({ message }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <p>Try to refresh the page</p>
      <p>{message}</p>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Search Another User
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;