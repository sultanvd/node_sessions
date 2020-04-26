const router = require('express').Router();
const repository = require('../../repository/users.repository');
const AuthUtils = require('../../utils/authutils');

//get all users
router.get('/', (req, res) => {
    var header = req.headers.authorization;
    console.log(header);
    AuthUtils.verifyToken(header)
    .then( v => {
        var options = {}
        if (req.param.sortBy) {
            options.sortBy = [[req.param.sortBy, 'ASC']];
        }
        return repository.findAll(options)
    })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err.message));
});

module.exports = router;
