const express = require("express")
const router = express.Router()
const pool = require('../public/databases/db')

async function buscarSeries() {
    const sql = "SELECT id, nomeSerie AS nome FROM series"
    const [resultado] = await pool.query(sql)
    return resultado
}

async function inserirTurma(serie_id, turma, ano) {
    try {
        const sql = 'INSERT INTO turmas (serie_id, turma, ano) VALUES (?, ?, ?)'
        const dados = [serie_id, turma, ano]
        const [resultado] = await pool.query(sql, dados)
        return resultado
    } catch (error) {
        console.log(error)
    }
}

async function buscarTurmas() {
    try {
        const sql = "SELECT turmas.id, series.nomeSerie AS serie, turmas.turma AS nome, turmas.ano FROM turmas INNER JOIN series ON turmas.serie_id = series.id;"
        const [resultado] = await pool.query(sql)
        return resultado
    } catch (error) {
        console.log(error)
    }
}

router.post('/', async (req, res) => {
    try {
        const { serie_id, turma, ano } = req.body
        const resultado = await inserirTurma(serie_id, turma, ano)

        if (resultado.affectedRows > 0) {
            res.status(201).json({
                mensagem: "Turma cadastrada com sucesso"
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

router.get('/series', async (req, res) => {
    const dados = await buscarSeries()
    res.json(dados)
})

router.get('/', async (req, res) => {
    try {
        const dados = await buscarTurmas()
        res.json(dados)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router