#Python script to run a url fetch to get API data which then parses it for the javscript methods
        #from browser import document, window
import urllib.request
import time
import json
import csv

tickers = ['CPI']
#'THY','FCPI','RAAX','RINF','LQDI','STIP','PBTP','SCHP','GTIP','VTIP','SPIP','TIP','TIPX','IVOL','VBND','WIP','SEIAX','DVRAX','TUNIX','VCMDX','FIFGX','PCRIX','PRRSX','MLPDX','PRNEX','FIKDX','MRJAX','RASAX','PSPFX','FLIIX','USAGX','USERX','MIDSX','LIFAX','TXRAX','DRXIX','EARRX','DMREX','AUNAX','DCARX','MMLDX','APOAX','ABNAX','ACITX','PRAIX','FXIRX','MPSAX','FIPDX','FBUIX','RRPAX','SWRSX','VTAPX','FSIPX','VIPSX','BKIPX','PQTSX','SRAAX','SHTIX','BPRAX','RRFAX','MXIOX','DIPSX','MXEGX','PRRIX','GSAPX','TCILX','TILUX','HIPAX','TPRTX','LSGSX','WAIIX','JIMAX','NIFAX','MIAAX','BFIAX','TIOAX','TRBFX','PRIPX','USIAX','DFIHX','HCPBX','DFXIX','IRBAX','WHOSX','TLDTX','RCSTX','TSUMX','ACMTX','HRLAX','WMRIX','DPRSX','CARFX','PRDAX','FSRRX','CARPX','LRRAX','CABNX','PZRMX','TPDAX','USCRX','CARJX','SIFAX','CAAHX',]
reportedValue = []
now = int(time.time())-(60*60*24)
past = now - (60*60*24*365*2)
try:
    for x in tickers:
        html = None
        # options are 1d, 1wk, 1mo
        freak = "1mo"
        dates = []
        close = []
        fetchedUrl = 'https://query1.finance.yahoo.com/v7/finance/download/'+ str(x) +'?period1='+str(past)+'&period2='+str(now)+'&interval='+freak+'&events=history&includeAdjustedClose=true'
        with urllib.request.urlopen(fetchedUrl) as f:
            html = f.read().splitlines()
        f = 0
        for rows in html:
            if html[0] != rows:
                list = rows.split(',')
                dates.append(list[0])
                close.append(list[5])
                f += 1
        #Javascript Method
        #window.createOrderedTicker(x,dates,close)
    #Javscript Method
    #window.stopLoading()
except:
    print("error")
#Javascript Method 
#window.showError()