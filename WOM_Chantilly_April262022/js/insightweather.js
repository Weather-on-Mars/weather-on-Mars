const API_URL =
  "https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0";

const currentSolElement = document.querySelector("[data-current-sol]");
const currentDateElement = document.querySelector("[data-current-date]");

const currentTempHighElement = document.querySelector(
  "[data-current-temp-high]"
);
const currentTempLowElement = document.querySelector("[data-current-temp-low]");

const windSpeedElement = document.querySelector("[data-wind-speed]");
const windCardinalElement = document.querySelector("[data-wind-cardinal]");

let sumaryDays = document.querySelector("[last-day]");

let selectedSolIndex;

//0. Principal Function and its descendents
weatherInsight().then((sols) => {
  //console.log(sols);
  selectedSolIndex = sols.length - 1;
  displayHtmlSelectedSol(sols);
  sumaryDays.innerHTML = sevenDays(sols);
});

// 1. Principal Function using Fetch Method whichs connects with JSON data
function weatherInsight() {
  return fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      const { sol_keys, validity_checks, ...solData } = data;
      // console.log(solData);

      return Object.entries(solData).map(([sol, data]) => {
        return {
          sol: sol,
          maxTemp: data.AT.mx,
          minTemp: data.AT.mn,
          windSpeed: data.HWS.av,
          windDirectionalCardinal: data.WD.most_common.compass_point,
          date: new Date(data.First_UTC),
        };
      });
    });
}

//2. Function required for display of the last data from Insight Lander

function displayHtmlSelectedSol(sols) {
  const selectedSol = sols[selectedSolIndex];
  currentSolElement.innerHTML = selectedSol.sol;
  currentDateElement.innerHTML = displayDate(selectedSol.date);
  currentTempHighElement.innerHTML = displayTemperature(selectedSol.maxTemp);
  currentTempLowElement.innerHTML = displayTemperature(selectedSol.minTemp);
  windSpeedElement.innerHTML = displayWindSpeed(selectedSol.windSpeed);
  windCardinalElement.innerHTML = selectedSol.windDirectionalCardinal;
}

//2.a SubFunction for Display Date

function displayDate(date) {
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

//2.b Rounding Data for Temperature

function displayTemperature(temp) {
  return Math.round(temp);
}

//2.c Rounding Wind Speed

function displayWindSpeed(windSpeed) {
  return windSpeed.toFixed(1);
}

//3. Function display the Seven Last Days

function sevenDays(sols) {
  let division = "";
  for (let i = 0; i <= sols.length - 1; i++) {
    division += `<div >
      <h3>Sol : <span>${sols[i].sol}</span></h3>
      <p><span>${displayDate(sols[i].date)}</span></p>
      <p>Max: <span>${displayTemperature(sols[i].maxTemp)}</span>°C</p>
      <p>Min: <span>${displayTemperature(sols[i].minTemp)}</span>°C</p>
      <p>Speed Wind:<span>${displayTemperature(
        displayWindSpeed(sols[i].windSpeed)
      )}</span> kph</p>
      </div>`;
  }

  return division;
}
