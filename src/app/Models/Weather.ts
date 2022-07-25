export class Weather {
    resolvedAddress: string;
    address: string;
    days: Days[];
}

export class Days {
    datetime: Date;
    tempmax: number;
    tempmin: number;
    temp: number;
    humidity: number;
    precipprob: number;
    windspeed: number;
    conditions: string;
    icon: string;
}

export class ConsultW {
    ValueCity: Weather;
    ConsultTime: number;
}