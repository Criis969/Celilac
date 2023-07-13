const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
const helpers = require("./helpers");


passport.use("local.signin", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req, username, password, done) =>{

    const rows = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    if(rows.length == 1){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword){
            return done(null, user, req.flash("success","Bienvenido "+user.username));
        }else{
            return done(null, false, req.flash("message","Contraseña incorrecta"));
        }
    }else{
        return done(null, false, req.flash("message","No existe el usuario"));
    }
}));
passport.use("local.signup", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const { email, firstname, surname} = req.body;
    const newUser = {
        username,
        password,
        email,
        firstname,
        surname
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query("INSERT INTO users set ?", [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    done(null, rows[0]);
});