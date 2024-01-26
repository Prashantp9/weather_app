import React, { useEffect } from "react";
import {
  clearLocation,
  getinitialWheatherData,
} from "../redux/features/weatherSlice";
import { useDispatch, useSelector } from "react-redux";

import Skeletoncard from "./Skeletoncard";
import WeatherCard from "./Weathercard";

const Favourite = () => {
  const dispatch = useDispatch();
  const locations = useSelector(
    (state) => state.rootReducer.wheatherSlice.data.locations
  );
  const loading = useSelector(
    (state) => state.rootReducer.wheatherSlice.loading
  );

  const getCitiesWeatherData = () => {
    const favoriteCity = JSON.parse(localStorage.getItem("favorite"));
    dispatch(clearLocation());
    if (favoriteCity.length > 0) {
      for (const v of favoriteCity) {
        dispatch(getinitialWheatherData(v));
      }
    }
  };

  useEffect(() => {
    getCitiesWeatherData();
  }, []);

  return (
    <div className="w-full mt-3 h-[85vh] md:h-fit overflow-y-scroll  md:grid md:grid-rows-3 lg:grid-rows-2 md:grid-flow-col md:gap-4 ">
      {/* <div className="md:grid md:grid-rows-3 lg:grid-rows-2 md:grid-flow-col md:gap-4 "> */}
      {loading &&
        Array(3)
          .fill(0)
          .map(() => <Skeletoncard />)}

      {!loading &&
        locations.length > 0 &&
        locations.map((elm, idx) => <WeatherCard data={elm} />)}
    </div>
  );
};

export default Favourite;
