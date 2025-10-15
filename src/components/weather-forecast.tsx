import type { forecastData } from "@/api/types";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
interface WeatherforecastProps {
    data: forecastData; 
}


interface DailyForecast {
    date:number;
    temp_min:number;
    temp_max:number;
    humidity:number;
    wind:number;
    weather:{
        id:number;
        main:string;
        description:string;
        icon:string;
    };
}

const Weatherforecast = ({data}:WeatherforecastProps) => {
    const dailyForecast = data.list.reduce((acc, forecast)=>{
        const date = format (new Date(forecast.dt *1000),"yyyy-MM-dd");

        if(!acc[date]){
            acc[date]={
                temp_min:forecast.main.temp_min,
                temp_max:forecast.main.temp_max,
                weather:forecast.weather[0],
                humidity:forecast.main.humidity,
                wind:forecast.wind.speed,
                date:forecast.dt,
            }

        }else{ 
            acc[date].temp_min=Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max=Math.max(acc[date].temp_max, forecast.main.temp_max);

        }
        return acc;

    },{} as Record<string, DailyForecast>);
    const nextDays=Object.values(dailyForecast).slice(0,6);
    const formatTemp=(temp:number)=>`${Math.round(temp)}°C`;

    return (
        <Card>
  <CardHeader>
    <CardTitle>5-Day Forecast</CardTitle>  
  </CardHeader>
  <CardContent>
    <div className="grid gap-4 ">
        {nextDays.map((day)=>{
            return <div 
            key={day.date}
            className="grid rid-cols-3  items-center rounded-lg p-2 border ">
                <div className="">
                    <p className="font-medium">
                        {format(new Date(day.date *1000),"EEE, MMM d")}</p>
                    <p className="text-muted-foreground">
                        {day.weather.description}</p>
                </div>
                <div className="flex justify-center gap-4">
                    <span className="flec items-center text-blue-500 ">
                    <ArrowUp className="mr-1 h-4 w-4  "/>
                    {formatTemp(day.temp_min)}
                    </span>
                    <span className="flex items-center text-red-500 ">
                        <ArrowDown className="mr-1 h-4 w-4 "/>
                        {formatTemp(day.temp_max)}
                        </span>
                </div>
                <div className="flex justify-end gap-4">
                    <span className="flex items-center gap-1">
                        <Droplet className="h-4 w-4 text-green-500"/>
                        <span className="ml-1 text-sm text-muted-foreground">{day.humidity}%</span>
                    </span>
                     <span className="flex items-center gap-1">
                        <Wind className="h-4 w-4 text-purple-500"/>
                        <span className="ml-1 text-sm text-muted-foreground">{day.wind}M/s</span>
                    </span>
                </div>


                <div></div>


              </div>
        })}
        </div>
  </CardContent>
  
</Card>
    );
};

export default Weatherforecast;