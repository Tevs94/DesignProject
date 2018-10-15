Minimum Viable Product to show the use of the complete application stack for energy management system project.

Application Stack
Node
Express
Angular
MySQL
InfluxDB

Node
Install node
use package manager to install angular and express

MYSQL
Queries TO BE ADDED

InfluxDB 
InfluxDB was run using windows and the CLI - download from https://portal.influxdata.com/downloads#influxdb 
Unzip and run influxd.exe then influx.exe to use the CLI
Create a database using CLI CREATE database sensorData
create a table/measurement using an insert query. Example insert query shown below:

INSERT energyData,sensorName=WITS13JubileeRoad kVA=2.46519776082975,kVarh=0.16,kWh=2.46 1514766600000000000
table is energyData, tag is the sensor name and the fields are kVA, kVarh and kWh and final value is timestamp in NANOSECONDS

Sample Data for 2 days for one sensor with queries is provided in sampleDataWithQueries.xlsx 
The queries were automated using the excel formula:
="INSERT energyData,sensorName="&$G$2&" kVA="&B2&",kVarh="&C2&",kWh="&D2&" "&((A2-$F$2)*86400000000000)

copy the queries column then right click in the CLI to run all the queries. The CLI may need to be restarted 
because there is a timeout on the queries and you are doing many at once
