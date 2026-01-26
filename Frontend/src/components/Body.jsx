import { useEffect, useState } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

console.log(" i am in Body");

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("i am in body.jsx");
  const token = localStorage.getItem("token");

  useEffect(() => {
    
    if (token) {
      axios
        .get("https://cinemind-98oc.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(addUser(res.data.user));
          setIsLoggedIn(true);
          setIsAuthChecked(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setIsAuthChecked(true);
        });
    } else {
      setIsLoggedIn(false);
      setIsAuthChecked(true);
    }
  }, [dispatch, token]);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <Browse /> : <Login />,
    },
    {
      path: "/browse",
      element: isLoggedIn ? <Browse /> : <Login />,
    },
  ]);

  if (!isAuthChecked) return (
    <div className="flex items-center justify-center h-screen bg-black">
       <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
