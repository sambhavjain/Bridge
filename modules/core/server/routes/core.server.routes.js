'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');
  var profile = require('../controllers/profile.server.controller')
  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);
  app.route('/api/core/editProfile').post(profile.editProfile);
  app.route('/api/core/editBanner').post(profile.editBanner);
  app.route('/api/core/getBanner/:id').get(profile.getBanner);
};
