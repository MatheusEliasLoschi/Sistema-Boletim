function criarHeader() {
    const header = document.createElement("header")
    const informacoesLinks = [
        { caminho: "../../index.html", nome: "Inicio" },
        { caminho: "alunos.html", nome: "Alunos" },
        { caminho: "matricula.html", nome: "Matriculas" },
        { caminho: "turmas.html", nome: "Turmas" },
        { caminho: "disciplina.html", nome: "Disciplinas" },
        { caminho: "notas.html", nome: "Notas" },
        { caminho: "boletim.html", nome: "Boletim" },
    ]

    for(let i = 0; i < 7; i++){
        const a = document.createElement("a")
        a.href = informacoesLinks[i].caminho
        a.textContent = informacoesLinks[i].nome
        header.appendChild(a)
    }
    document.body.insertBefore(header, document.body.firstChild)
}
window.addEventListener("load", () => {
    criarHeader()
})
