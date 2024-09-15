const express = require('express');
const appRoot = require('app-root-path');
const provider = require('../entities/provider');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

function createProvidersRouter(manageProvidersUsecase) {

  const router = express.Router();

  router.get("/providers", async (req, res) => {

    const providers = await manageProvidersUsecase.getAll();
    res.status(200).send(providers);

  });

  router.get("/providers/:id", async (req, res) => {

    const id = req.params.id;
    const place = await manageProvidersUsecase.getOne(id);

    if (!place) {
      res.status(404).send({
        message: 'Not found',
      })
    }

    res.status(200).send(place);

  });

  router.post("/providers", async (req, res) => {

    validation = validateSchema(provider.schema, req);

    if (validation === true) {
      const place = await manageProvidersUsecase.create(req.body);
      res.status(201).send(place);
    } else {
      res.status(422).send(validation)
    }

  });

  router.put("/providers/:id", async (req, res) => {

    validation = validateSchema(provider.schema, req);

    if (validation === true) {
      const id = req.params.id;
      const place = await manageProvidersUsecase.update(id, req.body);
      res.status(200).send(place);
    } else {
      res.status(422).send(validation);
    }

  });

  router.delete("/providers/:id", async (req, res) => {

    const id = req.params.id;
    await manageProvidersUsecase.delete(id);

    res.status(200).send({
      message: 'Deleted',
    });

  });

  return router;

}

module.exports = createProvidersRouter;