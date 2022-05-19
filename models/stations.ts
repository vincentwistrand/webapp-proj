import { useEffect, useState } from "react";
import config from "../config/config.json";
import Station from "../interface/station";

const stationsModel = {
    getStations: async function getStations(): Promise<Station[]> {
        const response = await fetch(`${config.traffic_url}/stations`);
        const result = await response.json();

        return result.data;
    }
};

export default stationsModel;