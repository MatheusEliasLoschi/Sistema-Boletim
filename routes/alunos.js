const express = require("express")
const router = express.Router()
const pool = require('../public/databases/db')

async function inserirAluno(nome, matricula) {
    try {
        const sql = 'INSERT INTO alunos (nome, matricula) VALUES (?, ?)'
        const dados = [nome, matricula]
        const [resultado] = await pool.query(sql, dados)
        return resultado
    } catch (error) {
        console.log(error)
    }
}

async function buscarAlunos() {
    try {
        const sql = "SELECT * FROM alunos"
        const [resultado] = await pool.query(sql)
        return resultado
    } catch (error) {
        console.log(error)
    }
}
router.post('/', async (req, res) => {
    try {
        const { nome, matricula } = req.body
        const resultado = await inserirAluno(nome, matricula)

        if (resultado.affectedRows > 0) {
            res.status(201).json({
                mensagem: "Aluno cadastrado com sucesso"
            })
        }
        else {
            res.json({
                mensagem: "ERRO"
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const dados = await buscarAlunos()
        res.json(dados)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router