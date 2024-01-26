import {
  TiWeatherPartlySunny,
  TiWeatherSnow,
  TiWeatherSunny,
} from "react-icons/ti";
import { formattedDateDisplay, speak } from "../utils/constants";

import { Link } from "react-router-dom";
import { TbCloudFog } from "react-icons/tb";
import { WiDayHaze } from "react-icons/wi";

// import { useSpeechSynthesis } from "react-speech-kit";

const WeatherCard = ({ data }) => {
  // const { speak } = useSpeechSynthesis();

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
      icon: <WiDayHaze className="w-12 h-12 " />,
    },
    Mist: {
      bg: "./mist.jpg",
      icon: <TiWeatherSnow className="w-12 h-12 " />,
    },
  };

  return (
    <Link onClick={() => speak(data.name)} to={`/weather/${data.name}`}>
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

export default WeatherCard;
