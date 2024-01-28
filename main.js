import * as mysql from "mysql2";
import express from "express";

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "studentdb",
    port: 3306,
});


connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL");
        return;
    }
    console.log("connected to MYSQL database as mysql2");
})


const app = express();
app.use(express.json());
const PORT = 8000;
app.post("/students",(req,res)=>{
    const name=req.body.name;
    const program=req.body.program;
    let sql=`insert into student(st_name,st_program) values('${name}','${program}')`;

    connection.execute(sql,(err,results,fields)=>{
    res.json(results);
    });
});
 

// to put data in database
app.put("/students/:id",(req,res)=>{
    const id=req.params.id;
    const name=req.body.name;
    const program=req.body.program;
    let sql=`update student set st_name='${name}', st_program='${program}' where st_id=${id}`;
    connection.execute(sql,(err,results,fields)=>{

        if(err){
            console.log(err);
        }
        res.json(results);
    })
});

// to delete data from database
app.delete("/students/:id",(req,res)=>{
    const id=req.params.id;
    const name=req.body.name;
    const program=req.body.program;
    let sql=`delete from student where st_id=${id}`;
    connection.execute(sql,(err,results,fields)=>{

        if(err){
            console.log(err);
        }
        res.json(results);
    })
});

app.get("/students", (req, res) => {
    let sql = "select * from student;";
    connection.query(sql, (err, results, fields) => {
        console.log(results);
        res.json(results);
    });
});

// to get data
app.get("/student/:id", (req, res) => {
    const id = req.params.id;
    let sql = `select * from student where st_id=${id}`;
    connection.query(sql, (err, results, fields) => {
        console.log(id);
        res.json(results);
    });
});


app.listen(PORT, () => {
    console.log("app is running:", PORT);
});

