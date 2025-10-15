import{ BrowserRouter, Route  } from 'react-router-dom'
import './App.css'
import Layout from './components/layout'
import { ThemeProvider } from './context/theme-provider'
import { Routes } from 'react-router-dom'
import Citypage from './pages/city-page'
import Weatherdashbord from './pages/weather-dashbord'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
     staleTime:5*60*1000,
     gcTime:10*60*1000,
     retry: false,
     refetchOnWindowFocus:false,
    },
  },
})
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <ThemeProvider defaultTheme='dark' storageKey='my-app-theme'>
     <Layout>
      <Routes>
        <Route path='/' element={< Weatherdashbord/>}/>
        <Route path='/City/:CityName' element={<Citypage />}/>

      </Routes>
     </Layout>
     <Toaster richColors />

     </ThemeProvider>
   </BrowserRouter>
   <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>
  )
}
export default App
