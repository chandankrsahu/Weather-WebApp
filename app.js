const express =require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000,function(){
    console.log("server is ruuning at port 3000");
})
app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
    
});

app.post("/",function(req,res){
    var name=req.body.cityname;

    
    const url="https://api.openweathermap.org/data/2.5/weather?q="+name+"&appid=8cad6c22e98a2abac794015c4ac1c316&units=metric"
   https.get(url,function(resp){
       
    resp.on("data",function(data){
        Wdata=JSON.parse(data);
        // console.log(Wdata.main.temp); 
        res.write("<h1>the "+name+" city tempartue is "+Wdata.main.temp+"</h1>");
        res.write("the weather has "+ Wdata.weather[0].description);
        res.write("<img src=http://openweathermap.org/img/wn/"+Wdata.weather[0].icon+"@2x.png>");
        res.send();

    })

   
   })
    
})

