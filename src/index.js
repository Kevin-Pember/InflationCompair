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
    console.log(e.target.type);
    let targetEl = e.target;
    let ticker = targetEl.dataset.ticker;
    let tabClon = document.getElementsByClassName("newTab")[0].content.cloneNode(true);
    tabClon.getElementById('tabButton').innerHTML = "<h3>" + ticker + "</h3><img id='tabRemove' src='Images/xIconWhite.png' width='31.5px'>";
    tabClon.getElementById('tabButton').dataset.ticker = ticker;
    let highlight = tabClon.getElementById('tabButton');
    tabClon.getElementById('tabButton').addEventListener("click", function (e) {
        if(e.target.id != "tabRemove"){
            highlightTab(highlight);
        }
    });
    tabClon.getElementById('tabRemove').addEventListener('click', function (e) {
        console.log("Remove Tab")
        tabLink = e.target.parentElement;
        console.log(e.target);
        document.getElementById('mainBody').removeChild(matchTab(tabLink.dataset.ticker, false));
        document.getElementById('tab').removeChild(tabLink);
        console.log('Switching to main');
        document.getElementById('mainTab').style.backgroundColor = displayColor;
        document.getElementById('MainContent').style.visibility = 'visible';
    })
    document.getElementById('tab').appendChild(tabClon);
    let tab = document.getElementsByClassName('custFuncTabTemp')[0].content.cloneNode(true);
    tab.getElementById('customFuncTab').dataset.ticker = ticker;
    document.getElementById('mainBody').appendChild(tab);
    highlightTab(highlight);
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
function openElement(evt) {
    console.log("element is ")
    console.log(evt)
    let evtElement = evt;
    console.log(evtElement.dataset.tabmap)
    let match;
    let tabs = document.getElementsByClassName('tabcontent');
    document.getElementById('customFuncDisplay').style.visibility = "";
    match = matchTab(evtElement.dataset.ticker, false);
    console.log(evtElement.dataset.ticker);
    for (let i = 0; i < tabs.length; i++) {
        if (match != tabs[i]) {
            tabs[i].style.visibility = 'hidden';
        }
    }
    highlightTab(evtElement);
    match.style.visibility = 'visible';
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