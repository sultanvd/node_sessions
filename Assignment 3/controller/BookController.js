const fs = require("fs");
const router = require('express').Router();

const HEADER_DEFAULT = "Bearer user123456";

router.get('/', (req, res) => {

    const auth = req.header("Authorization");
    console.log(auth);
    if (auth && auth === HEADER_DEFAULT) {
        findAllBooks()
            .then(function (result) {
                res.status(200).send(result)
            }, function (err) {
                res.status(400).send(result)
            }).catch(function (error) {
                res.status(400).send(error);
            });
    } else {
        res.status(400).send("Bad authentication");
    }
});

router.post('/add', (req, res) => {

    const auth = req.header("Authorization");
    console.log(auth);
    if (auth && auth === HEADER_DEFAULT) {

        console.log(req.body);
        const name = req.body.book.name;
        const details = req.body.book.details;

        validateInputs(name, details)
            .then(function (result) {
                var book = {
                    "id": getNewBookId(),
                    "name": name,
                    "details": details
                }

                console.log(book)
                addObjectInFile(book)
                res.status(200).send(book)
            }, function (err) {
                res.status(400).send(err);
            });
    } else {
        res.status(400).send("Bad authentication");
    }

});


router.delete('/remove/:bookId', (req, res) => {

    const auth = req.header("Authorization");
    console.log(auth);
    if (auth && auth === HEADER_DEFAULT) {

        console.log(req.body);
        const bookId = req.params.bookId

        isBookExists(bookId)
            .then(function (result) {
                deleteObjectInFile(bookId);
                res.status(200).send("Book removed successfully");

            }, function (err) {
                res.status(400).send("No boook exists with Id");
            });
    }
    else {
        res.status(400).send("Bad authentication");
    }
});

router.put('/update/:bookId', (req, res) => {

    const auth = req.header("Authorization");
    console.log(auth);
    if (auth && auth === HEADER_DEFAULT) {
        console.log(req.body);
        const bookId = req.params.bookId
        const name = req.body.book.name;
        const details = req.body.book.details;

        console.log(bookId);

        isBookExists(bookId)
            .then(function (result) {

                validateInputs(name, details)
                    .then(function (result) {
                        var book = {
                            "id": bookId,
                            "name": name,
                            "details": details
                        }

                        console.log(book)
                        updateObjectInFile(book)
                        res.status(200).send(book)
                    }, function (err) {
                        res.status(400).send(err);
                    });

            },


                function (err) {
                    res.status(400).send("No boook exists with Id");

                });
    }
    else {
        res.status(400).send("Bad authentication");
    }

});

function addObjectInFile(book) {
    fs.readFile('books.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            obj.push(book); //add some data
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('books.json', json, 'utf8', callback => { }); // write it back 
        }
    });
}

function updateObjectInFile(book) {
    fs.readFile('books.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);

            //now it an object
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].id == book.id) {
                    obj[i].name = book.name
                    obj[i].details = book.details
                }
            }

            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('books.json', json, 'utf8', callback => { }); // write it back 
        }
    });
}

function deleteObjectInFile(bookId) {
    fs.readFile('books.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            var newObj = JSON.parse("[]");

            obj = JSON.parse(data);

            //now it an object
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].id != bookId) {
                    newObj.push(obj[i]);
                }
            }

            console.log(newObj)
            json = JSON.stringify(newObj); //convert it back to json
            fs.writeFile('books.json', json, 'utf8', callback => { }); // write it back 
        }
    });
}


function findAllBooks() {

    var promise = new Promise(function (resolve, reject) {
        const rawData = fs.readFileSync('./books.json');
        const users = JSON.parse(rawData);
        if (!users || !users.length) {
            reject(Error("No user found"));
        }
        else {
            resolve(users);
        }
    });

    return promise;
}

function validateInputs(name, details) {
    var promise = new Promise(function (resolve, reject) {
        if (!name || name === "") {
            reject(Error("Name cannot be null or empty"));
        } else if (!details || details === "") {
            reject(Error("Details cannot be null or empty"));
        } else {
            resolve(name, details);
        }
    });
    return promise;
}

function isBookExists(bookdId) {
    var promise = new Promise(function (resolve, reject) {

        fs.readFile('books.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {

                obj = JSON.parse(data);

                for (var i = 0; i < obj.length; i++) {
                    console.log("current objectId " + obj[i].id + " Book Id " + bookdId);
                    if (obj[i].id == bookdId) {
                        resolve(true);
                    }
                }
                reject(Error("No book found"));
            }
        });
    });

    return promise;
}


function getNewBookId() {
    const rawData = fs.readFileSync('./books.json');
    const users = JSON.parse(rawData);
    if (!users || !users.length) {
        return 1;
    } else {
        var user = users[users.length - 1];
        return user.id + 1;
    }
}


module.exports = router;