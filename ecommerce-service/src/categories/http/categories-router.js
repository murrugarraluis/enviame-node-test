const express = require('express');
const appRoot = require('app-root-path');
const category = require('../entities/category');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

function createCategoriesRouter(manageCategoriesUsecase) {

  const router = express.Router();

  router.get("/categories", async (req, res) => {

    const categories = await manageCategoriesUsecase.getAll();
    res.status(200).send(categories);

  });

  router.get("/categories/:id", async (req, res) => {

    const id = req.params.id;
    const category = await manageCategoriesUsecase.getOne(id);

    if (!category) {
      res.status(404).send({
        message: 'Not found',
      })
    }

    res.status(200).send(category);

  });

  router.post("/categories", async (req, res) => {

    validation = validateSchema(category.schema, req);

    if (validation === true) {
      const category = await manageCategoriesUsecase.create(req.body);
      res.status(201).send(category);
    } else {
      res.status(422).send(validation)
    }

  });

  router.put("/categories/:id", async (req, res) => {

    validation = validateSchema(category.schema, req);

    if (validation === true) {
      const id = req.params.id;
      const category = await manageCategoriesUsecase.update(id, req.body);
      res.status(200).send(category);
    } else {
      res.status(422).send(validation);
    }

  });

  router.delete("/categories/:id", async (req, res) => {

    const id = req.params.id;
    await manageCategoriesUsecase.delete(id);

    res.status(200).send({
      message: 'Deleted',
    });

  });

  return router;

}

module.exports = createCategoriesRouter;