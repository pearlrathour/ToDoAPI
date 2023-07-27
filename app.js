const express = require("express");
const bodyParser = require("body-parser");
const con = require('./models/task')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let query = "Select * from tasks";
    let items = [];
    con.query(query, function (err, result) {
        if (err)
            throw err;
        items = result;
        console.log(items);
        res.render('list', { items: items });
    })
});

app.post('/', (req, res) => {
    console.log(req.body);
    let query = "Insert into tasks (task_name) values (?)";
    data = [[req.body.newtask]];
    con.query(query, data, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    })
});

app.get('/:completed/:id', function (req, res) {
    const id = req.params.id;

    let query = `UPDATE tasks SET completed = true WHERE id =${id}`;
    con.query(query, function (err, result) {
        if (err) throw err;
        let selectQuery = `SELECT * FROM tasks WHERE id = ${id}`;
        con.query(selectQuery, function (err, task) {
            if (err) throw err;
            res.send(task[0]);
        });
    });
});

app.get('/:id', function (req, res) {
    let query = `DELETE FROM tasks WHERE id = ${req.params.id}`;
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("Successfully deleted the task");
        res.redirect('/');
    });
});

app.listen(3000);