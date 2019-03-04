## Mongodb turorial with nodejs
- How to start mongodb and using it
```
mongod  --auth --port 27017 --dbpath "FolderPath" (example:E:/sideProject/nodejs/database)
```
- Open another cmd to access to mongodb server local
```
mongo --port 27017 -u 'vonhattruong' -p 'abcd1234' --authenticationDatabase 'testDatabase'
```
(-u 'vonhattruong' and -p 'abcd1234' is username and password to access. 'testDatabase' is database created)
- how to create database and user. Run this code 
```
mongod --port 27017 --dbpath E:/sideProject/nodejs/database
```
- We continue run
```
use databaseNameYouWannaCreate
switch to db databaseNameYouWannaCreate
db.createUser({
  user: "UserName",
  pwd: "password",
  roles: ['readWrite','dbAdmin','dbOwner']
})
```