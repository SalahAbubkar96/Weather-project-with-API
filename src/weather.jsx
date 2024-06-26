import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";

// MATERIAL UI COMPONENTS
import { Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

// EXTERNAL LIBRARIES
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  //State
  const [dateAndTime, setdateAndTime] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });
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
    i18n.changeLanguage(local);
  }, []);

  useEffect(() => {
    setdateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=23.56&lon=45.56&appid=e270c4af5bf8653bfbcb5c1777ab1735",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const responsTemp = Math.round(response.data.main.temp - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;

        console.log(max, min, description);
        setTemp({
          number: responsTemp,
          description: description,
          min: min,
          max: max,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      console.log("canceling");
      cancelAxios();
    };
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
