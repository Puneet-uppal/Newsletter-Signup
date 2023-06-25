const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html") 
});

app.post("/",function(req,res){
    var firstName=req.body.firstName;
    var lastName=req.body.lastName;
    var email=req.body.email;
    console.log(firstName);
    console.log(lastName);
    console.log(email);

    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    var jsonData=JSON.stringify(data);

    const url="https://us21.api.mailchimp.com/3.0/lists/ecded30a89";
    const options={
        method:"post",
        auth:"puneet:0c3f8bf5e536469b015c304997a6fae1-us21",
    };
    const request = https.request(url,options,function(response){
            response.on("data",function(){
                console.log(JSON.parse(data));
            });
        });
    req.write("jsonData");
    req.end();
});

app.listen(3000,function(){
    console.log("server started on Port 3000");
});


//api key:0c3f8bf5e536469b015c304997a6fae1-us21
//list id: ecded30a89