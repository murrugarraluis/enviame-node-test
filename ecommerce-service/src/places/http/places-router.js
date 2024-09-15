const express = require('express');
const appRoot = require('app-root-path');
const place = require('../entities/place');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

function createPlacesRouter(managePlacesUsecase) {

  const router = express.Router();

  router.get("/places", async (req, res) => {

    const places = await managePlacesUsecase.getAll();
    res.status(200).send(places);

  });

  router.get("/places/:id", async (req, res) => {

    const id = req.params.id;
    const place = await managePlacesUsecase.getOne(id);

    if (!place) {
      res.status(404).send({
        message: 'Not found',
      })
    }

    res.status(200).send(place);

  });

  router.post("/places", async (req, res) => {

    validation = validateSchema(place.schema, req);

    if (validation === true) {
      const place = await managePlacesUsecase.create(req.body);
      res.status(201).send(place);
    } else {
      res.status(422).send(validation)
    }

  });

  router.put("/places/:id", async (req, res) => {

    validation = validateSchema(place.schema, req);

    if (validation === true) {
      const id = req.params.id;
      const place = await managePlacesUsecase.update(id, req.body);
      res.status(200).send(place);
    } else {
      res.status(422).send(validation);
    }

  });

  router.delete("/places/:id", async (req, res) => {

    const id = req.params.id;
    await managePlacesUsecase.delete(id);

    res.status(200).send({
      message: 'Deleted',
    });

  });

  return router;

}

module.exports = createPlacesRouter;