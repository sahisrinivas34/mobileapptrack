const express = require('express');
const NodeCouchDb = require('node-couchdb');
const path = require('path');
const app = express();
const couch = new NodeCouchDb({
    auth: {
        user: 'admin',
        pass: 'nikhil007'
    }
})
couch.get("users","").then(({data,headers,status}) => console.log(data), err => {

})

app.get('/',function(req,res){
res.send('working...');
})
app.listen(3000);
console.log("Server started");