const express = require("express");
const router = express.Router();
const pool = require("../database");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("auth/signup");
});

router.post("/signup", passport.authenticate("local.signup",{
    successRedirect: "/authentication/profile",
    failureRedirect: "/authentication/signup",
    failureFlash: true
}));

router.get("/signin", (req, res) => {
    res.render("auth/signin");
});

router.post("/signin", async (req, res, next) => {
    passport.authenticate("local.signin",{
        successRedirect: "/authentication/profile",
        failureRedirect: "/authentication/signin",
        failureFlash: true
    })(req,res,next);
});

router.get("/profile", (req, res) => {
    res.render("auth/profile");
});

router.get("/logout", (req, res) => {
    req.logOut((err) => {
        if(err){
            return next(err);
        }else{
            res.redirect("/authentication/signin");
        }
    });
});

module.exports = router;