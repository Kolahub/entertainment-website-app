// import React from 'react'
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllEntertainmentData } from "../store/bookmarkDataActions";
import EntertainmentItems from "../components/EntertainmentItems";
import PageLoader from "../components/PageLoader";

function Series() {
  const dispatch = useDispatch()
  const entertainmentdata = useSelector((state) => state.entertainmentData);
  const series = entertainmentdata.filter((el) => el.category === "TV Series");

  useEffect(() => {
    dispatch(getAllEntertainmentData())
  }, [dispatch])
  return (
    <section className="flex flex-col lg:flex-row" id="Series">
      <Sidebar />
      <div className="font-custom w-full text-white pl-5 sm:pl-8 lg:pl-0 pt-8 sm:pt-3 lg:pt-16 overflow-x-hidden">
        <Search placeholder="TV series" />
        {
          entertainmentdata.length > 0 ?
        <EntertainmentItems title='TV series' entertainment={series} /> :
          <PageLoader />
        }
      </div>
    </section>
  );
}

export default Series;

export async function Loader() {
  const res = await fetch("/data.json");
  return res;
}
