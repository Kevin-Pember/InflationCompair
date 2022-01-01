import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime
plt.style.use('seaborn')

import yfinance as yf

msft = yf.Ticker("MSFT")

stockinfo = msft.info

for key, value in stockinfo.items():
    print(key, value)