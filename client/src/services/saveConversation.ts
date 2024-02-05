import axios from "axios";

export const saveConv = async () => {
  try {
    const response = await axios.post(
      "https://chatbot-phi-one.vercel.app/api/saveConversation",
      {
        conversation: "dummy",
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
