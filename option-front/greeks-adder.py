import json
import sys
import math
from datetime import datetime
import scipy.stats

expiry=sys.argv[1]
req_date=sys.argv[2]

expiry = datetime.strptime(expiry, "%d%b%Y")
req_date = datetime.strptime(req_date, "%Y%m%d")
diff = expiry - req_date
days=diff.days
t = days/365
r=10/100

dist = []

file = open('resultData.json')
json_object = json.load(file)
for element in json_object: 
#     print(element)
     strike = int(element['strike_price'])
     spot = int(element['spot_price'])
     
     if element['ce_iv'] is not '-':
         vol = float(element['ce_iv'])/100
         d1 = (math.log(spot/strike)+t*(r+vol*vol/2))/(vol*math.sqrt(t))
         d2 = d1 - vol*math.sqrt(t) 
     
         ce_price = spot*scipy.stats.norm.cdf(d1)-strike*math.exp(-r*t)*scipy.stats.norm.cdf(d2)
         ce_delta = scipy.stats.norm.cdf(d1)
         ce_gamma = math.exp(-d1*d1/2)/(spot*vol*math.sqrt(t*2*math.pi))
         ce_vega = spot*math.exp(-d1*d1/2)*math.sqrt(t/(2*math.pi))/100
         ce_theta = (-(spot*vol*math.exp(-d1*d1/2)/(2*math.sqrt(2*t*math.pi)))-r*strike*math.exp(-r*t)*scipy.stats.norm.cdf(d2))/365
         ce_rho = strike*t**math.exp(-r*t)*scipy.stats.norm.cdf(d2)/100

     else:
         ce_price = "-"
         ce_delta = "-"
         ce_gamma = "-"
         ce_vega = "-"
         ce_theta = "-"
         ce_rho = "-"
#     print(t)
#     print(d1)

     if element['pe_iv'] is not '-':
         vol = float(element['pe_iv'])/100
         d1 = (math.log(spot/strike)+t*(r+vol*vol/2))/(vol*math.sqrt(t))
         d2 = d1 - vol*math.sqrt(t) 

         pe_price = -spot*scipy.stats.norm.cdf(-d1)+strike*math.exp(-r*t)*scipy.stats.norm.cdf(-d2)
         pe_delta = scipy.stats.norm.cdf(d1)-1 
         pe_gamma = math.exp(-d1*d1/2)/(spot*vol*math.sqrt(t*2*math.pi))
         pe_vega = spot*math.exp(-d1*d1/2)*math.sqrt(t/(2*math.pi))/100
         pe_theta = (-(spot*vol*math.exp(-d1*d1/2)/(2*math.sqrt(2*t*math.pi)))+r*strike*math.exp(-r*t)*scipy.stats.norm.cdf(-d2))/365
         pe_rho = strike*t**math.exp(-r*t)*scipy.stats.norm.cdf(-d2)/100

     else:
         pe_price = "-"
         pe_delta = "-"
         pe_gamma = "-"
         pe_vega = "-"
         pe_theta = "-"
         pe_rho = "-"

     if element['ce_iv'] == "-" and element['pe_iv'] == "-":
         obj = {"ce_price": '-', "ce_delta": '-', "ce_gamma": '-', "ce_vega": '-', "ce_theta": '-', "ce_rho": '-', "pe_price": '-', "pe_rho": '-', "pe_theta": '-', "pe_vega": '-', "pe_gamma": '-', "pe_delta": '-'}
     elif element['pe_iv'] == "-":
         obj = { "ce_price": '%.2f'%ce_price , "ce_delta": '%.3f'%ce_delta, "ce_gamma": '%.3f'%ce_gamma, "ce_vega": '%.3f'%ce_vega, "ce_theta": '%.3f'%ce_theta, "ce_rho": '%.3f'%ce_rho, "pe_price": '-', "pe_rho": '-', "pe_theta": '-', "pe_vega": '-', "pe_gamma": '-', "pe_delta": '-'}
     elif element['ce_iv'] == "-":
         obj = {"ce_price": '-', "ce_delta": '-', "ce_gamma": '-', "ce_vega": '-', "ce_theta": '-', "ce_rho": '-',"pe_price": '%.2f'%pe_price, "pe_rho": '%.3f'%pe_rho, "pe_theta": '%.3f'%pe_theta, "pe_vega": '%.3f'%pe_vega, "pe_gamma": '%.3f'%pe_gamma, "pe_delta": '%.3f'%pe_delta}
     else:
         obj = { "ce_price": '%.2f'%ce_price , "ce_delta": '%.3f'%ce_delta, "ce_gamma": '%.3f'%ce_gamma, "ce_vega": '%.3f'%ce_vega, "ce_theta": '%.3f'%ce_theta, "ce_rho": '%.3f'%ce_rho, "pe_price": '%.2f'%pe_price, "pe_rho": '%.3f'%pe_rho, "pe_theta": '%.3f'%pe_theta, "pe_vega": '%.3f'%pe_vega, "pe_gamma": '%.3f'%pe_gamma, "pe_delta": '%.3f'%pe_delta}


     element.update(obj)
     json.dumps(element)
     dist.append(element)

    
print(json.dumps(dist, sort_keys=True))

