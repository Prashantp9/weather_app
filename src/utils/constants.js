// import {
//   TiWeatherPartlySunny,
//   TiWeatherSnow,
//   TiWeatherSunny,
// } from "react-icons/ti";

// import { BsCloudHaze2Fill } from "react-icons/bs";
// import { TbCloudFog } from "react-icons/tb";

// export const weatherStyle = {
//   Clouds: {
//     bg: "./clear.jpg",
//     icon: <TiWeatherPartlySunny className="w-12 h-12 " />,
//   },
//   Fog: {
//     bg: "./clear.jpg",
//     icon: <TbCloudFog className="w-12 h-12 " />,
//   },
//   Clear: {
//     bg: "./clear.jpg",
//     icon: <TiWeatherSunny className="w-12 h-12 " />,
//   },
//   Haze: {
//     bg: "./clear.jpg",
//     icon: <BsCloudHaze2Fill className="w-12 h-12 " />,
//   },
//   Mist: {
//     bg: "./mist.jpg",
//     icon: <TiWeatherSnow className="w-12 h-12 " />,
//   },
// };

export function formattedDateDisplay(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString("en-US", options);
}

const speak = (text) => {
  const value = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(value);
};

export { speak };
