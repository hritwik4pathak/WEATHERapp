import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeoLocationState{
    coordinates: Coordinates | null;
    locationerror: string | null;
    locationloading: boolean;
}







export function useGeoLoctaion(){
    const [ LocationData,setLocationData] = useState<GeoLocationState>({
        coordinates:null,
        locationerror:null,
        locationloading:true,

    });

    const getlocation =()=>{
        setLocationData((prev)=>({...prev,loading:true,error:null}));
      
        if(!navigator.geolocation){
            setLocationData({
                coordinates:null,locationerror:'Geolocation is not supported',
                locationloading:false
            });
            return;
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            setLocationData({
                coordinates:{
                    lat:position.coords.latitude,
                    lon:position.coords.longitude,
                },  
                locationerror:null,
                locationloading:false,
            });
        },
        (error)=>{
            let errorMessage = "";
            
            switch(error.code){
                case error.PERMISSION_DENIED:
                    errorMessage = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    errorMessage = "The request to get user location timed out.";
                    break;
                default:
                    errorMessage = "An unknown error occurred.";
                    break;
            }
            setLocationData({
                coordinates:null,
                locationerror:errorMessage,
                locationloading:false,
        });  
    },{
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0
    }
        );
    };

    useEffect(()=>{
        getlocation();},[]);

    return {
    ...LocationData,
     getlocation
    };
  }