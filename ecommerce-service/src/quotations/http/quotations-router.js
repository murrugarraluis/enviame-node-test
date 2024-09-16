const express = require('express');
const appRoot = require('app-root-path');
const Quotation = require('../entities/quotation');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

function createQuotationsRouter(manageQuotationUsecase) {

  const router = express.Router();

  router.get("/quotations", async (req, res) => {

    const { startDate, endDate } = req.query;
    const quotations = await manageQuotationUsecase.getAll({ startDate, endDate });
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

    const validation = validateSchema(Quotation.schema, req);

    if (validation === true) {
      try {
        const quotation = await manageQuotationUsecase.create(req.body);
        res.status(201).send(quotation);
      } catch (error) {
        let message = error?.original?.sqlMessage;
        res.status(400).send({message: message || 'Oops!'});
        console.log(error)
      }


    } else {
      res.status(422).send(validation)
    }

  });

  router.put("/quotations/:id", async (req, res) => {

    validation = validateSchema(Quotation.schema, req);

    if (validation === true) {
      try {
        const id = req.params.id;
        const quotation = await manageQuotationUsecase.update(id, req.body);
        res.status(200).send(quotation);
      } catch (error) {
        let message = error?.original?.sqlMessage;
        res.status(400).send({message: message || 'Oops!'});
      }
    } else {
      res.status(422).send(validation);
    }

  });

  router.put("/quotations/:id/reserved", async (req, res) => {


    validation = validateSchema(Quotation.schemaReserved, req);

    if (validation === true) {
      try {
        const id = req.params.id;
        const quotation = await manageQuotationUsecase.changeStatusReserved(id, req.body);

        if (!quotation) {
          res.status(404).send({
            message: 'Not found',
          })
        }

        res.status(200).send(quotation);
      } catch (error) {
        res.status(400).send({ message: error.message });
        console.log(error)
      }
    } else {
      res.status(422).send(validation);
    }

  });

  router.put("/quotations/:id/reserved-canceled", async (req, res) => {

    try {
      const id = req.params.id;
      const quotation = await manageQuotationUsecase.changeStatusReservedCanceled(id);

      if (!quotation) {
        res.status(404).send({
          message: 'Not found',
        })
      }

      res.status(200).send(quotation);
    } catch (error) {
      res.status(400).send({ message: error.message });
      console.log(error)
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