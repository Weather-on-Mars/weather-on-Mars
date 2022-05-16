const API_URL =
  "https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json";

const currentSolElement = document.querySelector("[data-current-sol]");
const currentDateElement = document.querySelector("[data-current-date]");
const currentTempHighElement = document.querySelector(
  "[data-current-temp-high]"
);
const currentTempLowElement = document.querySelector("[data-current-temp-low]");

//3. Section General Info about Weather Mars

const highestTempElement = document.querySelector("[data-highest-temp]");
const lowestTempElement = document.querySelector("[data-lowest-temp]");
const highestTempDateElement = document.querySelector("[data-highest-date]");
const lowestTempDateElement = document.querySelector("[data-lowest-date]");
const averageTempElement = document.querySelector("[data-avg-temp]");
const percSunnyElement = document.querySelector("[data-register-count]");
const numberRecordElement = document.querySelector("[data-records]");
const firstRecordElement = document.querySelector("[data-first-register]");

let selectedSolIndex;
getWeatherRaw().then((sols) => {
  selectedSolIndex = 0;
  //console.log(sols);
  displaySelected(sols);
  extremeTemp(sols);
});

function displaySelected(sols) {
  const selectedSol = sols[selectedSolIndex];
  //console.log(selectedSol);
  currentSolElement.innerHTML = selectedSol.sol;
  currentDateElement.innerHTML = displayDate(selectedSol.date);
  currentTempHighElement.innerHTML = displayTemperature(selectedSol.maxTemp);
  currentTempLowElement.innerHTML = displayTemperature(selectedSol.minTemp);
}

function displayDate(date) {
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function displayCurveDate(date) {
  return date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

function displayTemperature(temperature) {
  return Math.round(temperature);
}

function displayPressure(pressure) {
  return Math.round(pressure);
}

function getWeatherRaw() {
  return fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      const { description, soles, ...solData } = data;
      //console.log(solData);
      return Object.entries(soles).map(([sol, data]) => {
        return {
          sol: data.sol,
          id: data.id,
          maxTemp: data.max_temp,
          minTemp: data.min_temp,
          atmoOpacity: data.atmo_opacity,
          pressure: data.pressure,
          pressString: data.pressure_string,
          date: new Date(data.terrestrial_date),
          sunrise: data.sunrise,
          sunset: data.sunset,
          irradience: data.local_uv_irradiance_index,
        };
      });
    });
}

/*1. Average Min
      if (val.min_temp !== "--") {
        sumMinTemp += Number(val.min_temp);
        countTempMin += 1;
      } else if (val.min_temp === "--") {
        countTempMinNull += 1;
      }
     
      if (val.max_temp !== "--") {
        sumMaxTemp += Number(val.max_temp);
        countTempMax += 1;
      }
      //console.log(val.min_temp);
    });
    console.log(sumMinTemp);
    //3. Calculus Avg Max and Min
    let ratioTempMin = sumMinTemp / countTempMin;
    let ratioTempMax = sumMaxTemp / countTempMax;
    console.log(ratioTempMin, ratioTempMax);*/

//2. Using date chosen by the user

const searchSolElement = document.querySelector("[data-result-sol]");
const searchDateElement = document.querySelector("[data-result-date]");
const searchTempHighElement = document.querySelector("[data-result-temp-high");
const searchTempLowElement = document.querySelector("[data-result-temp-low]");

function processDate(busqueda) {
  var search = document.getElementById(busqueda).value;
  console.log(typeof search);
  console.log(search);

  getWeatherRaw().then((sols) => {
    console.log(typeof sols);
    let i = 0;
    let sameString = sols[i].date.toISOString().substring(0, 10);
    console.log(sameString, search);

    while (sameString !== search) {
      console.log(sameString, search);
      i++;
      sameString = sols[i].date.toISOString().substring(0, 10);
      console.log(sameString, search);
    }

    searchSolElement.innerHTML = sols[i - 1].sol;
    searchDateElement.innerHTML = displayDate(sols[i - 1].date);
    searchTempHighElement.innerHTML = displayTemperature(sols[i - 1].maxTemp);
    searchTempLowElement.innerHTML = displayTemperature(sols[i - 1].minTemp);
  });
}

function extremeTemp(sols) {
  let min = sols[0].minTemp;
  let max = sols[0].maxTemp;
  let lowestDate;
  let highestDate;

  let sumMin = 0;
  let sumMax = 0;
  let countMin = 0;
  let countMax = 0;
  let sum, count, averageTemp;
  let countSunny = 0;
  let countSunnyNull = 0;
  let countTotalSunny, perceSunny;

  let countHigherPressure = 0;
  let countLowerPressure = 0;
  let countModeratePressure = 0;
  //console.log(sols[0].minTemp, sols[0].maxTemp);
  let i;

  for (i = 0; i <= sols.length - 1; i++) {
    if (sols[i].minTemp < min && sols[i].minTemp !== "--") {
      min = sols[i].minTemp;
      lowestDate = sols[i].date;
      countMin++;
      sumMin = +sols[i].minTemp;
    }

    if (sols[i].maxTemp > max && sols[i].maxTemp !== "--") {
      max = sols[i].maxTemp;
      highestDate = sols[i].date;
      countMax++;
      sumMax = +sols[i].maxTemp;
    }

    if (sols[i].pressString !== "Higher" && sols[i].pressString !== "--") {
      console.log(sols[i].pressString);
    }

    if (sols[i].atmoOpacity !== "Sunny" && sols[i].atmoOpacity !== "--") {
      console.log(sols[i].atmoOpacity);
    }

    if (sols[i].atmoOpacity === "Sunny") {
      countSunny++;
    }

    if (sols[i].atmoOpacity === "--" || sols[i].atmoOpacity !== "Sunny") {
      countSunnyNull++;
    }

    countTotalSunny = countSunny + countSunnyNull;
  }
  /** Final results  */
  sum = sumMin + sumMax;
  count = countMin + countMax;
  averageTemp = (sum / count).toFixed(0);
  console.log(min, max);
  console.log(countSunny, countSunnyNull);
  countTotalSunny = countSunny + countSunnyNull;
  perceSunny = ((countSunny / countTotalSunny) * 100).toFixed(2);
  lowestTempElement.innerHTML = min;
  highestTempElement.innerHTML = max;
  highestTempDateElement.innerHTML = displayDate(highestDate);
  lowestTempDateElement.innerHTML = displayDate(lowestDate);
  averageTempElement.innerHTML = averageTemp;
  percSunnyElement.innerHTML = perceSunny;

  numberRecordElement.innerHTML = countTotalSunny;
  firstRecordElement.innerHTML = displayDate(sols[sols.length - 4].date);
}

