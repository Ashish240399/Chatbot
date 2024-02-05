import axios from "axios";

export const getAiChat = async () => {
  try {
    const result = await axios.get(
      "https://chatbot-phi-one.vercel.app/api/mockAiResponse"
    );
    return result.data;
  } catch (error) {
    return error;
  }
};
