FROM python:3
WORKDIR /app/
ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN python --version
RUN apt-get update
RUN apt install jq -y
CMD jq --version
ADD req.txt req.txt
RUN pip3 install -r req.txt
ADD couchbase /opt/couchbase
ADD FetchOptionData.py /app/FetchOptionData.py
ADD DbInsert.sh /app/DbInsert.sh 
ADD optionAutomationLocalServer.sh /app/optionAutomationLocalServer.sh
CMD ["chmod", "+x", "/app/optionAutomationLocalServer.sh", "/app/DbInsert.sh"]
ENTRYPOINT ["/app/optionAutomationLocalServer.sh"]
CMD ls