// 4. Graphs: Histogram for Pressure Lower, Higher

const ctx1 = document.getElementById("myHistoPressure");

getWeatherRaw().then((sols) => {
  let countHigherPressure = 0;
  let countLowerPressure = 0;
  let countModeratePressure = 0;

  let i;

  for (i = 0; i <= sols.length - 1; i++) {
    if (sols[i].pressString !== "--" && sols[i].pressString === "Higher") {
      countHigherPressure++;
    }
    if (sols[i].pressString !== "--" && sols[i].pressString === "Lower") {
      countLowerPressure++;
    }

    if (sols[i].pressString !== "--" && sols[i].pressString === "Moderate") {
      countModeratePressure++;
    }

    console.log(sols[i].irradience);
  }

  const myChart = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["Higher", "Lower"],
      datasets: [
        {
          label: "Frequency of Level of Pressure",
          data: [countHigherPressure, countLowerPressure],
          backgroundColor: [
            "rgba(255, 99, 132, 0.4)",

            "rgba(255, 159, 64, 0.4)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 159, 64, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

/* 5. Graphs: Histogram for Irradiance Index
Low
Moderate
High
VeryHigh
*/

const ctx2 = document.getElementById("myIrradianceIndex");

getWeatherRaw().then((sols) => {
  let countLowIrrad = 0;
  let countModerateIrrad = 0;
  let countHighIrrad = 0;
  let countVeryHighIrrad = 0;

  let i;

  for (i = 0; i <= sols.length - 1; i++) {
    if (sols[i].irradience !== "--" && sols[i].irradience === "Low") {
      countLowIrrad++;
    }
    if (sols[i].irradience !== "--" && sols[i].irradience === "Moderate") {
      countModerateIrrad++;
    }

    if (sols[i].irradience !== "--" && sols[i].irradience === "High") {
      countHighIrrad++;
    }

    if (sols[i].irradience !== "--" && sols[i].irradience === "Very_High") {
      countVeryHighIrrad++;
    }
  }

  const myChart = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: ["Low", "Moderate", "High", "Very High"],
      datasets: [
        {
          label: "Irradiance Ultra Violet Index",
          data: [
            countLowIrrad,
            countModerateIrrad,
            countHighIrrad,
            countVeryHighIrrad,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.4)",
            "rgba(54, 162, 235, 0.4)",
            "rgba(255, 206, 86, 0.4)",
            "rgba(75, 192, 192, 0.4)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

/*6. Temperature Curves*/

const ctx3 = document.getElementById("myCurves");

getWeatherRaw().then((sols) => {
  let xTime = [];
  let yMinTemp = [];
  let yMaxTemp = [];

  let i;

  for (i = sols.length - 1; i >= 0; i--) {
    yMinTemp.push(sols[i].minTemp);
    yMaxTemp.push(sols[i].maxTemp);
    xTime.push(displayCurveDate(sols[i].date));
  }

  const myChart = new Chart(ctx3, {
    type: "line",
    data: {
      labels: xTime,
      datasets: [
        {
          label: "Minimum Temperature Curve °C",
          data: yMinTemp,
          backgroundColor: ["rgba(54, 162, 235, 0.4)"],
          /*borderColor: ["rgba(54, 162, 235, 1)"]*/
          borderWidth: 1,
        },
        {
          label: "Maximum Temperature Curve °C",
          data: yMaxTemp,
          backgroundColor: ["rgba(255, 99, 132, 0.4)"],
          /*borderColor: ["rgba(255, 99, 132, 1)"]*/
          borderWidth: 1,
        },
      ],
    },

    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
});

/*6. Temperature Curves*/

const ctx4 = document.getElementById("myPressure");

getWeatherRaw().then((sols) => {
  let xTime = [];
  let yPressure = [];

  let i;

  for (i = sols.length - 1; i >= 0; i--) {
    yPressure.push(sols[i].pressure);
    xTime.push(displayCurveDate(sols[i].date));
  }

  const myChart = new Chart(ctx4, {
    type: "line",
    data: {
      labels: xTime,
      datasets: [
        {
          label: "Pressure Curve (Pascal)",
          data: yPressure,
          backgroundColor: ["rgba(54, 162, 235, 0.4)"],
          /*borderColor: ["rgba(54, 162, 235, 1)"]*/
          borderWidth: 1,
        },
      ],
    },

    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
});
