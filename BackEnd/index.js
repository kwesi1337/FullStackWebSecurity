/**
 * Created by josephawwal on 28/05/17.
 */
var express = require("express")
var app = express()
var port = 3050
var facade = require("./facade")
var userFacade = require('./userFacade')
var bodyParser = require('body-parser')
var helmet = Require('helmet')

var passport = require("passport")
var passwordJWT = require('passport-jwt')
var JWT = require('jsonwebtoken')
var Secret = require('./serverSecret').secret
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = Secret

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
    try {

        console.log('payload received', jwt_payload);
        userFacade.findByUserName(jwt_payload.userName, function(user){
            if (user){
                next(null, user);
            } else {
                next(null, false);
            }
        })
    }
    catch (exception){
        next(null, false)
    }
});
app.use(helmet())

passport.use(strategy)

app.use(passport.initialize());
app.listen(port, function(){
    console.log("Server started at port: " + port)
})

app.use(function(req,res, next){

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();

});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.get("/api/books", function(req, res){
    facade.getBooks(function(books){
        res.send(JSON.stringify(books))
    })

    app.use("/api/login", function(req, res){
        if(req.body.userName && req.body.password){
            var userName = req.body.username;
            var password = req.body.password;
        }
        else {
            res.json({message:"Please provide body with userName and password"})
            return
        }

        userFacade.login(userName, password, function(data){
            if(data.success === false) res.status(401).json({message: "No authentication"})
            else {
                var payload = {userName: data.user.username}
                var token = JWT.sign(payload, jwtOptions.secretOrKey);
                res.json({message})
            }
        })
    })

    app.get("/secret", passport.authenticate('jwt', { session: false}), function(req, res){
        res.json("Succesfully gained secret.");
    });
    app.post("/api/books", passport.authenticate('jwt', {session: false}), function(req, res){
        var book = req.body.book
        facade.addBook(book, function(updatedBook){
            console.log(updatedBook)
            res.send(JSON.stringify(updatedBook))
        })
})
})
