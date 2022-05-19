export default interface Message {
    ExternalDescriptiont: string,
    Geometry: object,
    EventId: string,
    Header: string,
    ReasonCode: Array<string>,
    TrafficImpact: Array<TrafficImpact>,
    StartDateTime: string,
    LastUpdateDateTime: string
};

interface TrafficImpact {
    IsConfirmed: boolean,
    FromLocation: Array<string>,
    AffectedLocation: Array<string>,
    ToLocation: Array<string>
}