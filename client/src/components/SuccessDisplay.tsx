import React from "react";

interface SuccessDisplayProps {
  name: string;
  onReset: () => void;
}

const SuccessDisplay: React.FC<SuccessDisplayProps> = ({ name, onReset }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-md text-center">
      <svg
        className="w-16 h-16 mx-auto mb-4 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Success!</h2>
      <p className="text-gray-600">
        Thank you, <span className="font-medium">{name}</span>!
      </p>
      <p className="text-gray-600">Your check-in is complete.</p>
      <button
        onClick={onReset}
        className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out"
      >
        Check-in Another Guest
      </button>
    </div>
  );
};

export default SuccessDisplay;
