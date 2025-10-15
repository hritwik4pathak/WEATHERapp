import CurrentWeather from "@/components/current-weather";
import FavoriteCities from "@/components/favoiret-cities";
import HourlyTemprature from "@/components/hourly-temprature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Weatherforecast from "@/components/weather-forecast";
import WeatherDetails from "@/components/weatherDetails";
import { useGeoLoctaion } from "@/hooks/use-geolocation";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
const Weatherdashbord = () => {
  const { coordinates,
    locationerror,
    getlocation,
    locationloading
  } = useGeoLoctaion();

  const forecastquery = useForecastQuery(coordinates);
  const weatherquery = useWeatherQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);
  // console.log("coordinates", coordinates);
  // console.log("locationQuery", locationQuery.data);
  // console.log("weatherquery", weatherquery.data);
  // console.log("forecastquery", forecastquery.data);

  const handleRefresh = () => {
    getlocation()
    if (coordinates) {
      weatherquery.refetch();// relode weather data
      forecastquery.refetch();// relode forecast data
      locationQuery.refetch();// relode location data
    }
  };

  if (locationloading) {
    return <WeatherSkeleton />;
  }

  if (locationerror) {
    return (
      <Alert variant="destructive">
        <AlertTriangle />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationerror}</p>
          <Button onClick={getlocation} variant={'outline'} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTriangle />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your location weather</p>
          <Button onClick={getlocation} variant={'outline'} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  const locationName = locationQuery.data?.[0];

  if (weatherquery.error || forecastquery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle />
        <AlertTitle> Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
          <Button onClick={handleRefresh} variant={'outline'} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherquery.data || !forecastquery.data) {
    return <WeatherSkeleton />;
  }

  console.log(coordinates, getlocation, locationerror, locationloading);
  return (
    <div className="space-y-4">

      {/*favorit location*/}
      <FavoriteCities/>


      <div className="flex item-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant={'outline'}
          size={'icon'}
          onClick={handleRefresh}
          disabled={weatherquery.isFetching || forecastquery.isFetching || locationQuery.isFetching}
        // disabled={}
        >

          <RefreshCw className={` h-4 w-4 ${weatherquery.isFetching?"animate-spin":""
          }`} />
        </Button>
      </div>

         <div className="grid gap-6">
            <div className="flex flex-col lg:flex-row gap-4 ">
              <CurrentWeather 
              data={weatherquery.data} 
              locationName={locationName}
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

export default Weatherdashbord;