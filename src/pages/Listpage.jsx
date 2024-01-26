import React, { useEffect, useState } from "react";
import {
  TiWeatherPartlySunny,
  TiWeatherSnow,
  TiWeatherSunny,
} from "react-icons/ti";
import {
  clearLocation,
  getinitialWheatherData,
} from "../redux/features/weatherSlice";
import { useDispatch, useSelector } from "react-redux";

import { BsCloudHaze2Fill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { TbCloudFog } from "react-icons/tb";
import { useSpeechSynthesis } from "react-speech-kit";

const Listpage = ({ propFilter }) => {
  const [filter, setfilter] = useState("");
  const dispatch = useDispatch();
  const locations = useSelector(
    (state) => state.rootReducer.wheatherSlice.data.locations
  );
  const loading = useSelector(
    (state) => state.rootReducer.wheatherSlice.loading
  );

  useEffect(() => {
    setfilter(propFilter.toUpperCase());
  }, [propFilter]);
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

  const requiredCities = [
    "Nashik",
    "Jaipur",
    "Nellore",
    "Lucknow",
    "Kochi",
    "Chandigarh",
  ];

  const getCitiesWeatherData = () => {
    dispatch(clearLocation());
    for (const v of requiredCities) {
      dispatch(getinitialWheatherData(v));
    }
  };

  useEffect(() => {
    getCitiesWeatherData();
  }, []);

  const Skeletoncard = () => {
    return (
      <>
        <div className="w-full bg-white rounded-md px-4 py-5 mb-2">
          <div className="animate-pulse">
            <h3 className="w-[4rem] h-2 bg-slate-700 rounded-md "></h3>
            <div className="flex justify-between mt-5">
              <div className="w-16 h-12 flex flex-col gap-4">
                <h2 className="w-[8rem] h-2 bg-slate-700 rounded-md"></h2>
                <h3 className="w-[3rem] h-2 bg-slate-700 rounded-md "></h3>
                <h3 className="w-[2rem] h-2 bg-slate-700 rounded-md "></h3>
              </div>
              <div className="w-14 h-14">
                <div className="w-10 h-10 rounded-full bg-slate-700"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const WeatherCard = ({ data }) => {
    const { speak } = useSpeechSynthesis();

    return (
      <Link
        onClick={() => speak({ text: data.name })}
        to={`/weather/${data.name}`}
      >
        <div
          className={`w-full bg-white rounded-md p-4 mb-3 md:w-full`}
          // className={`w-full bg-[url(${
          //   weatherStyle?.[data.weather[0].main].bg
          // })] rounded-md p-4 mb-3 md:w-full`}
        >
          <div>
            <div className="flex w-full justify-between">
              <p className="text-lg md:base font-bold text-slate-800">
                {data.name}
              </p>
            </div>

            <div className="flex justify-between items-center mt-3">
              <div className="flex flex-col gap-1">
                <p className="text-slate-800 font-medium text-base md:text-xs">
                  {formattedDateDisplay(new Date())}
                </p>

                <p className="text-base font-bold text-emerald-500">
                  {" "}
                  {data.main.temp} &deg; C
                </p>
                <p className="text-base font-semibold text-slate-800">
                  {" "}
                  {data.weather[0].main}
                </p>
              </div>
              <div className="w-14 h-14">
                {weatherStyle[data.weather[0].main]?.icon}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div>
      <div className="p-3 flex md:hidden w-full justify-between items-center gap-1 bg-slate-100 shadow-lg rounded-md">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setfilter(e.target.value.toUpperCase())}
          className="outline-none bg-transparent font-semibold text-slate-700 text-base"
        />
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="1.5em"
          width="1.5em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M456.69 421.39 362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3zM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8 124.95 124.95 0 0 1-124.8-124.8z"></path>
        </svg>
      </div>
      <div className="w-full mt-3 h-[85vh] overflow-y-scroll  md:grid md:grid-rows-3 lg:grid-rows-2 md:grid-flow-col md:gap-4 ">
        {/* <div className="md:grid md:grid-rows-3 lg:grid-rows-2 md:grid-flow-col md:gap-4 "> */}
        {loading &&
          Array(3)
            .fill(0)
            .map(() => <Skeletoncard />)}

        {!loading &&
          locations.length > 0 &&
          locations
            .filter((elm, idx) => elm.name.toUpperCase().includes(filter))
            .map((elm, idx) => <WeatherCard data={elm} />)}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Listpage;
