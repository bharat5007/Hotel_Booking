import { Navigate, Route, Routes } from "react-router-dom";
import Autherizations from "./auth/Autherizations";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import { useUserContext } from "./contextapi/XUser";
import HotelPage from "./pages/HotelPage";
import BookPage from "./pages/Bookpage";
import './App.css';

function App() {
  const { user } = useUserContext();

  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Autherizations />} />
        <Route 
          path="/home" 
          element={
            user ? (
              <>
                <Header />
                <Dashboard />
              </>
            ) : (
              <Navigate to="/" />
            )
          } 
        />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/booking/:id" element={<BookPage />} />
      </Routes>
    </div>
  );
}

export default App;
