import React from "react";
import { FormData, FormErrors } from "../Interfaces";

interface GuestInputFormProps {
  formData: FormData;
  errors: FormErrors;
  isPending: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const GuestInputForm: React.FC<GuestInputFormProps> = ({
  formData,
  errors,
  isPending,
  onChange,
  onSubmit,
}) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 sm:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Guest Check-in
      </h2>
      <form onSubmit={onSubmit} noValidate>
        {errors.api_error && (
          <div
            className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm"
            role="alert"
          >
            {errors.api_error}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={onChange}
            placeholder="e.g., Karl Marx"
            required
            className={`w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.full_name ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.full_name}
            aria-describedby={errors.full_name ? "fullNameError" : undefined}
          />
          {errors.full_name && (
            <p id="fullNameError" className="mt-1 text-xs text-red-600">
              {errors.full_name}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={onChange}
            placeholder="e.g., 1231231234"
            required
            className={`w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone_number ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.phone_number}
            aria-describedby={
              errors.phone_number ? "phoneNumberError" : undefined
            }
          />
          {errors.phone_number && (
            <p id="phoneNumberError" className="mt-1 text-xs text-red-600">
              {errors.phone_number}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </div>
          ) : (
            "Submit Check-in"
          )}
        </button>
      </form>
    </div>
  );
};

export default GuestInputForm;
