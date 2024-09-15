const express = require('express');
const appRoot = require('app-root-path');
const Coverage = require('../entities/Coverage');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

function createCoveragesRouter(manageCoveragesUsecase) {

  const router = express.Router();

  router.get("/coverages", async (req, res) => {

    const coverages = await manageCoveragesUsecase.getAll();
    res.status(200).send(coverages);

  });

  router.get("/coverages/:id", async (req, res) => {

    const id = req.params.id;
    const category = await manageCoveragesUsecase.getOne(id);

    if (!category) {
      res.status(404).send({
        message: 'Not found',
      })
    }

    res.status(200).send(category);

  });

  router.post("/coverages", async (req, res) => {

    validation = validateSchema(Coverage.schema, req);

    if (validation === true) {
      const category = await manageCoveragesUsecase.create(req.body);
      res.status(201).send(category);
    } else {
      res.status(422).send(validation)
    }

  });

  router.put("/coverages/:id", async (req, res) => {

    validation = validateSchema(Coverage.schema, req);

    if (validation === true) {
      const id = req.params.id;
      const category = await manageCoveragesUsecase.update(id, req.body);
      res.status(200).send(category);
    } else {
      res.status(422).send(validation);
    }

  });

  router.delete("/coverages/:id", async (req, res) => {

    const id = req.params.id;
    await manageCoveragesUsecase.delete(id);

    res.status(200).send({
      message: 'Deleted',
    });

  });

  return router;

}

module.exports = createCoveragesRouter;