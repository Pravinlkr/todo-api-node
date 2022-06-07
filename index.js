const express = require('express');
const app = express();
const dbConnection = require('./config')

app.use(express.json());
// get all todo list
app.get('/', (req, resp) => {
    try {
        dbConnection.query('SELECT * FROM TODOS', (err, result) => {
            if(err) {
                resp.send(err)
            } else {
                resp.status(200).send(result);
            }
        })
    } catch(error) {
        resp.status(400).send(error.message);
    }
})

// add a new todo payload = {"todoname" : "this is new todo text"}
app.post('/', (req, resp) => {
    try {
        const data = req.body;
        dbConnection.query('INSERT INTO TODOS SET ?', data, (err, result, fields) => {
             if(err) throw err;
             resp.status(200).send(result);
        })
    } catch(error) {
        resp.status(400).send(error.message);
    }
})

// edit/update a todo payload = {"todoname" : "updated todo text"}
app.put('/:id', (req, resp) => {
    try {
        const data = [req.body.todoname, req.params.id];
        dbConnection.query('UPDATE TODOS SET todoname = ? WHERE id = ?', data, (err, result, fields) => {
             if(err) throw err;
             resp.status(200).send(result);
        })
    } catch(error) {
        resp.status(400).send(error.message);
    }
})

// delete a todo
app.delete('/:id', (req, resp) => {
    try {
        const data = [req.params.id];
        dbConnection.query('DELETE FROM TODOS WHERE id = ?', data, (err, result, fields) => {
             if(err) throw err;
             resp.status(200).send(result);
        })
    } catch(error) {
        resp.status(400).send(error.message);
    }
})

app.listen(3000)