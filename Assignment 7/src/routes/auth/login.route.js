const router = require('express').Router();
const repository = require('../../repository/users.repository');

//login  users
router.post('/login/', (req, res) => {
    repository
    .login(req.body)
    .then((data = {}) => {
        res.setHeader('Authorization', data.token);
      // Send cookies if you want.
      res.status(200).send(data.user);
    })
    .catch(err => void res.send(err.message));
});

module.exports = router;
