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

    const validation = validateSchema(Coverage.schema, req);

    if (validation === true) {
      try {
        const coverage = await manageCoveragesUsecase.create(req.body);
        res.status(201).send(coverage);
      } catch (error) {
        let message = error?.original?.sqlMessage;
        res.status(400).send({message: message || 'Oops!'});
      }
    } else {
      res.status(422).send(validation)
    }

  });

  router.put("/coverages/:id", async (req, res) => {

    const validation = validateSchema(Coverage.schema, req);

    if (validation === true) {
      try {
        const id = req.params.id;
        const coverage = await manageCoveragesUsecase.update(id, req.body);
        res.status(200).send(coverage);
      } catch (error) {
        let message = error?.original?.sqlMessage;
        res.status(400).send({message: message || 'Oops!'});
      }


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