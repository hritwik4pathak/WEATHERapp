import { API_CONFIG } from "./config";
import type { Coordinates, forecastData, GeocoadgingResponse, WeatherData } from "./types";

class WeatherAPI {
    private createUrl(BASE_URL: string, params: Record<string, string | number>) {
        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...params,
        })
        return `${BASE_URL}?${searchParams.toString()}`;
    }

    private async fetchData<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }

    async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,
        })

        return this.fetchData<WeatherData>(url);
    }


    async getForecast({ lat, lon }: Coordinates): Promise<forecastData> {
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,
        })

        return this.fetchData<forecastData>(url);
    }


    async reverseGeocode({ lat, lon }: Coordinates): Promise<GeocoadgingResponse[]> {
        const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
            lat: lat.toString(),
            lon: lon.toString(),
            limit: "1",
            appid: API_CONFIG.API_KEY,
        })


        return this.fetchData<GeocoadgingResponse[]>(url);
    }





}

export const weatherAPI = new WeatherAPI();