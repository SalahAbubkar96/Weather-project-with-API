import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";

// MATERIAL UI COMPONENTS
import { Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

// EXTERNAL LIBRARIES
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { changeResult } from "./features/weather/weatherApiSlice";
import { featchWeather } from "./features/weather/weatherApiSlice";
moment.locale("ar");
// REACT
import { useEffect, useState } from "react";
const thems = createTheme({
  typography: {
    fontFamily: ["ALMR"],
  },
});

let cancelAxios = null;

export default function weather() {
  const dispatch = useDispatch();


  const isLoding = useSelector((state) => {
    return state.weather.isLoding;
  });

  const temp = useSelector((state)=>{
    return state.weather.weather
  })

  const { t, i18n } = useTranslation();
  //State
  const [dateAndTime, setdateAndTime] = useState("");

  const [local, setLocal] = useState("ar");
  const dirt = local == "ar" ? "rtl" : "ltr";

  // EVENT HANDLERS
  function handelclik() {
    if (local == "en") {
      setLocal("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocal("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setdateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }

  useEffect(() => {
    // dispatch(changeResult())
    console.log("featchWeather in the cmponet");
    dispatch(featchWeather());
    i18n.changeLanguage(local);
  }, []);

  useEffect(() => {
    setdateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
 
  }, []);
  return (
    <>
      {/* CONTENT && CONTAINER*/}
      <div
        className="apps"
        style={{
          width: "500px",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/*Card */}
        <div
          className="div"
          dir={dirt}
          style={{
            background:
              "linear-gradient(115deg, rgba(167, 45, 45, 0.1),rgba(181, 29, 29, 0))",
            backdropfilter: "blur(5px)",
            webkitbackdrop: "blur(5px)",

            width: "100%",
            color: "#e3f2fd",

            padding: "10px",
            borderRadius: "15px",
            boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
          }}
        >
          {/*CONTENT */}
          <div>
            {/*CITY && TIME */}
            <div
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
              }}
              dir={dirt}
            >
              <Typography
                variant="h4"
                style={{ marginRight: "20px", fontWeight: "600" }}
              >
                {t("Al-Hofuf")}
              </Typography>
              <Typography variant="h5" style={{ marginRight: "20px" }}>
                {dateAndTime}
              </Typography>
            </div>
            {/*===CITY && TIME===*/}
            <hr />
            {/*CONTANER OF DEGREE + CLOUD ICON*/}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {/*DEGREE && DESCRIPTION */}
              <div>
                {/*TEMP */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isLoding ? (
                    <CircularProgress style={{ color: "white" }}/>
                      
                    
                  ) : (
                    ""
                  )}
                  <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>

                  {/* TODO: TEMP IMAGE */}
                  <img src={temp.icon} style={{}} />

                  {/* ===TODO: TEMP IMAGE==*/}
                </div>
                {/*===TEMP===*/}
                <Typography variant="h6" style={{}}>
                  {t(temp.description)}
                </Typography>
                {/* MIN & MAX*/}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h5>
                    {" "}
                    {t("min")} : {temp.min}
                  </h5>
                  <h5 style={{ margin: "7px " }}> | </h5>
                  <h5>
                    {t("max")} : {temp.max}
                  </h5>
                </div>
                {/* ==MIN & MAX==*/}
              </div>
              {/*===DEGREE && DESCRIPTION===*/}
              <CloudIcon style={{ fontSize: "200px" }} />
            </div>
            {/*=====CONTANER OF DEGREE + CLOUD ICON====*/}
          </div>

          {/*===CONTENT===*/}
        </div>
        {/*===Card==*/}
        {/*BUTTON LANGUAGE*/}
        <div
          dir={dirt}
          style={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
            marginTop: "14px",
          }}
        >
          <Button
            style={{ color: "#e3f2fd" }}
            variant="text"
            onClick={handelclik}
          >
            {local == "en" ? " عربي" : "ENGLISH"}
          </Button>
        </div>
        {/*===BUTTON LANGUAGE===*/}
      </div>
      {/*===CONTENT && ===CONTAINER*/}
    </>
  );
}
