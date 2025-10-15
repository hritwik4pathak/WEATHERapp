import { useSearchHistory } from "@/hooks/use-search-history";
import { useSearchLocationQuery } from "@/hooks/use-weather";
import { format } from "date-fns";
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { useFavorites } from "@/hooks/use-favorite";


const CitySearch=()=>{
    const [open,setOpen]=useState(false);
    const [query,setQuery]=useState("");
const navigate= useNavigate();
    const {data:Locations,isLoading}=useSearchLocationQuery(query);
      const {history,clearHistory,addToHistory}=useSearchHistory();


    const handleSelect=(cityData:string)=>{
      const [lat,lon,name,country]=cityData.split("|");


    //add search history

    addToHistory.mutate({
      query,
      name,
      lat:parseFloat(lat),
      lon:parseFloat(lon),
      country,
    })


    setOpen(false);
      navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    };
    const {favorites}= useFavorites();
    return(
        <>
    <Button 
    variant={"outline"}
className="w-full relative text-muted-foreground sm:pr-12 md:w-40 lg:w-64 justify-start text-sm"
    


    onClick={()=> setOpen(true)}>
        <Search className="mr-2 h-4 w-4"/>
        search cities..</Button>
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder=" search cities..." 
      value={query}
      onValueChange={setQuery}/>
      <CommandList>
        {query.length>2 && !isLoading && (<CommandEmpty>No cities found.</CommandEmpty>
        )}


        {favorites.length>0 &&( 

          <CommandGroup heading="Favories">
            

            {favorites.map((location)=>{
              return <CommandItem key={location.id}
          value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
          onSelect={handleSelect}
    >
      <span>
        <Star className="mr-2 h-4 w-4 text-yellow-500"/>
        {location.name}
        </span>
        {location.state && (
        <span className="text-sm text-muted-foreground ml-2">
          , {location.state}
        </span>
      )}
      <span className="text-sm text-muted-foreground ml-2">
        , {location.country}
      </span>
     
    
      </CommandItem>
            

            })}
              
        </CommandGroup>
      )}


        {history.length>0 &&( 
<>
        <CommandSeparator />

          <CommandGroup >
            <div className="flex items-center justify-between px-2 my-2">
              <p  className="text-sm text-muted-foreground">
                Recent Searches</p>
              <Button variant="ghost"
              size="sm"
              onClick={()=>clearHistory.mutate()}>
                <XCircle className="h-4 w-4"/>
                clear
              </Button>
            </div>

            {history.map((location)=>{
              return <CommandItem key={`${location.lat}-${location.lon}`}
          value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
          onSelect={handleSelect}
    >
      <span>
        <Clock className="mr-2 h-4 w-4 text-muted-foreground"/>
        {location.name}
        </span>
        {location.state && (
        <span className="text-sm text-muted-foreground ml-2">
          , {location.state}
        </span>
      )}
      <span className="text-sm text-muted-foreground ml-2">
        , {location.country}
      </span>
      <span>
        {format(location.searchedAt,"MMM d,h:mm a")}
      </span>
    
      </CommandItem>
            

            })}
              
        </CommandGroup>
        </>
      )}

<CommandSeparator/>

        {Locations && Locations.length>0 && (
         <CommandGroup heading="Suggestions">
           {isLoading &&( 
            <div className="p-4 text-center items-center ">
            <Loader2 className="animate-spin h-4 w-4 "/>
            </div>)}

       {Locations.map((location)=>{
          return(
          <CommandItem key={`${location.lat}-${location.lon}`}
          value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
          onSelect={handleSelect}
    >
      <span>
        <search className="mr-2 h-4 w-4"/>
        {location.name}
        </span>
        {location.state && (
        <span className="text-sm text-muted-foreground ml-2">
          , {location.state}
        </span>
      )}
      <span className="text-sm text-muted-foreground ml-2">
        , {location.country}
      </span>
    
      </CommandItem>
    );
  })}
        </CommandGroup>)}
      </CommandList>
    </CommandDialog>
        
        
        
        
        </>
    )
}

export default CitySearch;