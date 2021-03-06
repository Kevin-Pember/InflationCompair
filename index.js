var benchROR = [];
let TextColorGlobal = "#FFFFFF";
let displayColor = getComputedStyle(document.body).getPropertyValue('--displayColor');
let functionColor = getComputedStyle(document.body).getPropertyValue('--functionsColor');
const tickers = [
    'CPI',
    'THY',
    'FCPI',
    'RAAX',
    'RINF',
    'LQDI',
    'STIP',
    'PBTP',
    'SCHP',
    'GTIP',
    'VTIP',
    'SPIP',
    'TIP',
    'TIPX',
    'IVOL',
    'VBND',
    'WIP',
    'SEIAX',
    'DVRAX',
    'TUNIX',
    'VCMDX',
    'FIFGX',
    'PCRIX',
    'PRRSX',
    'MLPDX',
    'PRNEX',
    'FIKDX',
    'MRJAX',
    'RASAX',
    'PSPFX',
    'FLIIX',
    'USAGX',
    'USERX',
    'MIDSX',
    'LIFAX',
    'TXRAX',
    'DRXIX',
    'EARRX',
    'DMREX',
    'AUNAX',
    'DCARX',
    'MMLDX',
    'APOAX',
    'ABNAX',
    'ACITX',
    'PRAIX',
    'FXIRX',
    'MPSAX',
    'FIPDX',
    'FBUIX',
    'RRPAX',
    'SWRSX',
    'VTAPX',
    'FSIPX',
    'VIPSX',
    'BKIPX',
    'PQTSX',
    'SRAAX',
    'SHTIX',
    'BPRAX',
    'RRFAX',
    'MXIOX',
    'DIPSX',
    'MXEGX',
    'PRRIX',
    'GSAPX',
    'TCILX',
    'TILUX',
    'HIPAX',
    'TPRTX',
    'LSGSX',
    'WAIIX',
    'JIMAX',
    'NIFAX',
    'MIAAX',
    'BFIAX',
    'TIOAX',
    'TRBFX',
    'PRIPX',
    'USIAX',
    'DFIHX',
    'HCPBX',
    'DFXIX',
    'IRBAX',
    'WHOSX',
    'TLDTX',
    'RCSTX',
    'TSUMX',
    'ACMTX',
    'HRLAX',
    'WMRIX',
    'DPRSX',
    'CARFX',
    'PRDAX',
    'FSRRX',
    'CARPX',
    'LRRAX',
    'CABNX',
    'PZRMX',
    'TPDAX',
    'USCRX',
    'CARJX',
    'SIFAX',
    'CAAHX',
];
var stockAPIKey = "";
if (localStorage.getItem('apiKey') != null) {
    stockAPIKey = localStorage.getItem('apiKey');
} else {
    stopLoading();
    document.getElementById('enterPrompt').style.visibility = 'visible';
    document.getElementById('exitAdd').style.visibility = 'hidden';
    document.getElementById('apiLink').style.visibility = 'visible';
}
document.getElementById('addButton').addEventListener('click', function (e) {
    if (localStorage.getItem('apiKey') != null) {
    } else {
        document.getElementById('exitAdd').style.visibility = "inherit";
        document.getElementById('apiLink').style.visibility = 'hidden';
    }
    localStorage.setItem('apiKey', document.getElementById('newLinkText').value);
    initPage();
    document.getElementById('enterPrompt').style.visibility = 'hidden';
    window.location.reload();
});
document.getElementById('exitAdd').addEventListener('click', function (e) {
    document.getElementById('enterPrompt').style.visibility = 'hidden';
});

