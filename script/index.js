// const urlCovidWorld = "https://disease.sh/v3/covid-19/historical/all?lastdays=all";
const urlVN = "https://disease.sh/v3/covid-19/historical/vn?lastdays=all";
const urlCovidVN = "https://api.zingnews.vn/public/v2/corona/getChart";
const urlCovidProvinceVN = "https://api.zingnews.vn/public/v2/corona/getChart?type=province";
const urlVaccineVN = "https://api.zingnews.vn/public/v2/corona/getChart?type=vaccination";
const urlNews = "https://gw.vnexpress.net/ar/get_rule_2?category_id=1004765&limit=50&page=1&data_select=title,share_url,thumbnail_url,lead,publish_time"

const chooseTotal = document.querySelector('.choose-total');
const chooseDay = document.querySelector('.choose-day');

const infoVaccine1 = document.querySelector('.info-vaccine1');
const infoVaccine2 = document.querySelector('.info-vaccine2');
const infoDeath = document.querySelector('.info-death');
const inputProvince = document.querySelector('.search-input input');

let vnSeason4, vnSeason4Daily, vaccineFirst, vaccineSecond, deaths, casesProvince;
let chartCovidVN, chartVaccineVN, chartDeathVN;

const getDataFromURL = async(url) => {
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const today = new Date();
let strToday = `Ngày ${today.getDate()}/${today.getMonth()}/${today.getYear()} ${today.getHours()}:${today.getSeconds()}`
document.querySelector('.today').textContent = strToday;

const setCovidChart = (data) => {
    const colorTick = "#ef4444";
    const colorLine = "#f87171";
    const ctxCovidVN = document.getElementById("covidVN").getContext("2d");
    const infoCovid = document.querySelector(".info-covid");

    if(chartCovidVN) chartCovidVN.destroy();

    const dataCovidVN = {
        datasets: [
            {
                label: "Ca nhiễm",
                data: data.cases,
                borderColor: colorLine,
                borderWidth: 3,
                fill: false,
                pointRadius: 0,
                hoverRadius: 8,
                hitRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: "top",
            },
            tooltip: {
                // enabled: false,
                titleColor: "black",
                titleAlign: "center",
                titleSpacing: 12,
                titleMarginBottom: 12,
                backgroundColor: "white",
                bodyColor: "red",
                bodySpacing: 12,
                padding: 12,
                boxPadding: 6,
                borderColor: "black",
                borderWidth: 0.5,
                callbacks: {
                    title: function (context) {
                        const title = context[0].label;
                        const newTitle = `Ngày ${moment(title).format(
                            "DD/MM/YYYY"
                        )}`;
                        return newTitle;
                    },
                },
            },
        },
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day",
                    displayFormats: {
                        day: "DD/MM/YY",
                    },
                },
                ticks: {
                    source: "auto",
                    maxRotation: 0,
                    autoSkipPadding: 8,
                    color: colorTick,
                    maxTicksLimit: 6,
                    font: {
                        size: 9,
                        // weight: "600",
                    },
                },
                grid: {
                    borderWidth: 2,
                    borderColor: colorTick,
                    tickColor: colorTick,
                    display: false,
                },
                offset: true,
            },
            y: {
                min: 0,
                position: "right",
                ticks: {
                    color: colorTick,
                    callback: function (value, index, ticks) {
                        return `${value / 1000000}M`;
                    },
                    font: {
                        size: 9,
                        // weight: "600",
                    },
                    maxTicksLimit: 5,
                },
                grid: {
                    borderWidth: 2,
                    borderColor: colorTick,
                    tickColor: colorTick,
                    display: false,
                },
            },
        },
    };

    chartCovidVN = new Chart(ctxCovidVN, {
        type: "line",
        data: dataCovidVN,
        options,
    });

    infoCovid.querySelector("p").textContent = `+${numberWithCommas(
        data.toDay
    )}`;
    infoCovid.querySelector("p:nth-child(2)").textContent = `${numberWithCommas(
        data.total
    )}`;
};

