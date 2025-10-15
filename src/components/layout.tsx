import { ThemeProvider } from '@/context/theme-provider'
import  type {PropsWithChildren } from 'react'
import Header from './header'

const Layout = ({children}:PropsWithChildren) => {
  return (
    <ThemeProvider  defaultTheme="dark" storageKey="vite-ui-theme">
    <div className="bg-gradient-to-br from background to-muted ">
        <Header />
        <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
        </main>
        <footer className='border-t-2 backdrop-blur py-5 '>
          <div className='container mx-auto px-4 py-2 text-center text-gray-600' >
            <p>footer for the page</p>
          </div>
        </footer>
        </div>
</ThemeProvider>  
)
}

export default Layout


