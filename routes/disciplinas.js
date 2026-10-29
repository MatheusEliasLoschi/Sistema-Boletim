const express = require("express")
const router = express.Router()
const pool = require('../public/databases/db')


async function inserirDisciplinas(disciplina) {
    const sql = "INSERT INTO disciplinas (nome) VALUES (?)"
    const dados = [disciplina]
    const [resultado] = await pool.query(sql, dados)
    return resultado
}

async function inserirAssociacao(turma_id, disciplina_id) {
    const sql = "INSERT INTO turma_disciplinas (turma_id, disciplina_id) VALUES (?, ?)";
    const dados = [turma_id, disciplina_id];
    const [resultado] = await pool.query(sql, dados);
    return resultado;
}

async function buscarDisciplinas() {
    try {
        const sql = "SELECT * from disciplinas"
        const [resultado] = await pool.query(sql)
        return resultado
    } catch (error) {
        console.log(error)
    }
}

async function buscarAssociacao() {
    try {
        const sql = "SELECT series.nomeSerie AS serie, turmas.turma, turmas.ano, disciplinas.nome AS disciplina FROM turma_disciplinas INNER JOIN turmas ON turma_disciplinas.turma_id = turmas.id INNER JOIN series ON turmas.serie_id = series.id INNER JOIN disciplinas ON turma_disciplinas.disciplina_id = disciplinas.id;"
        const [resultado] = await pool.query(sql)
        return resultado
    } catch (error) {
        console.log(error)
    }
}
router.post('/', async (req, res) => {
    try {
        const { disciplina } = req.body
        const resultado = await inserirDisciplinas(disciplina)

        if (resultado.affectedRows > 0) {
            res.status(201).json({
                mensagem: "Disciplina cadastrado com sucesso"
            })
        }
        else {
            res.json({
                mensagem: "ERRO"
            })
        }
    }
    catch (error) {
        console.log(error)
    }
})

router.get("/", async (req, res) => {
    try {
        const dados = await buscarDisciplinas()
        res.json(dados)
    } catch (error) {
        console.log(error)
    }
})

router.post('/associar', async (req, res) => {
    try {
        const { turma_id, disciplina_id } = req.body;
        const resultado = await inserirAssociacao(turma_id, disciplina_id);

        if (resultado.affectedRows > 0) {
            res.status(201).json({
                mensagem: "Disciplina associada com sucesso"
            });
        } else {
            res.status(400).json({
                erro: "Não foi possível associar a disciplina."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            erro: "Erro ao associar disciplina à turma."
        });
    }
});

router.get('/associar', async (req, res) => {
    try {
        const dados = await buscarAssociacao()
        res.json(dados)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router