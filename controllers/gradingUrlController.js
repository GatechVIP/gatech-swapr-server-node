var logger = require('../util/logger');

module.exports.getURL = function(req, res) {
    var assignmentID = req.query.assignment;
    logger.debug(assignmentID);
    return res.status(500).send('Unimplemented');
};