const setVaccineChart = (first, second) => {
    if(chartVaccineVN) chartVaccineVN.destroy();

    const colorTick = '#22c55e';
    const colorLine1 = '#4ade80';
    const colorLine2 = '#34d399';

    const ctxVaccineVN = document.getElementById("vaccineVN").getContext("2d");

    const dataVaccineVN = {
        datasets: [
            {
                label: "Mũi 1",
                // data: first.datas.map(vaccine => (
                // {
                //     x: vaccine.x,
                //     y: vaccine.z
                // })),
                data: first,
                borderColor: colorLine1,
                borderWidth: 3,
                fill: false,
                pointRadius: 0,
                hoverRadius: 8,
                hitRadius: 8,
            },
            {
                label: "Mũi 2",
                // data: second.datas.map(vaccine => (
                // {
                //     x: vaccine.x,
                //     y: vaccine.z
                // })),
                data: second,
                borderColor: colorLine2,
                borderWidth: 3,
                fill: false,
                pointRadius: 0,
                hoverRadius: 8,
                hitRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: "top",
            },
            tooltip: {
                // enabled: false,
                titleColor: "black",
                titleAlign: "center",
                titleSpacing: 12,
                titleMarginBottom: 12,
                backgroundColor: "white",
                bodyColor: "red",
                bodySpacing: 12,
                padding: 12,
                boxPadding: 6,
                borderColor: "black",
                borderWidth: 0.5,
                callbacks: {
                    title: function (context) {
                        const title = context[0].label;
                        const newTitle = `Ngày ${moment(title).format(
                            "DD/MM/YYYY"
                        )}`;
                        return newTitle;
                    },
                },
            },
        },
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day",
                    displayFormats: {
                        day: "DD/MM/YY",
                    },
                },
                ticks: {
                    source: "auto",
                    maxRotation: 0,
                    autoSkipPadding: 8,
                    color: colorTick,
                    maxTicksLimit: 6,
                    font: {
                        size: 9,
                        // weight: "600",
                    },
                },
                grid: {
                    borderWidth: 2,
                    borderColor: colorTick,
                    tickColor: colorTick,
                    display: false,
                },
                offset: true,
            },
            y: {
                min: 0,
                position: "right",
                ticks: {
                    color: colorTick,
                    callback: function (value, index, ticks) {
                        return `${value / 1000000}M`;
                    },
                    font: {
                        size: 9,
                        // weight: "600",
                    },
                    maxTicksLimit: 5,
                },
                grid: {
                    borderWidth: 2,
                    borderColor: colorTick,
                    tickColor: colorTick,
                    display: false,
                },
            },
        },
    };

    chartVaccineVN = new Chart(ctxVaccineVN, {
        type: "line",
        data: dataVaccineVN,
        options,
    });
}

const setDeathChart = (data) => {
    const colorTick = '#737373';
    const colorLine = '#a3a3a3';
    const ctxDeathVN = document.getElementById("deathVN").getContext("2d");

    if(chartDeathVN) chartDeathVN.destroy();

    const dataDeathVN = {
        datasets: [
            {
                label: "Tử vong",
                data,
                borderColor: colorLine,
                borderWidth: 3,
                fill: false,
                pointRadius: 0,
                hoverRadius: 8,
                hitRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: "top",
            },
            tooltip: {
                // enabled: false,
                titleColor: "black",
                titleAlign: "center",
                titleSpacing: 12,
                titleMarginBottom: 12,
                backgroundColor: "white",
                bodyColor: "red",
                bodySpacing: 12,
                padding: 12,
                boxPadding: 6,
                borderColor: "black",
                borderWidth: 0.5,
                callbacks: {
                    title: function (context) {
                        const title = context[0].label;
                        const newTitle = `Ngày ${moment(title).format(
                            "DD/MM/YYYY"
                        )}`;
                        return newTitle;
                    },
                },
            },
        },
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day",
                    displayFormats: {
                        day: "DD/MM/YY",
                    },
                },
                ticks: {
                    source: "auto",
                    maxRotation: 0,
                    autoSkipPadding: 8,
                    color: colorTick,
                    maxTicksLimit: 6,
                    font: {
                        size: 9,
                        // weight: "600",
                    },
                },
                grid: {
                    borderWidth: 2,
                    borderColor: colorTick,
                    tickColor: colorTick,
                    display: false,
                },
                offset: true,
            },
            y: {
                min: 0,
                position: "right",
                ticks: {
                    color: colorTick,
                    callback: function (value, index, ticks) {
                        return `${value / 1000}K`;
                    },
                    font: {
                        size: 9,
                        // weight: "600",
                    },
                    maxTicksLimit: 5,
                },
                grid: {
                    borderWidth: 2,
                    borderColor: colorTick,
                    tickColor: colorTick,
                    display: false,
                },
            },
        },
    };

    chartDeathVN = new Chart(ctxDeathVN, {
        type: "line",
        data: dataDeathVN,
        options,
    });
}

