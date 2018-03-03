const express = require('express');

module.exports = express.Router()
  .get('./test', (req, res) => {
    res.status(200).json({message: 'success'})
  });