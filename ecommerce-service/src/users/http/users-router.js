const express = require('express');
const appRoot = require('app-root-path');
const User = require('../entities/user');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

function createUsersRouter(manageusersUsecase) {

  const router = express.Router();

  router.get("/users", async (req, res) => {

    const users = await manageusersUsecase.getAll();
    res.status(200).send(users);

  });

  router.get("/users/:id", async (req, res) => {

    const id = req.params.id;
    const place = await manageusersUsecase.getOne(id);

    if (!place) {
      res.status(404).send({
        message: 'Not found',
      })
    }

    res.status(200).send(place);

  });

  router.post("/users", async (req, res) => {

    validation = validateSchema(User.schema, req);

    if (validation === true) {
      const place = await manageusersUsecase.create(req.body);
      res.status(201).send(place);
    } else {
      res.status(422).send(validation)
    }

  });

  router.put("/users/:id", async (req, res) => {

    validation = validateSchema(User.schema, req);

    if (validation === true) {
      const id = req.params.id;
      const place = await manageusersUsecase.update(id, req.body);
      res.status(200).send(place);
    } else {
      res.status(422).send(validation);
    }

  });

  router.delete("/users/:id", async (req, res) => {

    const id = req.params.id;
    await manageusersUsecase.delete(id);

    res.status(200).send({
      message: 'Deleted',
    });

  });

  return router;

}

module.exports = createUsersRouter;