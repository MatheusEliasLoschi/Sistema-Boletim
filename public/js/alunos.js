async function listarAlunos() {
    const alunos = await api('/api/alunos'); 
    const lista = document.getElementById('lista')
    lista.replaceChildren();
    for (const aluno of alunos) { 
        const item = document.createElement('li');
        item.textContent = `Nome: ${aluno.nome.charAt(0).toUpperCase() + aluno.nome.slice(1)} - Matrícula: ${aluno.matricula}`
        lista.appendChild(item); 
    }
}

document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const matricula = document.getElementById('matricula').value.trim();
    try {
        await api('/api/alunos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, matricula })
        });
        e.target.reset(); /* reseta o alvo clicado */
        document.getElementById('mensagem').textContent = 'Aluno cadastrado com sucesso'
        await listarAlunos();
    } catch (error) {
        mostrarErro(error);
    }
})

window.addEventListener("DOMContentLoaded", () => {
    listarAlunos()
})
console.log("ok")