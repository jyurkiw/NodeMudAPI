/**
 * Controller for users.
 * 
 * @namespace user
 * @returns An access object.
 */
function userController() {
    var lib = require('redmudlib')(require('redis').createClient());
    var modeler = require('../models/modeler');
    var constants = require('../constants');

    /**
     * User POST controller. Create a new user.
     * 
     * @memberof user
     * @param {any} req A request object.
     * @param {any} res A response object.
     */
    function userPOST(req, res) {
        var username = req.body.username;
        var pwhash = req.body.pwhash;

        lib.user.async.createUser(username, pwhash)
            .then(function(success) {
                if (success) {
                    res.json(modeler.status.ok("User Created successfully."));
                    return;
                }
            })
            .catch(function(err) {
                res.status(500);
                res.json(modeler.status.build(constants.status.ERROR, null, err));
            });
    }

    return {
        userPOST: userPOST
    };
}

module.exports = userController();