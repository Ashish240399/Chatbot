import axios from "axios";

export const saveConv = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/saveConversation",
      {
        conversation: "dummy",
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
