import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface SearchHistoryItem{
    id:string;
    query:string;
    lat:number;
    lon:number;
    name:string;
    country:string;
    state?:string;
    searchedAt: number;
}


export function useSearchHistory(){

 const [history,setHistory]=  useLocalStorage<SearchHistoryItem[]>
 ( "search-history",
    []
);

const queryClient=useQueryClient();
const historyQuery=useQuery({
    queryKey:["search-history"],
    queryFn: ()=>history,
    initialData: history,
});


const addToHistory=useMutation({
    mutationFn:async(
        Search: Omit<SearchHistoryItem,"id" | "searchedAt">
    )=>{
        const newSearch: SearchHistoryItem={
            ...Search,
            id: `${Search.lat}-${Search.lon}-${Date.now()}` ,
            searchedAt: Date.now(),
        };

        const filteredHistory= history.filter(
            (item)=> !(item.lat === Search.lat && item.lon === Search.lon)

            );
        const newHistory=[newSearch,...filteredHistory].slice(0,10);
        setHistory(newHistory);
        return newHistory;

    },
    onSuccess:(newHistory)=>{
        queryClient.setQueryData(["search-history"],newHistory);
    }
});
const clearHistory=useMutation({
    mutationFn:async()=>{
       setHistory([]);
       return [];




    },
    onSuccess:()=>{
        queryClient.setQueryData(["search-history"],[]);
    }

});

return{
    history: historyQuery.data || [],
    addToHistory,
    clearHistory,

}
}