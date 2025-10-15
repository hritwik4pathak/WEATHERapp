import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface FavoriteCity{
    id:string;
    name:string;
    lat:number;
    lon:number;
    country:string;
    state?:string;
    addedAt: number;
}


export function useFavorites(){

 const [favorites,setfavorites]=  useLocalStorage<FavoriteCity[]>
 ( "favourites",
    []
);

const queryClient=useQueryClient();
const favoriteQuery=useQuery({
    queryKey:["favorites"],
    queryFn: ()=>favorites,
    initialData: favorites,
    staleTime: Infinity,
});


const addFavorites=useMutation({
    mutationFn:async(
        city: Omit<FavoriteCity,"id" | "addedAt">
    )=>{
        const newFavorite: FavoriteCity={
            ...city,
            id: `${city.lat}-${city.lon}` ,
            addedAt: Date.now(),
        };

        const exsist= favorites.some((fav)=>fav.id=== newFavorite.id);
        if (exsist) return favorites
        const newFavorites=[ ...favorites,newFavorite].slice(0,10);

        setfavorites(newFavorites);
        return newFavorites;

    },
    onSuccess:()=>{
        queryClient.invalidateQueries({
            queryKey:["favorites"],
        });
    },
});
const removeFavorite=useMutation({
    mutationFn:async(cityId:string)=>{
const newFavorites=favorites.filter((city) => city.id !== cityId)
setfavorites(newFavorites)
        return newFavorites;




    },
    onSuccess:()=>{
       queryClient.invalidateQueries({
            queryKey:["favorites"],
        });
    }

});

return{
    favorites: favoriteQuery.data || [],
    addFavorites,
    removeFavorite,
    isFavorite:(lat:number,lon:number)=>
        favorites.some((city)=>city.lat== lat && city.lon == lon),

}
}