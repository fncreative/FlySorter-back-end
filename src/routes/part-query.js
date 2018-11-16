'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Part = require('../model/part');
const dbQuery = require('../lib/query');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

const runPartQuery = (callback) => {
  const findPart = dbQuery.find(
    Part,
    'partId'
    + ' partDescription '
    + 'partSub '
    + 'partSrc '
    + 'partMfgNum '
    + 'partPrice '
    + 'partCategory '
    + 'partLocation '
    + 'partCount '
    + 'partLongLead '
    + 'partNotes '
    + 'subAssembly',
  );
  const returnData = dbQuery.query(findPart, function (data, error) { //eslint-disable-line
    if (error) {
      return error;
    }
    if (data) {
      return callback(Object.values(data));
    }
  });
};

router.get('/partquery', jsonParser, (request, response, next) => { //eslint-disable-line
  const query = runPartQuery((callback, error) => { //eslint-disable-line
    return response.json({ dbQuery: callback });
  });
});