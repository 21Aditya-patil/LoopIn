import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Events from './pages/Events'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='p-4 bg-[#f3f3f3] overflow-hidden h-screen'>
        <div className='absolute w-80 h-56 bg-gradient-to-br from-[#ff9a3b] to-[#fccc89] rounded-[50%] blur-3xl -top-[18%] right-0'></div>
        <div className='absolute w-80 h-56 bg-gradient-to-br from-[#ff9a3b] to-[#fccc89] rounded-[50%] blur-3xl top-[36%] -left-32'></div>
        <Home />
        {/* <Events /> */}
      </div>
    </>
  )
}

export default App
