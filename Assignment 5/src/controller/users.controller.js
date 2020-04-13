const service = require('../service/users.service');

async function getRecord(req, res) {
  const isEmpty = obj => Object.keys(obj).length <= 0;
  if (!isEmpty(req.query)) {
    res.status(200).send( await service.find(req.query));
    return;
  }
  res.status(200).send( await service.findAll());
}

async function getRecordById(req, res) {
  try {
    const id = req.params.id;
    console.log("getting user details by id : " + id);
    const user = await service.find({ id });
    console.log("getting user details : " + user);
    res.send(user);
  } catch (e) {
    console.log("getting user details error : " + e);
    res.status(400).send(e.message);
  }
  res.send();
}

async function searchRecord(req, res) {
  try {
    const name = req.body;
    console.log(name);
    const user = await service.find({ name } )
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

async function searchByNameRecord(req, res) {
  try {
    const name = req.body["name"];
    console.log(name);
    const user = await service.findOne(name )
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
}


async function postRecord(req, res) {
  const usr = req.body;
  const record = await service.insert(usr);
  res.status(201).send(record);

  res.send();
}

async function putRecord(req, res) {
  const user = req.body;
  const record = await service.update(user);
  res.status(201).send(record);

  res.send();
}

async function deleteRecord(req, res) {
  try {
    const id = req.params.id;
    const user = await service.deleteById(id);
    res.status(400).send(user);
  } catch (e) {
    if (e.message === 'ID_NOT_FOUND') {
      res.status(400).send('invalid user id');
      return;
    }
    res.status(400).send(e.message);
  }
}

module.exports = {
  getRecord,
  getRecordById,
  searchRecord,
  searchByNameRecord,
  postRecord,
  deleteRecord,
  putRecord
};