const setChartTotal = () => {
    chooseTotal.classList.add('bg-gray-200');
    chooseDay.classList.remove('bg-gray-200');

    setCovidChart(vnSeason4);
    setVaccineChart(
        vaccineFirst.datas.map(vaccine => ({
            x: vaccine.x,
            y: vaccine.z
        })), vaccineSecond.datas.map(vaccine => ({
            x: vaccine.x,
            y: vaccine.z
        }))
    )
    setDeathChart(
        Object.keys(deaths).map((key) => ({
            x: key,
            y: deaths[key],
        }))
    );
}

const setChartDay = () => {
    chooseDay.classList.add('bg-gray-200');
    chooseTotal.classList.remove('bg-gray-200');

    setCovidChart(vnSeason4Daily);
    setVaccineChart(
        vaccineFirst.datas.map(vaccine => ({
            x: vaccine.x,
            y: vaccine.y
        })), vaccineSecond.datas.map(vaccine => ({
            x: vaccine.x,
            y: vaccine.y
        }))
    )

    let prevKey;
    setDeathChart(
        Object.keys(deaths).map(key => {
            const y = deaths[key] - (prevKey ? deaths[prevKey] : 0);
            prevKey = key;
            return {
                x: key,
                y
            }
        })

    )
}

const setCovidProvince = (target, data) => {
    if(target !== "") {
        data = data.filter(province => {
            return province.x.toUpperCase().indexOf(target.toUpperCase()) > -1;
            // return comparison;
        })
    }
    const tableBody = document.querySelector('#covidProvinceVN tbody');

    tableBody.innerHTML='';
    data.forEach((province, id) => {
        const item = document.createElement('tr');
        item.className = 'group cursor-default';
        item.innerHTML = `
        <td class="p-3 bg-gray-100 border-4 text-gray-600 border-white rounded-xl group-hover:bg-gray-200 font-medium">${province.x}</td>
        <td class="p-3 bg-gray-50 border-4 border-white rounded-xl group-hover:bg-gray-200 text-right text-red-500"> <span class="-mt-1"><i class="ph-arrow-up-bold"></i></span>${province.y}</td>
        <td class="p-3 bg-gray-50 border-4 border-white rounded-xl group-hover:bg-gray-200 text-right text-gray-500"> ${province.z}</td>
        `

        tableBody.appendChild(item);
    })

}

const searchProvince = (e) => {
    if(e.code === "Enter") {
        const target = e.target.value;
        setCovidProvince(target, casesProvince);
    }
}

chooseTotal.addEventListener('click', setChartTotal);
chooseDay.addEventListener('click', setChartDay);
inputProvince.addEventListener('keypress', searchProvince)

Promise.all([
    getDataFromURL(urlCovidVN),
    getDataFromURL(urlVaccineVN),
    getDataFromURL(urlVN),
    getDataFromURL(urlCovidProvinceVN)
]).then(( [dataCovid, dataVaccine, dataVN, dataCovidProvince] ) => {
    vnSeason4 = dataCovid.data.vnSeason4;
    vnSeason4Daily = dataCovid.data.vnSeason4Daily;

    vaccineFirst = dataVaccine.data.first;
    vaccineSecond = dataVaccine.data.second;

    deaths = dataVN.timeline.deaths;

    casesProvince = dataCovidProvince.data.cases;

    infoVaccine1.querySelector('p').textContent = `+${numberWithCommas(vaccineFirst.datas[vaccineFirst.datas.length-1].y)}`;
    infoVaccine1.querySelector('p:nth-child(2)').textContent = numberWithCommas(vaccineFirst.total);

    infoVaccine2.querySelector('p').textContent = `+${numberWithCommas(vaccineSecond.datas[vaccineSecond.datas.length-1].y)}`;
    infoVaccine2.querySelector('p:nth-child(2)').textContent = numberWithCommas(vaccineSecond.total);

    const today = Object.keys(deaths)[Object.keys(deaths).length-1];
    const yesterday = Object.keys(deaths)[Object.keys(deaths).length-2];
    infoDeath.querySelector('p').textContent = `+${numberWithCommas(deaths[today] - deaths[yesterday])}`;
    infoDeath.querySelector('p:nth-child(2)').textContent = numberWithCommas(deaths[today]);

    setChartTotal();
    setCovidProvince("", casesProvince);
})