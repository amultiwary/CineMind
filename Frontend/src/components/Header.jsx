import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constant";
import { toggleGptSearchView } from "../utils/GptSlice";
import { changeLangugae } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user) {
      dispatch(removeUser());
      navigate("/");
    }
  }, [user, dispatch, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate("/");
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLangugae(e.target.value));
  };

  return (
    <div className="w-screen absolute px-8 py-2 bg-gradient-to-b from-black  z-10 flex flex-col md:flex-row justify-between items-center">
      <img src="/logo.png" className="w-40 mx-auto md:mx-0" alt=" logo" />
      {user && (
        <div className="flex p-2 justify-between">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white rounded-md"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-1 my-2 bg-purple-800 hover:bg-purple-700 transition duration-300 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <button
            onClick={handleSignOut}
            className="font-bold text-white bg-red-600 px-4 my-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            LogOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
