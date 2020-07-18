import csv
import os

import mplcursors as mplcursors
import pandas as pd
from matplotlib import pyplot as plt
import matplotlib.ticker as tick
from matplotlib import style
import numpy as np

while 1 is 1:
    df = pd.read_excel("data.xlsx")
    a_row = []
    b_row = []
    date_str_row = []
    yaxis_label1 = ""
    yaxis_label2 = ""
    yaxis_text = ""
    trader_type = ""

    type=int(input("Enter trade type:\n"))
    trader = int(input("Enter trader type:\n"))

    for i in df['Date'][375:]:
        date_str = i.strftime("%d%m%Y")
        date_str_for_row = i.strftime("%d/%m/%Y")
        file_name = "fao_participant_oi/fao_" + date_str + ".csv"
        if os.path.isfile(file_name):
            date_str_row.append(date_str_for_row)
            df_fao_file = pd.read_csv(file_name, skiprows=1)
            pd.set_option('display.max_columns', None)



            if type is 1:
                yaxis_text = "Index Future Long/Short"
                yaxis_label1 = "Future Index Long"
                yaxis_label2 = "Future Index Short"
                a_var = df_fao_file[(trader-1):(trader)]['Future Index Long']
                b_var = df_fao_file[(trader-1):(trader)]['Future Index Short']

            if type is 2:
                yaxis_text = "Future Stock Long/Short"
                yaxis_label1 = "Future Stock Long"
                yaxis_label2 = "Future Stock Short"
                df_fao_file.columns.values[4] = "Future Stock Short"
                a_var = df_fao_file[(trader-1):(trader)]['Future Stock Long']
                b_var = df_fao_file[(trader-1):(trader)]['Future Stock Short']

            if type is 3:
                yaxis_text = "Option Index Call/Put Long"
                yaxis_label1 ="Option Index Call Long"
                yaxis_label2 = "Option Index Put Long"
                a_var = df_fao_file[(trader-1):(trader)]['Option Index Call Long']
                b_var = df_fao_file[(trader-1):(trader)]['Option Index Put Long']

            if type is 4:
                yaxis_text = "Option Index Call/Put Short"
                yaxis_label1 = "Option Index Call Short"
                yaxis_label2 = "Option Index Put Short"
                a_var = df_fao_file[(trader-1):(trader)]['Option Index Call Short']
                b_var = df_fao_file[(trader-1):(trader)]['Option Index Put Short']

            if type is 5:
                yaxis_text = "Option Stock Call/Put Long"
                yaxis_label1 = "Option Stock Call Long"
                yaxis_label2 = "Option Stock Put Long"
                a_var = df_fao_file[(trader-1):(trader)]['Option Stock Call Long']
                b_var = df_fao_file[(trader-1):(trader)]['Option Stock Put Long']

            if type is 6:
                yaxis_text = "Option Stock Call/Put Short"
                yaxis_label1 = "Option Stock Call Short"
                yaxis_label2 = "Option Stock Put Short"
                a_var = df_fao_file[(trader-1):(trader)]['Option Stock Call Short']
                b_var = df_fao_file[(trader-1):(trader)]['Option Stock Put Short']

            if type is 7:
                yaxis_text = "Total Long/Short Contracts"
                yaxis_label1 = "Total Long Contracts"
                yaxis_label2 = "Total Short Contracts"
                df_fao_file.columns.values[13] = "Total Long Contracts"
                a_var = df_fao_file[(trader-1):(trader)]['Total Long Contracts']
                b_var = df_fao_file[(trader-1):(trader)]['Total Short Contracts']

            a_row.append(int(a_var[(trader-1)]))
            b_row.append(int(b_var[(trader-1)]))
            #print(a_var)

    if trader is 1:
        trader_type = "Client's"
    elif trader is 2:
        trader_type = "DII's"
    elif trader is 3:
        trader_type = "FII's"
    elif trader is 4:
        trader_type = "Pro's"
    elif trader is 4:
        trader_type = "Total"

    yaxis_text = trader_type +" "+ yaxis_text
    yaxis_label1 = trader_type +" "+ yaxis_label1
    yaxis_label2 = trader_type +" "+ yaxis_label2

    x=date_str_row
    a=a_row
    b=b_row

    plt.style.use('dark_background')
    fig, ax = plt.subplots(figsize=(15, 10))
    plt.plot(x, a, color ='g', label=yaxis_label1, linewidth=2)
    plt.plot(x, b, color ='r', label=yaxis_label2, linewidth=2)

    def y_fmt(y, pos):
        decades = [1e9, 1e6, 1e3, 1e0, 1e-3, 1e-6, 1e-9 ]
        suffix  = ["G", "M", "k", "" , "m" , "u", "n"  ]
        if y == 0:
            return str(0)
        for i, d in enumerate(decades):
            if np.abs(y) >=d:
                val = y/float(d)
                signf = len(str(val).split(".")[1])
                if signf == 0:
                    return '{val:d} {suffix}'.format(val=int(val), suffix=suffix[i])
                else:
                    if signf == 1:
                        if str(val).split(".")[1] == "0":
                           return '{val:d} {suffix}'.format(val=int(round(val)), suffix=suffix[i])
                    tx = "{"+"val:.{signf}f".format(signf = signf) +"} {suffix}"
                    return tx.format(val=val, suffix=suffix[i])
        return y

    crs = mplcursors.cursor(ax, hover=True)
    ax = plt.gca()
    ax.yaxis.set_major_formatter(tick.FuncFormatter(y_fmt))

    plt.title(yaxis_text + " positions from " + date_str_row[0] +" to " + date_str_row[len(date_str_row)-1]+" | Data Analysis with @rajatgupta207")
    plt.xticks(rotation=90)
    plt.tight_layout()
    plt.legend()

    plt.ylabel(yaxis_text)

    plt.show()





