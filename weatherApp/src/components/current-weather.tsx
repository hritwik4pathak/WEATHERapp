import type { GeocoadgingResponse, WeatherData } from "@/api/types";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface CurrentWeatherProps {
    data: WeatherData;
    locationName?: GeocoadgingResponse;
}



const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
    const {
        weather: [CurrentWeather],
        main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
        wind: { speed, direction },
    } = data;
    const formatTemp = (temp: number) => `${Math.round(temp)}°C`;

    return <Card className="overflow-hidden">

        <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-end gap-1">
                            <h2 className="text-2xt fot-bold tracking-tight"> {locationName?.name}</h2>
                            {locationName?.state && (
                                <span className="text-muted-foreground">, {locationName.state}</span>)}

                        </div>
                        <p className="text-sm text-muted-foreground">{locationName?.country}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-6xl font-bold tracking-tighter">
                            {formatTemp(temp)}
                        </p>
                        <div className="space-y-1">
                            <p className="text-sm  font-medium text-muted-foreground ">
                                Feels like{formatTemp(feels_like)}</p>

                            <div className="flex text-sm gap-1 font-medium">
                                <span className="flex items-center gap-1 text-blue-500">
                                    <ArrowDown className="inline h-3 w-3 rotate-180" />
                                    {formatTemp(temp_min)}
                                </span>

                                <div className="flex text-sm gap-1 font-medium">
                                    <span className="flex items-center gap-1 text-red-500">
                                        <ArrowUp className="inline h-3 w-3 rotate-180" />
                                        {formatTemp(temp_max)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <Droplet className="inline h-4 w-4 text-blue-500" />
                            <div className="space-0.5">
                                <p className="text-sm font-medium ">Humidity</p>
                                <p className="text-sm text-muted-foreground">{humidity}%</p>


                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Wind className="inline h-4 w-4 text-blue-500" />
                            <div className="space-0.5">
                                <p className="text-sm font-medium ">Wind Speed</p>
                                <p className="text-sm text-muted-foreground">{speed} m/s</p>


                            </div>


                        </div>
                    </div>
                </div>
                <div>
                    <div className="relative">
                        <img
                            src={`https://openweathermap.org/img/wn/${CurrentWeather.icon}@4x.png`}
                        />
                        <div className="absolute bottom-0text-center">
                        <p className="text-sm font-medium capitalize">
                            {CurrentWeather.description}</p>
                    </div>
                </div>
            </div>
        </div>
    </CardContent>

    </Card >
}

export default CurrentWeather;