import "./App.css";
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Events from "./pages/Events";
import Chats from "./pages/Chats";
import Account from "./pages/Account";

function App() {


  return (
    <>
      <div className="p-4 dark:bg-[#121212] bg-[#f3f3f3] overflow-hidden h-screen dark:text-white">
        <div className="hidden md:block absolute w-80 h-56 bg-gradient-to-br from-[#ff9a3b] to-[#fccc89] dark:opacity-55 rounded-[50%] blur-3xl top-[70%] -right-32"></div>
        <div className="absolute w-80 h-56 bg-gradient-to-br from-[#ff9a3b] to-[#fccc89] dark:opacity-45 rounded-[50%] blur-3xl top-[36%] -left-32"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
