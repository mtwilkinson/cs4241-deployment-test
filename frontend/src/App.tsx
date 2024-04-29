import React from 'react';
import './App.css';
import {Outlet, RouterProvider} from "react-router";
import NavBar from "./components/NavBar";
import {createBrowserRouter} from "react-router-dom";
import Homepage from "./routes/Homepage";
import LeaderBoard from "./routes/Leaderboard";
import Memory from "./routes/Memory";
import Instructions from "./routes/Instructions";
import Login from "./routes/Login";
import LoginCheck from "./components/LoginCheck";
import MultiplayerMemory from "./routes/MultiplayerMemory";


function App() {
  const router = createBrowserRouter([
        {
          path: "login",
          errorElement: <h2>Something went wrong!</h2>,
          element: <div className="w-full h-screen flex flex-col">
            <NavBar loggedOut={false}/>
            <Login/>
          </div>,
        },
        {
          path: "",
          element: <div className="w-full h-screen flex flex-col">
            <NavBar loggedOut={true}/>
            <Homepage/>
          </div>,
        },
        {
          path: "instructions",
          element: <div className="w-full h-screen flex flex-col">
            <NavBar loggedOut={true}/>
            <Instructions/>
          </div>,
        },
        {
          path: "leaderboard",
          element: <div className="w-full h-screen flex flex-col">
            <NavBar loggedOut={true}/>
            <LoginCheck component={<LeaderBoard/>}/>
          </div>,
        },
        {
          path: "memory",
          element: <div className="w-full h-screen flex flex-col">
            <NavBar loggedOut={true}/>
            <LoginCheck component={<Memory/>}/>
          </div>,
        },
        {
          path: "multiplayer-memory",
          element:
              <div className="w-full h-screen flex flex-col">
                <NavBar loggedOut={true}/>
                <LoginCheck component={<MultiplayerMemory/>}/>
              </div>
        }
      ]);

  return <RouterProvider router={router}/>;

  function Root() {
    return (
        <div className="w-full h-screen flex flex-col">
        <NavBar  loggedOut={true}/>
        <Outlet />
      </div>
    );
  }
}

export default App;
