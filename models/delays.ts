import config from "../config/config.json";
import Delay from "../interface/delay";

const delaysModel = {
    getDelays: async function getDelays(): Promise<Delay[]> {
        const response = await fetch(`${config.traffic_url}/delayed`);
        const result = await response.json();

        return result.data;
    }
};

export default delaysModel;