var stock;
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
document.getElementById('settingsCogIcon').addEventListener('click', function (e) {
    document.getElementById('enterPrompt').style.visibility = 'visible';
    document.getElementById('newLinkText').value = localStorage.getItem('apiKey');
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
console.log("hello")
for (let ticker of tickers) {
    createTicker(ticker);
}
function searchChange(e) {
    let targetEl = e.target;
    let gridContainer = document.getElementById("funcGrid");
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    for (let item of tickers) {
        console.log(item);
        if (item.search(targetEl.value) != -1) {
            createTicker(item);
        }
    }
}
function tickerClicked(e) {
    console.log("Stock element is");
    console.log(stock);
    var targetEl = e.target;
    if (e.target.tagName == "H2") {
        targetEl = e.target.parentElement;
    }
    let ticker = targetEl.dataset.ticker;
    let tabClon = document.getElementsByClassName("newTab")[0].content.cloneNode(true);
    tabClon.getElementById('tabButton').innerHTML = "<h3>" + ticker + "</h3><img id='tabRemove' src='Images/xIconWhite.png' width='31.5px'>";
    tabClon.getElementById('tabButton').dataset.ticker = ticker;
    let highlight = tabClon.getElementById('tabButton');
    tabClon.getElementById('tabButton').addEventListener("click", function (e) {
        if (e.target.id != "tabRemove") {
            highlightTab(highlight);
        }
    });
    tabClon.getElementById('tabRemove').addEventListener('click', function (e) {
        console.log("Remove Tab")
        tabLink = e.target.parentElement;
        console.log(e.target);
        let thisTab = false;
        if (matchTab(tabLink.dataset.ticker).style.visibility == "visible") {
            thisTab = true;
        }
        document.getElementById('mainBody').removeChild(matchTab(tabLink.dataset.ticker, false));
        document.getElementById('tab').removeChild(tabLink);
        console.log('Switching to main');
        if (thisTab) {
            document.getElementById('mainTab').style.backgroundColor = displayColor;
            document.getElementById('MainContent').style.visibility = 'visible';
        }
    })
    document.getElementById('tab').appendChild(tabClon);
    let tab = tickerTabInit(ticker);
    document.getElementById('mainBody').appendChild(tab);
    highlightTab(highlight);
}
async function setGraph(askReturned, returned, timeInvr, chart, symbol, invr, start, end) {
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
}
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
    console.log("start date: " + pastDate + " end date: " + currentDate);
    setGraph(askReturned, returned, timeInvr, chart, tag, "daily", pastDate, currentDate);
    console.log(typeof data);

    return tab;
}
function createTicker(tickerName) {
    let temp = document.getElementsByClassName("customFuncTemplate")[0], clon = temp.content.cloneNode(true), targetEl = document.getElementById("funcGrid");
    clon.getElementById("customFuncButton").innerHTML = "<h2>" + tickerName + "</h2>";
    clon.getElementById('customFuncButton').dataset.ticker = tickerName;
    clon.getElementById('customFuncButton').addEventListener("click", function (e) {
        tickerClicked(e);
    });
    targetEl.appendChild(clon);
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