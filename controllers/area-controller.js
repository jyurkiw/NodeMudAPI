/**
 * Area controller.
 * 
 * @namespace area-controller
 * @returns An area controller access object.
 */
function areasController() {
    var lib = require('redmudlib')(require('redis').createClient());
    var modeler = require('../models/modeler');
    var constants = require('../constants');

    /**
     * GET method for area.
     * Return the area for the given areacode,
     * or a 404 status and an areaError structure
     * containing the passed areacode.
     * 
     * @memberOf area-controller
     * @param {any} req The request object. An areacode param is expected.
     * @param {any} res The response object.
     */
    function areaGET(req, res) {
        lib.getArea(req.params.areacode, function(area) {
            if (area !== null) {
                res.json(Object.assign(modeler.area.blank(), area));
            } else {
                res.status(404);
                res.json(modeler.status.build(constants.status.ERROR, req.params.areacode, constants.error_messages.AREA_404, req.params.areacode));
            }
        });
    }

    /**
     * POST method for area.
     * Returns a status object. See {@link statis-model}
     * 
     * @memberOf area-controller
     * @param {any} req The request object.
     * @param {any} res The response object.
     */
    function areaPOST(req, res) {
        var newArea = req.body;

        // validate newArea
        if (typeof(newArea) !== 'object' || typeof(newArea.areacode) === 'undefined' || newArea.areacode === null) {
            res.status(500);
            res.json(modeler.status.build(constants.status.ERROR, 'areacode', constants.error_messages.AREA_POST_500));
        } else if (typeof(newArea.name) === 'undefined' || newArea.name === null) {
            res.status(500);
            res.json(modeler.status.build(constants.status.ERROR, newArea.areacode, constants.error_messages.AREA_POST_500));
        } else {
            res.status(200);

            var response = null;

            // validate description for warnings
            if (typeof(newArea.description) === 'undefined' || newArea.description === null || newArea.description.length === 0) {
                response = modeler.status.build(constants.status.WARN, newArea.areacode, constants.warning_messages.AREA_POST_NO_DESC);
                delete newArea.description;
            } else {
                response = modeler.status.ok(newArea.areacode);
            }

            lib.setArea(newArea.areacode, newArea);
            res.json(response);
        }
    }

    return {
        areaGET: areaGET,
        areaPOST: areaPOST
    };
}

module.exports = areasController();