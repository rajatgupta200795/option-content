import calendar
import csv
import requests
import pandas as pd
import xlrd


df = pd.read_excel("data.xlsx")
valid_date_file = "valid_date.csv"
new_date_row = []

j=0
for i in df['Date']:
    date_str = i.strftime("%d%m%Y")
    url = "https://www1.nseindia.com/content/nsccl/fao_participant_oi_"+date_str+".csv"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
        "Upgrade-Insecure-Requests": "1", "DNT": "1",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5", "Accept-Encoding": "gzip, deflate"}

    if df['FAO Status'][j] != "Yes":
        page = requests.get(url, headers=headers)
        page.status_code
        page.content
        file_name = "fao_participant_oi/fao_"+date_str+".csv"
        print(page.status_code)
        if page.status_code == 200:
            with open(file_name, 'w') as f:
                writer = csv.writer(f)
                for line in page.iter_lines():
                    writer.writerow(line.decode('utf-8').split(','))
        else:
            print(date_str+": This date is not valid.")
            new_date_row.append(date_str)
        print(date_str)
        #df['FAO Status'][j] = "No"

    #print(df['FAO Status'][j])
    j=j+1

csv.writer(open(valid_date_file,'a')).writerow(new_date_row)
print(new_date_row)


