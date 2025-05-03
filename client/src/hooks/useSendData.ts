import { APIResponse, FormData } from "../Interfaces"; // Ensure interfaces are updated and renamed
import APIClient from "../api/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const client = new APIClient<FormData, APIResponse>("/guests");

const useSendData = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<APIResponse, Error, FormData>({
    mutationFn: (data: FormData) => {
      return client.sendData(data);
    },
    onSuccess: (data) => {
      console.log("Guest data entry created successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (error) => {
      console.error("Error creating guest data entry:", error);
    },
  });

  return mutation;
};

export default useSendData;
