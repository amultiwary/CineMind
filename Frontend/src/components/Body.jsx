import { useEffect, useState } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
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

  if (!isAuthChecked) return null;

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
