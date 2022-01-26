initPage();
var benchROR = [];
console.log("%cStarting Shit", 'color: green;');
if (localStorage.getItem('apiKey') != null) {
    stock = new Stocks(localStorage.getItem('apiKey'));
} else {
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
    stock = new Stocks(localStorage.getItem('apiKey'));
    document.getElementById('enterPrompt').style.visibility = 'hidden';
});
document.getElementById('exitAdd').addEventListener('click', function (e) {
    document.getElementById('enterPrompt').style.visibility = 'hidden';
});
// = new Stocks('NI9FLNUKRBMDU47J');
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
var stockTicker;
function initPage(){
    var apiUrl = 'https://www.statbureau.org/get-data-jsonp?jsoncallback=?';
    let array = [];
    let rates = [];
    let dates = [];
        $.getJSON(apiUrl, {
                country: 'united-states',
                format: true
            })
              .done(function (data) {
                  let target = new Date();
                  let stringDate = (target.getFullYear()-5) + '-' + addZero(target.getMonth() + 1) + '-01';
                  for(let obj of data){
                    let rate = obj.InflationRateFormatted;
                    let date = obj.MonthFormatted;
                    if(date != stringDate){
                    array.unshift({
                        "rate": rate,
                        "date": date
                    })
                    rates.unshift(rate);
                    dates.unshift(date);
                    }else {
                        break;
                    }
                  }
              });
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
function tickerClicked(e) {
    let target = e.target;
    for(let i = 1; i < 0; i++){
        if(target.nodeName != 'BUTTON'){
            target = target.parentNode;
        }else {
            break;
        }
    }
    console.log(target.style.backgroundColor)
    if(target.style.backgroundColor == 'rgb(56, 56, 56)'){
        let tickerPrices = target.dataset.prices;
        let tickerName = target.dataset.id;
        //remove data placeholder
        target.style.backgroundColor = '#686868';
    }else{
        let tickerPrices = target.dataset.prices;
        let tickerName = target.dataset.id;
        console.log(tickerPrices);
        addDatas(tickerName,tickerPrices);
        target.style.backgroundColor = '#383838';
    }

}
function addDatas(label, data) {
    let chart = stockTicker;
    chart.data.datasets.push({

    });
    chart.update();
}
/*async function setGraph(askReturned, returned, timeInvr, chart, symbol, invr, start, end) {
    var options = {
        symbol: symbol,
        interval: invr,
        start: new Date(start),
        end: new Date(end)
    }
    var data = await stock.timeSeries(options);
    let closes = [];
    let dates = [];
    for (let week of data) {
        closes.unshift(week.close);
        let rawDate = week.date.toString();
        let date = rawDate.substring(rawDate.indexOf(' ') + 1, 15);
        dates.unshift(date);
    }
    console.log("dates: " + dates.length)
    console.log(timeInvr.children[3].innerHTML);
    if (closes.length >= 1258) {
        timeInvr.children[3].innerHTML = "5y";
    } else {
        timeInvr.children[3].innerHTML = "Max";
    }
    let chartColor = calculateColor(closes);

    setReturned(closes, returned, chartColor);
    setAskReturned(closes, askReturned, chartColor);
    let stockTicker = new Chart(chart, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                data: closes,
                label: 'Price',
                fontColor: '#FFFFFF',
                borderColor: chartColor,
                backgroundColor: chartColor,
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
    timeInvr.children[0].addEventListener('click', function (e) {
        removeData(stockTicker);
        changedCloses = closes.slice(closes.length - 7, closes.length);
        changedDates = dates.slice(dates.length - 7, dates.length);
        let chartColor = calculateColor(changedCloses);
        setReturned(changedCloses, returned, chartColor);
        setAskReturned(changedCloses, askReturned, chartColor);
        addData(stockTicker, changedDates, changedCloses, chartColor);
    });
    timeInvr.children[1].addEventListener('click', function (e) {
        removeData(stockTicker);
        changedCloses = closes.slice(closes.length - 30, closes.length);
        changedDates = dates.slice(dates.length - 30, dates.length);
        let chartColor = calculateColor(changedCloses);
        setReturned(changedCloses, returned, chartColor);
        setAskReturned(changedCloses, askReturned, chartColor);
        addData(stockTicker, changedDates, changedCloses, chartColor);
    });
    timeInvr.children[2].addEventListener('click', function (e) {
        removeData(stockTicker);
        changedCloses = closes.slice(closes.length - 365, closes.length);
        changedDates = dates.slice(dates.length - 365, dates.length);
        let chartColor = calculateColor(changedCloses);
        setReturned(changedCloses, returned, chartColor);
        setAskReturned(changedCloses, askReturned, chartColor);
        addData(stockTicker, changedDates, changedCloses, chartColor);
    });
    timeInvr.children[3].addEventListener('click', function (e) {
        removeData(stockTicker);
        let chartColor = calculateColor(closes);
        setReturned(closes, returned, chartColor);
        setAskReturned(closes, askReturned, chartColor);
        addData(stockTicker, dates, closes, chartColor);
    });
}*/
function setReturned(closes, returned, chartColor) {
    if (chartColor == "#ff3300") {
        returned.style = "color: #ff3300; ";
        let value = String(closes[0] - closes[closes.length - 1]);
        returned.innerHTML = "-" + value.substring(0, value.indexOf('.') + 3);
    } else {
        returned.style = "color: #33cc33;";
        let value = String(closes[closes.length - 1] - closes[0]);
        returned.innerHTML = "+" + value.substring(0, value.indexOf('.') + 3);
    }
}
function setAskReturned(closes, askReturned, chartColor) {
    let value = String(closes[closes.length - 1] / closes[0] - 1);
    if (chartColor == "#ff3300") {
        askReturned.style = "color: #ff3300;";
        askReturned.innerHTML = value.substring(0, value.indexOf('.') + 5) + "%";
    } else {
        askReturned.style = "color: #33cc33;";
        askReturned.innerHTML = "+" + value.substring(0, value.indexOf('.') + 5) + "%";
    }

}
function calculateColor(closes) {
    if (closes[0] > closes[closes.length - 1]) {
        return "#ff3300";
    } else {
        return "#33cc33";
    }
}
function addData(chart, label, data, color) {
    chart.data.labels = label;
    chart.data.datasets.forEach((dataset) => {
        dataset.data = data;
        dataset.borderColor = color;
        dataset.backgroundColor = color;
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels = [];
    chart.data.datasets.forEach((dataset) => {
        dataset.data = [];
        dataset.borderColor = [];
        dataset.backgroundColor = [];
    });
    chart.update();
}
function tickerTabInit(tag) {
    let tab = document.getElementsByClassName('custFuncTabTemp')[0].content.cloneNode(true);
    tab.getElementById('customFuncTab').dataset.ticker = tag;
    tab.getElementById('tickerTag').innerHTML = tag;
    //Gets Dates 
    let d = new Date();
    let pastDate = d.getFullYear() - 5 + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    let currentDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    let chart = tab.getElementById('charta').getContext('2d');
    let timeInvr = tab.getElementById('timeInvr');
    let returned = tab.getElementById('returned');
    let askReturned = tab.getElementById('askedReturned');
    setGraph(askReturned, returned, timeInvr, chart, tag, "daily", pastDate, currentDate);

    return tab;
}
/*function createTicker(tickerName) {
    let temp = document.getElementsByClassName("customFuncTemplate")[0], clon = temp.content.cloneNode(true), targetEl = document.getElementById("funcGrid");
    clon.getElementById("customFuncButton").innerHTML = "<h2>" + tickerName + "</h2>";
    clon.getElementById('customFuncButton').dataset.ticker = tickerName;
    clon.getElementById('customFuncButton').dataset.dates =
        clon.getElementById('customFuncButton').addEventListener("click", function (e) {
            tickerClicked(e);
        });
    clon.getElementById('customFuncButton').id = tickerName;
    targetEl.appendChild(clon);
}*/
function createOrderedTicker(tickerName, Dates, Prices) {
    let temp = document.getElementsByClassName("customFuncTemplate")[0], clon = temp.content.cloneNode(true), targetEl = document.getElementById("funcGrid");
    clon.getElementById("buttonTitle").innerHTML =  tickerName;
    clon.getElementById('tickerDiv').dataset.ticker = tickerName;
    clon.getElementById('tickerDiv').dataset.dates = Dates
    clon.getElementById('tickerDiv').dataset.prices = Prices
    clon.getElementById('customFuncButton').addEventListener("click", function (e) {
        tickerClicked(e);
    });
    clon.getElementById('customFuncButton').id = tickerName;
    let past = new Date();
    past.setFullYear(past.getFullYear() - 1);
    //console.log("Working on " + tickerName);
    //let fill = backfill(Dates,Prices,past);
    //Dates = fill[0];
    //Prices = fill[1];
    let tracking = trackingError(Prices);
    let returnOf =  Prices[Prices.length - 1]-Prices[0];
    let actualReturn =  returnOf / tracking;
    let returnedString = ""+actualReturn;
    clon.getElementById('return').innerHTML = returnedString.substring(0, returnedString.indexOf('.') + 3) + "%";
    if(returnedString.charAt(0) == "-"){
        clon.getElementById('downArrow').style.visibility = "visible";
    }else {
        clon.getElementById('upArrow').style.visibility = "visible";
    }
    clon.getElementById('tickerDiv').dataset.return = actualReturn;
    findPOS(actualReturn, clon);
}
function findPOS(returnOf, element){
    let targetEl = document.getElementById("funcGrid");
    let otherETFs = document.getElementsByClassName('tickerTag');
    let position
    let got = false;
    if(otherETFs != null){
        position = otherETFs.length-1;
    }else {
        position = otherETFs.length;
    }
    for(let i = 0; i < otherETFs.length; i++){
        if(otherETFs[i].dataset.return < returnOf){
            position = i;
            got = true;
            break;
        }
    }
    if(got){
        targetEl.insertBefore(element, otherETFs[position]);
    }else {
        targetEl.appendChild(element);
    }
}
function backfill(Dates, Prices, targetDate) {
    let today = new Date();
    let closeDate = closestDate(Dates, parseYear(targetDate));
    let past = new Date(closeDate[0]);
    past.setDate(past.getDate() + 1);
    let index = closeDate[1];
    for(let i = index; i < Dates.length; i++){
        if(Dates[i] != parseYear(past)){
            console.log("%c Date Unexpected Found", "color: red;");
            Dates.splice(i-1, 0, past);
            Prices.splice(i-1, 0, Prices[i-1]);
            break;
        }
        past.setDate(past.getDate() + 7);
    }
    return [Dates, Prices];
}
function trackingError(prices){
    let squaredPrice = 0.0;
    let secondary = prices;
    let first = prices[0];
    prices.shift();
    for(let price of prices){
        squaredPrice += Math.pow((price-first), 2);
    }
    return Math.sqrt(squaredPrice / secondary.length);
}
function closestDate(Dates, targetDate) {
    let index = 0;
    let loops = 0;
    while (!Dates.includes(targetDate)) {
        targetDate = targetDate.substring(0, targetDate.length - 2) + addZero(parseInt(targetDate.substring(targetDate.length - 2)) + 1);
        loops++;
        if (loops > 30) {
            console.log("%c Loop error code didn't work", 'color: red;');
            return "err";
        }
    }
    return [targetDate, Dates.indexOf(targetDate)];
}
function addZero(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}
function parseYear(date) {
    return date.getFullYear() + "-" + addZero(date.getMonth() + 1) + "-" + addZero(date.getDate());
}
function highlightTab(element) {
    console.log(functionColor + " & " + displayColor);
    let activeTabs = document.getElementsByClassName('tablinks')
    let activeTabPages = document.getElementsByClassName('tabcontent')
    for (let i = 0; i < activeTabs.length; i++) {
        activeTabs[i].style.backgroundColor = functionColor;
        matchTab(activeTabs[i].dataset.ticker, false).style.visibility = 'hidden';
    }
    element.style.backgroundColor = displayColor;
    console.log(matchTab(element.dataset.ticker, false));
    matchTab(element.dataset.ticker, false).style.visibility = 'visible';
}
function matchTab(info, type) {
    let elements = [];
    if (type) {
        elements = document.getElementsByClassName('tablinks');
    } else {
        elements = document.getElementsByClassName('tabcontent');
    }
    for (let i = 0; i < elements.length; i++) {
        if (type) {
            if (elements[i].dataset.ticker == info) {
                return elements[i];
            }
        } else {
            if (elements[i].dataset.ticker == info) {
                return elements[i];
            }
        }
    }
}
