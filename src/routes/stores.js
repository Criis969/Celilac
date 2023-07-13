const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/", async (req,res) => {
    const stores = await pool.query("SELECT * FROM stores");
    console.log(stores);
    res.render("stores/stores", {stores: stores});
});

module.exports = router;