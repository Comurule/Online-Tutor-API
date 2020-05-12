const mongoose = require("mongoose");
const express = require('express');
const app = express();
const authRoutes = require("./routes/routes.js");
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(authRoutes);


mongoose.connect(
        "mongodb+srv://comurule:mystatus@comurule-qtddz.mongodb.net/test?retryWrites=true&w=majority",
                    { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(result => {
        console.log("Database connected");
        app.listen(port, ()=>{
            console.log(`Server running at port `+port);
        });
    })
    .catch(err => console.log(err));
