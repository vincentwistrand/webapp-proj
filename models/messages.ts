import config from "../config/config.json";
import Message from "../interface/messages";

const messageModel = {
    getMessages: async function getMessages(): Promise<Array<Message>> {
        const response = await fetch(`${config.traffic_url}/messages`);
        const result = await response.json();

        return result.data;
    }
};

export default messageModel;