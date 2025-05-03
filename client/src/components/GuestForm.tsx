import React, { useState, useEffect } from "react";
import { FormData, FormErrors } from "../Interfaces";
import { validateFullName, validatePhoneNumber } from "../utils";
import useSendData from "../hooks/useSendData";
import { AxiosError } from "axios";
import GuestInputForm from "./GuestInputForm";
import SuccessDisplay from "./SuccessDisplay";

interface ApiErrorDetail {
  detail?: string | { loc: (string | number)[]; msg: string; type: string }[];
}

const GuestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    phone_number: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedName, setSubmittedName] = useState<string>("");
  const mutation = useSendData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
    if (errors.api_error) {
      setErrors((prevErrors) => ({ ...prevErrors, api_error: undefined }));
    }
    if (mutation.isError || mutation.isSuccess) {
      mutation.reset();
    }
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      setSubmittedName(mutation.data?.full_name || formData.full_name);
      setFormData({ full_name: "", phone_number: "" });
      setErrors({});
    } else if (mutation.isError) {
      let apiErrorMessage = "An unexpected error occurred. Please try again.";
      const error = mutation.error;

      if (error instanceof AxiosError && error.response) {
        const errorData = error.response.data as ApiErrorDetail;
        const status = error.response.status;

        if (errorData && errorData.detail) {
          if (typeof errorData.detail === "string") {
            apiErrorMessage = errorData.detail;
          } else if (Array.isArray(errorData.detail)) {
            apiErrorMessage = errorData.detail
              .map((err) => `${err.loc[1]}: ${err.msg}`) // assume loc[1] is the field name
              .join("; ");
          } else {
            apiErrorMessage = `Server error (Status: ${status})`;
          }
        } else {
          apiErrorMessage = `Server error (Status: ${status})`;
        }
      } else if (error instanceof Error) {
        apiErrorMessage = error.message;
      }

      setErrors({ api_error: apiErrorMessage });
    }
  }, [
    mutation.isSuccess,
    mutation.isError,
    mutation.data,
    mutation.error,
    formData.full_name,
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.reset();
    setSubmittedName("");
    setErrors({});

    const nameError = validateFullName(formData.full_name);
    const phoneError = validatePhoneNumber(formData.phone_number);

    if (nameError || phoneError) {
      setErrors({ full_name: nameError, phone_number: phoneError });
      return;
    }
    mutation.mutate(formData);
  };

  if (mutation.isSuccess) {
    return (
      <SuccessDisplay
        name={submittedName}
        onReset={() => {
          mutation.reset();
          setSubmittedName("");
        }}
      />
    );
  }

  return (
    <GuestInputForm
      formData={formData}
      errors={errors}
      isPending={mutation.isPending}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default GuestForm;
