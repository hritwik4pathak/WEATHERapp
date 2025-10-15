
import type { forecastData } from "@/api/types";

import { format } from "date-fns";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";


interface HourlyTempratureProps {
    data: forecastData; 
}
const HourlyTemprature=({data}:HourlyTempratureProps)=>{

    const chartData = data.list.slice(0, 8).map((item)=>({
        time: format(new Date(item.dt * 1000), 'ha'),
        temp:Math.round(item.main.temp),
        feels_like:Math.round(item.main.feels_like),
        uv:Math.round(item.main.temp)
    }));
    
    return(
        <Card className=" flex-1">
            
  <CardHeader>
    <CardTitle>Today's Temprature</CardTitle>
    
    
  </CardHeader>
  <CardContent>
    <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
         
                  <LineChart data={chartData}>
                  <XAxis  dataKey="time"
                  stroke="#888888" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"    
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}°C`}  
                  />
                  {/* <Tooltip content={<CustomTooltip />} /> */}
                  <Tooltip
                  content={({ active, payload }) => {
                    if(active && payload && payload.length){
                        return(
                            <div className="rounded-lg border bg-background shadow-sm p-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col">
                                        <span className="text=[0.70rem] uppercase opacity-90 text-bold text-blue-500"> Temprature</span>
                                        <span className="font-bold">{payload[0].value}°C</span>
                                    </div>
                                <div className="flex flex-col">
                                    <span className="text=[0.70rem] uppercase opacity-90 text-green-500 text-bold">Feels Like</span>
                                    <span className="font-bold">{payload[1].value}°C</span>
                                </div>

                                </div>
                                        
                            </div>
                        )
                    } return null;
                  }}
                  
                  
                  
                  />
                  <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={false} 
                  />
                  <Line
                  type="monotone"
                  dataKey="feels_like"
                  stroke="#22C55E"
                  strokeDasharray="5 5"
                  strokeWidth={3}
                  dot={false} 
                  />
                  </LineChart>
                 


            </ResponsiveContainer>

    </div>
  </CardContent>
  


        </Card>
    )
}

export default HourlyTemprature