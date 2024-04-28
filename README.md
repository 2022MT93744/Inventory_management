# Inventory_management

Initiate the node project with below code
----------------------------------------------
npm init
----------------------------------------------
All services need below packages
----------------------------------------------
npm install express

npm install body-parser

npm install ejs

npm install pg
-----------------------------------------------

Gateway package new two more
-----------------------------------------------
npm install cors

npm install express-http-proxy
-----------------------------------------------
Run below to run the services
-----------------------------------------------
node index.js 


Docker deployment steps:
docker build -t pay_app .
docker images
docker run -d -p 8003:8003 pay_app
docker ps
