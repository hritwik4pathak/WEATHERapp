import CurrentWeather from "@/components/current-weather";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
            <div>
              <CurrentWeather 
              data={weatherquery.data} 
              locationName={locationName}/>{/* current weather
              hourly temp */}
            </div> 
            <div>
              {/* details
              forecast */}
              </div>                                         

         </div>

    </div>
  )
}

export default Weatherdashbord;