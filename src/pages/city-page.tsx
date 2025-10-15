import CurrentWeather from "@/components/current-weather";
import FavoriteButton from "@/components/facorite-button";
import HourlyTemprature from "@/components/hourly-temprature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Weatherforecast from "@/components/weather-forecast";
import WeatherDetails from "@/components/weatherDetails";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";


const Citypage = () => {
 const [searchParams]=useSearchParams()
 const params= useParams();
 const lat=parseFloat(searchParams.get("lat")|| "0");
 const lon=parseFloat(searchParams.get("lon")||"0");
 const coordinates={lat,lon};
  const forecastquery = useForecastQuery(coordinates);
   const weatherquery = useWeatherQuery(coordinates);
 if (weatherquery.error || forecastquery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle/>
        <AlertTitle> Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
          
        </AlertDescription>
      </Alert>
    );
  }

   if (!weatherquery.data || !forecastquery.data|| !params.CityName) {
    return <WeatherSkeleton />;
  }



  return (
    <div className="space-y-4">

      {/*favorit location*/}


      <div className="flex item-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{params.CityName},
          {weatherquery.data.sys.country}
        </h1>
        <div>
        <FavoriteButton  
         data={{...weatherquery.data, name:params.CityName}}/>        

        </div>
      </div>

         <div className="grid gap-6">
            <div className="flex flex-col  gap-4 ">
              <CurrentWeather
              data={weatherquery.data} 
             
              />
            <HourlyTemprature data={ forecastquery.data}/>
            </div> 
            <div className="grid gap-6 md:grid-cols-2 items-start">
               {/* details forecast */}
              <WeatherDetails data={weatherquery.data}/>

              <Weatherforecast data={forecastquery.data}/>

              </div>                                         

         </div>

    </div>
  )
}

export default Citypage