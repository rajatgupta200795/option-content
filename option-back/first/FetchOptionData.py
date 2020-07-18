#!/usr/bin/python3

import calendar
import requests
import pandas as pd
from bs4  import BeautifulSoup
from datetime import datetime
import time
import os


cmd = "rm *.csv"
os.system(cmd)
#cmd = "ls"
#os.system(cmd)


print("Fetching ...")

def fetchOptionData(url, expiry_date):

    base_url = (url)
    #print(base_url)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
        "Upgrade-Insecure-Requests": "1", "DNT": "1",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5", "Accept-Encoding": "gzip, deflate"}

    page = requests.get(base_url, headers=headers)
    page.status_code
    page.content

    soup = BeautifulSoup(page.content, 'html.parser')
    #print(soup.prettify())
    niftyIndex=soup.find('div', id='wrapper_btm').table.tr.find("td", align="right").div.span.b.text.split(" ")[1]
    niftyIndex = (niftyIndex.split(".")[0])

    table_it = soup.find_all(class_="opttbldata")
    table_cls_1 = soup.find_all(id="octable")

    col_list = []

    for mytable in table_cls_1:
        table_head = mytable.find("thead")

        try:
            rows = table_head.find_all('tr')
            for tr in rows:
                cols = tr.find_all('th')
                for th in cols:
                    er = th.text
                    ee = er.encode("utf8")
                    ee = ee.decode("utf8")
                    col_list.append(ee)

        except:
            print("no thread")


    col_list_fnl = [e for e in col_list if e not in ("CALLS", 'PUTS', 'Chart', '\xa0')]
    #print(col_list_fnl)

    table_cls_2 = soup.find(id="octable")
    all_trs = table_cls_2.find_all('tr')
    req_row = table_cls_2.find_all('tr')

    new_table = pd.DataFrame(index=range(0, len(req_row)-3), columns=col_list_fnl)
    #print(new_table)
    row_marker = 0

    for row_number, tr_nos in enumerate(req_row):
        if row_number <=1 or row_number == len(req_row)-1:
            continue

        td_columns = tr_nos.find_all('td')

        select_cols = td_columns[1:22]
        col_horizontal = range(0, len(select_cols))
        #print(enumerate(select_cols))
        for nu, column in enumerate(select_cols):

            utf_string = column.get_text()
            utf_string = utf_string.strip('\n\r\t": ')
            tr = utf_string.encode('utf8')
            tr = tr.decode('utf8')
            new_table.iloc[row_marker,[nu]] = tr.replace(",", "")

        row_marker += 1

    current_date_time = datetime.now().strftime("%Y:%m:%d_%H:%M")
    #current_date_time="2019:10:18_15:30:01"
    option_file_name = expiry_date+"_"+current_date_time+"_"+niftyIndex+".csv"
    #print(option_file_name)
    new_table.to_csv(option_file_name)


filepath = 'Running_Expiry_Date.txt'
with open(filepath) as fp:
    for line in enumerate(fp):
        expiry_date = line[1].strip("\n")
        url = "https://www.nseindia.com/live_market/dynaContent/live_watch/option_chain/optionKeys.jsp?segmentLink=17&instrument=OPTIDX&symbol=NIFTY&date="+expiry_date
        #print(url)
        fetchOptionData(url, expiry_date)


cmd = "ls"
os.system(cmd)




























