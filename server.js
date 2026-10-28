const express = require("express");
const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.json());

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/alunos', require('./routes/alunos'));
app.use('/api/turmas', require('./routes/turmas'));
/* app.use('/api/disciplinas', require('./routes/disciplinas'));
app.use('/api/matriculas', require('./routes/matriculas'));
app.use('/api/notas', require('./routes/notas'));
app.use('/api/boletim', require('./routes/boletim')); */

const port = process.env.PORT || 3000;

app.listen(3000 , () => {
    console.log("Servidor está Funcionando!");
}); 