const express = require('express');
const appRoot = require('app-root-path');
const Vehicle = require('../entities/vehicle');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

function createVehiclesRouter(managevehiclesUsecase) {

  const router = express.Router();

  router.get("/vehicles", async (req, res) => {

    const vehicles = await managevehiclesUsecase.getAll();
    res.status(200).send(vehicles);

  });

  router.get("/vehicles/:id", async (req, res) => {

    const id = req.params.id;
    const place = await managevehiclesUsecase.getOne(id);

    if (!place) {
      res.status(404).send({
        message: 'Not found',
      })
    }

    res.status(200).send(place);

  });

  router.post("/vehicles", async (req, res) => {

    validation = validateSchema(Vehicle.schema, req);

    if (validation === true) {
      const place = await managevehiclesUsecase.create(req.body);
      res.status(201).send(place);
    } else {
      res.status(422).send(validation)
    }

  });

  router.put("/vehicles/:id", async (req, res) => {

    validation = validateSchema(Vehicle.schema, req);

    if (validation === true) {
      const id = req.params.id;
      const place = await managevehiclesUsecase.update(id, req.body);
      res.status(200).send(place);
    } else {
      res.status(422).send(validation);
    }

  });

  router.delete("/vehicles/:id", async (req, res) => {

    const id = req.params.id;
    await managevehiclesUsecase.delete(id);

    res.status(200).send({
      message: 'Deleted',
    });

  });

  return router;

}

module.exports = createVehiclesRouter;