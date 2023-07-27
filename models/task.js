var mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Enter your password",
    database: "todo_db"
})

con.connect(function (err) {
    if (err) throw err;
    // console.log("Connected to the database!");

    let query = "Create database if not exists todo_db ";
    con.query(query, (err, result) => {
        if (err) throw err;
        // console.log("Databse created")
    })

    query = "Create table if not exists tasks (id int Not NULL Primary Key Auto_Increment, task_name VARCHAR(255), completed boolean default false, created_at Timestamp default current_timestamp())";
    con.query(query, function (err, result) {
        if (err) throw err;
        // console.log("Table created");
        // console.log(result);
    });
});
module.exports = con;