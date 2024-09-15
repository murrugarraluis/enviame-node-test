const express = require('express');
const appRoot = require('app-root-path');
const Quotation = require('../entities/quotation');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

function createQuotationsRouter(manageQuotationUsecase) {

  const router = express.Router();

  router.get("/quotations", async (req, res) => {

    const quotations = await manageQuotationUsecase.getAll();
    res.status(200).send(quotations);

  });

  router.get("/quotations/:id", async (req, res) => {

    const id = req.params.id;
    const category = await manageQuotationUsecase.getOne(id);

    if (!category) {
      res.status(404).send({
        message: 'Not found',
      })
    }

    res.status(200).send(category);

  });

  router.post("/quotations", async (req, res) => {

    validation = validateSchema(Quotation.schema, req);

    if (validation === true) {
      const category = await manageQuotationUsecase.create(req.body);
      res.status(201).send(category);
    } else {
      res.status(422).send(validation)
    }

  });

  router.put("/quotations/:id", async (req, res) => {

    validation = validateSchema(Quotation.schema, req);

    if (validation === true) {
      const id = req.params.id;
      const category = await manageQuotationUsecase.update(id, req.body);
      res.status(200).send(category);
    } else {
      res.status(422).send(validation);
    }

  });

  router.delete("/quotations/:id", async (req, res) => {

    const id = req.params.id;
    await manageQuotationUsecase.delete(id);

    res.status(200).send({
      message: 'Deleted',
    });

  });

  return router;

}

module.exports = createQuotationsRouter;