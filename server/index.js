require("dotenv").config();
const express=require("express");
const app=express();
const adminRouter=require("./routes/adminRoute")
const userRouter=require("./routes/userLogin")
const mongoose=require("mongoose");
const cors=require("cors");
const bodyparser=require("body-parser")
const userDB = require("./models/googleuserModel")
const session = require("express-session");
const passport = require("passport");

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("Db connected succefully");
})  


const OAuth2Strategy = require("passport-google-oauth2").Strategy;


const clientid = process.env.CLIENT_ID;

const clientsecret = process.env.CLIENT_SECRET;
app.use(cors({
    origin: "https://task-management-rose-phi-22.vercel.app",
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}));

app.use(express.json());
// setup session
app.use(session({
    secret: "sachin1234",
    resave: false,
    saveUninitialized: true
}))

// setup passport


app.use(passport.initialize());
app.use(passport.session());

passport.use(

new OAuth2Strategy({
    clientID: clientid,
    clientSecret: clientsecret,
    callbackURL: `${process.env.PORT}/auth/google/callback`,
    scope: ["profile", "email"]
},

        async (accessToken, refreshToken, profile, done) => {
            console.log("profile", profile);

            try {
                let user = await userDB.findOne({ googleId: profile.id });
                if (!user) {
                    user = new userDB({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        image: profile.photos[0].value
                    });
                    await user.save();
                }
                return done(null, user);
            } catch (error) {
                return done(error, null)
            }
        }
    )
)


passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

//initialize google auth login

app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"], prompt: "select_account"   // ✅ ADD THIS (fixes many OAuth issues)
}));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "https://task-management-rose-phi-22.vercel.app/admindashboard",
    failureRedirect: "https://task-management-rose-phi-22.vercel.app/"

}))













app.use("/admin",adminRouter);
app.use("/user",userRouter);

const PORT=process.env.PORT || 9000 
app.listen(process.env.PORT,()=>{
    console.log(`server running on ${PORT}`);
    
})




