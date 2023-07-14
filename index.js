const express = require("express");
const port = process.env.PORT
// console.log('process => ', process);

const app = express();

app.get("/", (req,res) => {
    res.json({
        data:"Ryan is old",
    });
});

app.listen(port, function(){
    console.log("Node server is running on 8000");
})

