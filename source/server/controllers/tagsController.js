'use strict';
// var squel = require('squel');
var winston = require('winston');
var models = require('../models');
var Sequelize = require('Sequelize');

module.exports = function() {
  return {
    send20Tags: function (req, res) {
      winston.info('Sending tags.');

      models.ScreencastTags.findAll({
        group: ['tagName'],
        attributes: [
          'tagName',
          [Sequelize.fn('count', 'tagName'), 'count']
        ],
        include: [{
          model: models.Screencasts,
          where: { approved: true },
          attributes: []
        }]
      }).then(function (screencasts) {
        res.json(screencasts);
      });
    }
  };
};
