import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

class APIClient<TCreate, TResponse> {
  constructor(private endpoint: string) {}
  // Sends a new message to be added to the chat document
  async sendData(data: TCreate): Promise<TResponse> {
    try {
      const response = await axiosInstance.post<TResponse>(this.endpoint, data);
      return response.data;
    } catch (error: unknown) {
      console.error(`Error sending message to ${this.endpoint}:`, error);
      throw error;
    }
  }
}

export default APIClient;
