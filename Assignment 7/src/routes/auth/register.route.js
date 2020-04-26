const router = require('express').Router();
const repository = require('../../repository/users.repository');

//register  users
router.post('/signup/', (req, res) => {
    repository.signup(req.body)
    .then(data => res.status(200).send(data))
    .catch(error => res.status(500).send(error.message));
});

module.exports = router;
