const express = require('express');
const catRoute = require('./cat.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/cats',
    route: catRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
