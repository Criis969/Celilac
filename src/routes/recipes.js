const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/", async (req, res) => {
    const recipes = await pool.query("SELECT * FROM recipes");
    console.log(recipes);
    res.render("recipes/recipes", { recipes: recipes });
});

router.get("/add", (req, res) => {
    const { id } = req.params;
    res.render("recipes/add", { id: id});
});

router.post("/:id/add", async (req, res) => {
    const user_id = req.params.id;
    const { recipe_name, recipe_ingredients, duration, image_link, recipe_description } = req.body;
    const newRecipe = {
        recipe_name,
        recipe_ingredients,
        duration,
        image_link,
        recipe_description,
        user_id
    }
    console.log(newRecipe);
    await pool.query("INSERT INTO recipes set ?", [newRecipe]);
    res.redirect("/recipes/user/"+user_id);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const recipe = await pool.query("SELECT * FROM recipes WHERE id = ?", [id]);
    res.render("recipes/recipe", { recipe: recipe});
});

router.get("/delete/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await pool.query("DELETE FROM recipes WHERE id = ?", [id]);
    res.redirect("/authentication/profile");
});

router.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    const recipes = await pool.query("SELECT * FROM recipes WHERE user_id = ?", [id]);
    res.render("recipes/user", {recipes: recipes});
});

router.get("/user/:user_id/edit/:id", (req, res) => {
    const { id, user_id } = req.params;
    res.render("recipes/edit", {id: id, user_id: user_id});
});

router.post("/user/:user_id/edit/:id", async (req, res) => {
    const {id, user_id} = req.params
    const {recipe_name, recipe_description, recipe_ingredients, duration, image_link} = req.body;
    const recipeEdited = {
        recipe_name,
        recipe_description,
        recipe_ingredients,
        duration,
        image_link
    }
    await pool.query("UPDATE recipes set ? WHERE id = ?",[recipeEdited,id]);
    res.redirect("/recipes/user/"+user_id);
})






module.exports = router;