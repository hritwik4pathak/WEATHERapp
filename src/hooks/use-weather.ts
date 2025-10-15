import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
    weather: (coords: Coordinates) => ["weather", coords],
    forecast: (coords: Coordinates) => ["forecast", coords],
    location: (coords: Coordinates) => ["location", coords],
    Search: (query: string) => ["location-search", query],

} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates
    });
}
export function useForecastQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherAPI.getForecast(coordinates) : null,
        enabled: !!coordinates
    });
}
export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
        enabled: !!coordinates
    });
}

export function useSearchLocationQuery(query: string) {
    return useQuery({
        queryKey: WEATHER_KEYS.Search(query),
        queryFn: () => weatherAPI.searchLocations(query) ,
        enabled: query.length > 3,
    });
}