var stockTicker;
function getKey() {
    if (localStorage.getItem('apiKey') != null) {
        return localStorage.getItem('apiKey')
    }
}
function CSVToArray(strData) {
    let indexOfDataStart = strData.indexOf('"data":[');
    let indexOfDataEnd = strData.indexOf('],"collapse"');
    strData = strData.substring(indexOfDataStart + 8, indexOfDataEnd);
    let array = [];
    while (strData.length > 0) {
        let full = findObject(strData);
        console.log(full)
        let object = full[0];
        let date = full[1];
        let indexOfBackBraket = full[2];
        array.push(object);
        let d = new Date();
        d.setFullYear(d.getFullYear() - 2);
        if (date.includes(d.getFullYear() + "-" + addZero(d.getMonth() + 1))) {
            strData = strData.substring(indexOfBackBraket + 1, strData.length);
            let object = findObject(strData);
            array.push(object[0]);
            break;
        }
        strData = strData.substring(indexOfBackBraket + 1, strData.length);
    }
    console.log(array);
    return array;
}
function findObject(string) {
    let indexOfFrontBraket = string.indexOf('[');
    let indexOfBackBraket = string.indexOf(']');
    let targetString = string.substring(indexOfFrontBraket + 1, indexOfBackBraket);
    let date = targetString.substring(1, targetString.indexOf(',') - 1);
    let value = Number(targetString.substring(targetString.indexOf(',') + 1, targetString.length));
    return [{
        "date": date,
        "value": value
    }, date, indexOfBackBraket];
}
function inflationCSV(string) {
    console.log(CSVToArray(string));
}
//The method ran when the page is loaded. It gets the inflaction rate during the last two years
function initPage(rawArray) {
    var apiUrl = 'https://www.statbureau.org/get-data-jsonp?jsoncallback=?';
    let array = [];
    let rates = [];
    let prices = [];
    let dates = [];

    let inflationData = CSVToArray(rawArray).reverse();
    for (let i = 1; i < inflationData.length; i++) {
        let init = inflationData[i - 1].value;
        let curr = inflationData[i].value;
        let percent = (curr - init) / Math.abs(init) * 100;
        rates.push(percent);
        prices.push(Number(inflationData[i].value));
        dates.push(inflationData[i].date);
    }
    let chart = document.getElementById('graph');
    stockTicker = new Chart(chart, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                data: rates,
                label: 'Rate',
                fontColor: '#FFFFFF',
                borderColor: "#FFFFFF",
                backgroundColor: "#FFFFFF",
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                point: {
                    radius: 0
                }
            },
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                    }
                }
            }
        }
    })
}
//This function hids the loading screen when called
function stopLoading() {
    document.getElementById('loadingDIV').style.visibility = 'hidden';
}
//shows error messages based on wheather the there are already stock elements loaded or not when called
function showError() {
    document.getElementById('loadingWheel').style.visibility = "hidden";
    let tickers = document.getElementsByClassName('tickerTag')
    let message = "";
    if (tickers.length == 0) {
        message = "No tickers found, please disable CORS. \n Links to extensions <a href='https://addons.mozilla.org/en-US/firefox/search/?q=cors'>Mozilla</a> & <a href='https://chrome.google.com/webstore/search/cors'>Chrome</a>";
    } else {
        message = "Wait then refresh, there was an error loading data ";
    }
    document.getElementById('loadingDIV').innerHTML = "<h3 id='loadingError'>" + message + "</h3>";
}
//function responsible for the behavor of the ticker buttons when clicked
function tickerClicked(e) {
    let target = e.target;
    console.log(target.nodeName);
    let whiel = true
    while(whiel) {
        if (target.nodeName == 'BUTTON') {
            break;
            
        } else {
            target = target.parentNode;
        }
    }
    console.log(target);
    if (target.style.backgroundColor === 'rgb(56, 56, 56)') {
        let tickerPrices = target.dataset.prices;
        let tickerName = target.id;
        removeDatas(tickerName)
        target.style.backgroundColor = '#686868';
    } else {
        let tickerPrices = target.dataset.prices.split(',');
        let tickerName = target.id;
        let tickerDates = target.dataset.dates.split(',');
        addDatas(tickerName, tickerPrices, tickerDates);
        target.style.backgroundColor = '#383838';
    }

}
//takes the data from a ticker and calculate the % change in the price and adds it to the graph
function addDatas(label, data, dates) {
    let rates = [];
    for (let i = 1; i < data.length; i++) {
        let init = Number(data[i - 1]);
        let curr = Number(data[i]);
        let percent = (curr - init) / Math.abs(init) * 100;
        rates.push(percent);
    }
    let chart = stockTicker;
    let color = calculateColor(data);
    //chart.data.labels = dates;
    let contains = indexDatas(label);
    if (contains == -1) {
        chart.data.datasets.push({
            data: rates,
            label: label + "(% change)",
            fontColor: '#FFFFFF',
            borderColor: color,
            backgroundColor: color,
        });
        chart.update();
    }
}
//takes a ticker name and removes the dataset object from the chart
function removeDatas(label) {
    let chart = stockTicker;
    chart.data.datasets.splice(indexDatas(label), 1)
    chart.update();
}
//finds the index of a dataset object based on the ticker name
function indexDatas(ticker) {
    let chart = stockTicker;
    for (let i = 0; i < chart.data.datasets.length; i++) {
        if (chart.data.datasets[i].label == ticker + "(% change)") {
            return i;
        }
    }
    return -1;
}
//finds what color a dataset should be labeled base on the return
function calculateColor(closes) {
    if (closes[0] > closes[closes.length - 1]) {
        return "#ff3300";
    } else {
        return "#33cc33";
    }
}
//method that initializes a ticker, finds weather it has made a profit (then displaying an icon for either), and adds it to the page based on the return
function createOrderedTicker(tickerName, Dates, Prices) {
    let temp = document.getElementsByClassName("customFuncTemplate")[0], clon = temp.content.cloneNode(true), targetEl = document.getElementById("funcGrid");
    clon.getElementById("buttonTitle").innerHTML = tickerName;
    clon.getElementById('tickerDiv').dataset.ticker = tickerName;
    clon.getElementById('customFuncButton').dataset.dates = Dates
    clon.getElementById('customFuncButton').dataset.prices = Prices
    clon.getElementById('customFuncButton').addEventListener("click", function (e) {
        tickerClicked(e);
    });
    clon.getElementById('customFuncButton').id = tickerName;
    let past = new Date();
    past.setFullYear(past.getFullYear() - 1);
    let tracking = trackingError(Prices);
    let returnOf = Prices[Prices.length - 1] - Prices[0];
    let actualReturn = returnOf / tracking;
    let returnedString = "" + actualReturn;
    clon.getElementById('return').innerHTML = returnedString.substring(0, returnedString.indexOf('.') + 3) + "%";
    if (returnedString.charAt(0) == "-") {
        clon.getElementById('downArrow').style.visibility = "visible";
    } else {
        clon.getElementById('upArrow').style.visibility = "visible";
    }
    clon.getElementById('tickerDiv').dataset.return = actualReturn;
    findPOS(actualReturn, clon);
}
//method which finds the position of a ticker based on the return and adds it to the element
function findPOS(returnOf, element) {
    let targetEl = document.getElementById("funcGrid");
    let otherETFs = document.getElementsByClassName('tickerTag');
    let position
    let got = false;
    if (otherETFs != null) {
        position = otherETFs.length - 1;
    } else {
        position = otherETFs.length;
    }
    for (let i = 0; i < otherETFs.length; i++) {
        if (otherETFs[i].dataset.return < returnOf) {
            position = i;
            got = true;
            break;
        }
    }
    if (got) {
        targetEl.insertBefore(element, otherETFs[position]);
    } else {
        targetEl.appendChild(element);
    }
}
//deprecated method that was used to fill in missing data due to errors in the API data call
function backfill(Dates, Prices, targetDate) {
    let today = new Date();
    let closeDate = closestDate(Dates, parseYear(targetDate));
    let past = new Date(closeDate[0]);
    past.setDate(past.getDate() + 1);
    let index = closeDate[1];
    for (let i = index; i < Dates.length; i++) {
        if (Dates[i] != parseYear(past)) {
            Dates.splice(i - 1, 0, past);
            Prices.splice(i - 1, 0, Prices[i - 1]);
            break;
        }
        past.setDate(past.getDate() + 7);
    }
    return [Dates, Prices];
}
//method used for finding the tracking error of a ETF
function trackingError(prices) {
    let squaredPrice = 0.0;
    let secondary = prices;
    let first = prices[0];
    prices.shift();
    for (let price of prices) {
        squaredPrice += Math.pow((price - first), 2);
    }
    return Math.sqrt(squaredPrice / secondary.length);
}
//deprecated method that was used to find the closest date in the API dataset to a given date
function closestDate(Dates, targetDate) {
    let index = 0;
    let loops = 0;
    while (!Dates.includes(targetDate)) {
        targetDate = targetDate.substring(0, targetDate.length - 2) + addZero(parseInt(targetDate.substring(targetDate.length - 2)) + 1);
        loops++;
        if (loops > 30) {
            return "err";
        }
    }
    return [targetDate, Dates.indexOf(targetDate)];
}
//method used to add a zero to a date if it is less than 10 in order to match formating of API data
function addZero(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}
//method used to parse a date variable type into a date in the API format and a string
function parseYear(date) {
    return date.getFullYear() + "-" + addZero(date.getMonth() + 1) + "-" + addZero(date.getDate());
}
