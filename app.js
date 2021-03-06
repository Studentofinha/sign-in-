const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    
    let firstName=req.body.fName;
    let lastName=req.body.lName;
    let email=req.body.email;
    let data={
        members:[
            {email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
            }
        ]
    };

    let jsonData=JSON.stringify(data);

    let options={
        url:"https://us1.api.mailchimp.com/3.0/lists/75baa39895",
        method:"POST",
        headers:{
            "Authorization": "Sardorbek1 b086c701223ab63be39796be70eacde2-us1"
        },
        body:jsonData

    }


    request(options,function(error,response,body){
        if(error){
            res.sendFile(__dirname + "/failure.html")
        }else{
            if(response.statusCode===200){
                res.sendFile(__dirname + "/success.html")

            }else{
                res.sendFile(__dirname + "/failure.html")
            }
        }
    })

})


app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
     console.log("Server is running on port 3000");
 });

//API
//b086c701223ab63be39796be70eacde2-us1
//LIST ID
//75baa39895