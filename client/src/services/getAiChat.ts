import axios from "axios";

export const getAiChat = async () => {
  try {
    const result = await axios.get("http://localhost:3000/api/mockAiResponse");
    return result.data;
  } catch (error) {
    return error;
  }
};
