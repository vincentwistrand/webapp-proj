export default interface Delay {
    ActivityId: string,
    ActivityType: string,
    AdvertisedTimeAtLocation: string,
    AdvertisedTrainIdent: string,
    Canceled: boolean,
    EstimatedTimeAtLocation: string,
    FromLocation: Array<FromLocation>,
    ToLocation: Array<ToLocation>,
};

interface FromLocation {
    LocationName: string,
    Priority: number,
    Order: number
};

interface ToLocation {
    LocationName: string,
    Priority: number,
    Order: number
};