import { Link, useLocation } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import React, { useEffect } from "react";
import {
  TiWeatherPartlySunny,
  TiWeatherSnow,
  TiWeatherSunny,
} from "react-icons/ti";
import {
  clearLocation,
  getinitialWheatherData,
  wheatherMoreInfo,
} from "../redux/features/weatherSlice";
import { useDispatch, useSelector } from "react-redux";

import { BsCloudHaze2Fill } from "react-icons/bs";
import { TbCloudFog } from "react-icons/tb";
import { useSpeechSynthesis } from "react-speech-kit";
import { useState } from "react";

const MoreInfo = () => {
  const [update, setUpdate] = useState(false);
  const locations = useSelector(
    (state) => state.rootReducer.wheatherSlice.data.locations
  );

  const loading = useSelector(
    (state) => state.rootReducer.wheatherSlice.loading
  );
  const getNearbycities = {
    Nashik: ["Thana", "Ahmadnagar", "Dhule", "Surat"],
    Jaipur: ["Naraina", "Bandikul", "Ajmer", "Kota", "Mathura", "Agra"],
    Nellore: ["Venkatagiri", "Sulurpeta", "Singarayakonda", "Rajampet"],
    Lucknow: ["Zaidpur", "Allahabad", "Etawah", "Bareilly", "Gorakhpur"],
    Kochi: ["Ernakulam", "Vaikam", "Nedumbassery", "Elur"],
    Chandigarh: [
      "Patiala",
      "Yamunanagar",
      "Ludhiana",
      "Saharanpur",
      "Jalandhar",
    ],
  };

  const location = useLocation();
  const dispatch = useDispatch();
  const cityData = useSelector(
    (state) => state.rootReducer.wheatherSlice.data.currentMoreInfo
  );

  const getCitiesWeatherData = () => {
    dispatch(clearLocation());
    if (getNearbycities?.[location.pathname.split("/")[2]]) {
      for (const v of getNearbycities?.[location.pathname.split("/")[2]]) {
        dispatch(getinitialWheatherData(v));
      }
    }
  };

  const SkeletonContainer = () => {
    return (
      <>
        <div className="w-full h-full  bg-white  rounded-md py-2">
          <div className="animate-pulse  flex flex-col gap-3 items-center ">
            <p className="text-lg font-semibold h-2 w-12 bg-slate-700 rounded-md"></p>
            <div className="bg-slate-700 w-10 h-10 rounded-full"></div>
            <p className="bg-slate-700 w-8 h-2 rounded-md"></p>
            <p className="bg-slate-700 w-7 h-2 rounded-md"></p>
          </div>
        </div>
      </>
    );
  };

  const weatherStyle = {
    Clouds: {
      bg: "./clear.jpg",
      icon: <TiWeatherPartlySunny className="w-12 h-12 " />,
    },
    Fog: {
      bg: "./clear.jpg",
      icon: <TbCloudFog className="w-12 h-12 " />,
    },
    Clear: {
      bg: "./clear.jpg",
      icon: <TiWeatherSunny className="w-12 h-12 " />,
    },
    Haze: {
      bg: "./clear.jpg",
      icon: <BsCloudHaze2Fill className="w-12 h-12 " />,
    },
    Mist: {
      bg: "./mist.jpg",
      icon: <TiWeatherSnow className="w-12 h-12 " />,
    },
    Smoke: {
      bg: "./mist.jpg",
      icon: <TiWeatherSnow className="w-12 h-12 " />,
    },
  };

  function formattedDateDisplay(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(date).toLocaleDateString("en-US", options);
  }

  const { speak } = useSpeechSynthesis();
  const favourite = (cityName) => {
    return {
      add: () => {
        const favoriteListString = localStorage.getItem("favorite");
        const favoriteList = favoriteListString
          ? JSON.parse(favoriteListString)
          : [];
        if (!favoriteList.includes(cityName)) {
          favoriteList.push(cityName);
          localStorage.setItem("favorite", JSON.stringify(favoriteList));
          setUpdate(!update);
        }
      },
      delete: () => {
        const favoriteListString = localStorage.getItem("favorite");
        const favoriteList = JSON.parse(favoriteListString);
        const newarr = favoriteList?.filter((elm, idx) => elm !== cityName);
        localStorage.setItem("favorite", JSON.stringify(newarr));
        setUpdate(!update);
      },
      isFav: () => {
        const favoriteListString = localStorage.getItem("favorite");
        const favoriteList = JSON.parse(favoriteListString);
        if (favoriteList?.includes(cityName)) {
          return true;
        } else {
          return false;
        }
      },
    };
  };

  useEffect(() => {
    dispatch(wheatherMoreInfo(location?.pathname?.split("/")?.[2]));
    getCitiesWeatherData();
  }, [location]);
  return (
    <div className="min-h-screen flex flex-col justify-start">
      <div className="w-full h-[50vh]">
        <div className="flex flex-col bg-white rounded p-4 w-full h-full">
          <div className="flex flex-col md:flex md:flex-row md:justify-between ">
            <div className="w-full md:w-[50%]">
              <div className="w-full flex justify-between">
                <div className="font-bold text-xl md:text-center">
                  {cityData?.name}
                </div>
                {favourite(cityData.name).isFav() ? (
                  <MdFavorite
                    onClick={() => favourite(cityData.name).delete()}
                    className="w-5 h-5"
                  />
                ) : (
                  <MdFavoriteBorder
                    onClick={() => favourite(cityData.name).add()}
                    className="w-5 h-5"
                  />
                )}
              </div>

              <div className="text-sm text-gray-500 md:text-center">
                {formattedDateDisplay(new Date())}
              </div>
              <div className="flex w-full justify-center items-center">
                <div className="mt-6 text-6xl self-center flex items-center justify-center rounded-lg text-indigo-600 h-20 w-24">
                  <svg
                    className="w-32 h-32"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex flex-row items-end justify-center mt-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="font-medium text-xl">
                    {cityData?.main?.temp} &deg; C
                  </div>
                  <div>{cityData?.weather?.[0]?.main}</div>

                  <i className="text-xs">
                    {" "}
                    {cityData?.weather?.[0]?.description}
                  </i>
                </div>

                <div className="flex flex-col items-center ml-6">
                  <div className="mt-1">
                    <span className="text-sm">
                      <i className="far fa-long-arrow-up mr-2">max temp</i>
                    </span>
                    <span className="text-sm font-light text-gray-500">
                      {cityData?.main?.temp_max} &deg; C
                    </span>
                  </div>
                  <div>
                    <span className="text-sm">
                      <i className="far fa-long-arrow-down mr-2">min temp</i>
                    </span>
                    <span className="text-sm font-light text-gray-500">
                      {cityData?.main?.temp_min} &deg; C
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center items-center pt-4">
                <p className="text-sm text-slate-600 font-semibold">
                  feels like {cityData?.main?.feels_like} &deg; C
                </p>
              </div>
            </div>

            <div className="w-full md:w-[50%] justify-center items-center">
              <div className="flex flex-row md:flex-col md:gap-10 justify-between md:justify-evenly mt-6">
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Wind</div>
                  <div className="text-sm text-gray-500">
                    {cityData?.wind?.speed} k/h
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Humidity</div>
                  <div className="text-sm text-gray-500">
                    {cityData?.main?.humidity} %
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Visibility</div>
                  <div className="text-sm text-gray-500">
                    {cityData?.visibility / 1000} km
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`w-full flex flex-col gap-2 overflow-y-scroll md:grid grid-rows-2 md:grid-rows-2 mdgrid-flow-col md:gap-4 py-2`}
      >
        {!loading && locations.length > 0 && (
          <p className="text-lg font-semibold text-black md:hidden">
            Nearby cities
          </p>
        )}
        {loading &&
          Array(3)
            .fill(0)
            .map(() => <SkeletonContainer />)}
        {!loading &&
          locations.length > 0 &&
          locations?.map((elm, idx) => (
            <>
              <Link
                onClick={() => speak({ text: elm.name })}
                to={`/weather/${elm?.name}`}
              >
                <div className="w-full bg-white h-full rounded-md flex flex-col gap-3 items-center py-2">
                  <p className="text-lg font-semibold text-slate-600">
                    {elm.name}
                  </p>
                  {weatherStyle[elm.weather?.[0].main]?.icon}
                  <p className="text-sm text-slate-600">
                    {elm.weather?.[0].main}
                  </p>
                  <p className="text-base font-medium text-slate-600">
                    {" "}
                    {elm.main.temp} &deg; C
                  </p>
                </div>
              </Link>
            </>
          ))}
      </div>
    </div>
  );
};

export default MoreInfo;
