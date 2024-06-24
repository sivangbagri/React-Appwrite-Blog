import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from './components'
import { Outlet } from "react-router-dom";
import Notes from "./components/Notes";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  // console.log(process.env.REACT_APP_APPWRITE_URL);
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-[#0c0a09] ">
      <div className="w-full block">
        <Header/>
       <Notes/>
        <main>
          TODO: <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null;
}

export default App;
