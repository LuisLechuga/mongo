const express = require ('express');
const bodyParser = require ('body-parser');

const {Exalumno} = require('./exalumnos')

const PORT = 2000;

const app = express();

app.use (bodyParser.urlencoded({extended:true}))
app.use (bodyParser.json ())

app.get("/",(Request,Response)=>{
    Response.send({message:'Bienvenido a mi API'})
})

app.post('/create/graduate',(Request,Response)=>{
    const{nombre,generation,carrera,age,current_job,income} =Request.body;

    const newGraduate = Exalumno ({
        nombre,
        generation,
        carrera,
        age,
        current_job,
        income
    })
    newGraduate.save((err,graduate)=>{
        !err
        ? Response.status(201).send(graduate)
        : Response.status(409).send(err)

    })
});

app.get('all/graduates',(req,res)=>[
    Exalumno.find().exec()
    .then(Exalumno => res.status (200).send(exalumnos))
    .catch(err =>status(409).send(err))
]);

app.get('/graduate/:id',(req,res)=>{
    const{id} = req.params;

    Exalumno.findById(id).exec()
    .then(exalumno => exalumno ? res.status(200).send(exalumno):res.status(404).send({message:'no found'}))
    .catch(err => res.status(409).send(err));

});
                                                                                
app.get('/school/id',(Req,res)=>{
    const {id} = req.patams;
    School.findById(id).populate('graduates').exec()
    .then(school)
})


app.listen(PORT,()=>{
    console.log(`Server inicializado en el puerto`)
})
