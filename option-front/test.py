#!/usr/bin/python3
import calendar
import requests
import pandas as pd
from bs4  import BeautifulSoup
from datetime import datetime
import time
import os


base_url = ("https://www1.nseindia.com/live_market/dynaContent/live_watch/option_chain/optionKeys.jsp")
print(base_url)


headers = {
'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
"Upgrade-Insecure-Requests": "1", "DNT": "1",
"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
"Accept-Language": "en-US,en;q=0.5", "Accept-Encoding": "gzip, deflate"}

#headers = {
#        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
#        'referrer': 'https://google.com',
#        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
#        'Accept-Encoding': 'gzip, deflate, br',
#        'Accept-Language': 'en-US,en;q=0.9',
#        'Pragma': 'no-cache',
#    }


page = requests.get(base_url, headers=headers)
page.status_code
page.content

print(page.content)
