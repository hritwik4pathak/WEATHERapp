import { useTheme } from '@/context/theme-provider'
import { Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import CitySearch from './citySearch'

const Header = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop:blur py-2'>
      <div className="container mx-auto flex h-14 items-center justify-between px-5">
        <Link to="/">
          <img
            src={isDark ? '/logo.png' : '/logo2.png'}
            alt="weather-logo"
            className='h-14'
          />
        </Link>
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          {/* search qury */}
          <CitySearch/>
          <div
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`cursor-pointer flex items-center transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}
          >
            {isDark ? <Sun className=" text-yellow-400 h-6 w-6 rotate-0 transition-all" /> : <Moon className=" rotate-0 transition-all" />}
            
            
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header