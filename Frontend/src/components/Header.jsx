import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constant";
import { toggleGptSearchView } from "../utils/GptSlice";
import { changeLangugae } from "../utils/configSlice";


console.log("i am in header")


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
    <div className="absolute w-full px-4 md:px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
      <img 
        src="/logo.png" 
        className="w-32 md:w-44 mx-auto md:mx-0 transition-all duration-300" 
        alt="logo" 
      />
      {user && (
        <div className="flex items-center justify-center gap-2 md:gap-4 p-2">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-900 text-white rounded-md text-sm md:text-base cursor-pointer hover:bg-gray-800 transition-colors"
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
            className="py-2 px-3 md:px-4 bg-purple-800 hover:bg-purple-700 transition-all duration-300 text-white rounded-lg text-sm md:text-base shadow-md hover:shadow-lg whitespace-nowrap"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home Page" : "Search Movies"}
          </button>
          <button
            onClick={handleSignOut}
            className="py-2 px-3 md:px-4 bg-red-600 hover:bg-red-700 transition-all duration-300 text-white rounded-lg text-sm md:text-base font-bold shadow-md hover:shadow-lg whitespace-nowrap"
          >
            LogOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
