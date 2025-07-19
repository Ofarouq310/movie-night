import { useState } from 'react'
import Search from './components/Search';
import {hero, logo} from './assets/index'

export default function App() {

  const [searchValue, setSearchValue] = useState('');

  return (
    <main>
        <div className="pattern" />
        <div className="wrapper">
          <header className="header">
            <img src={logo} alt="hero logo" className='w-20 p-2 sm:mb-5' />
            <img src={hero} alt="hero banner" />
            <h1 className="">Find <span className="text-gradient">Movies </span>You'll Enjoy Without The Hassle</h1>
          
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
          </header>



        </div>
    </main>
  )
}
