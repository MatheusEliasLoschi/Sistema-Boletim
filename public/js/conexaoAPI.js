/* todos os arquivos vão usar isso, serve pra conexão e busca, vou devidir js entre frontEnd e backEnd */
async function api(url, opcoes) {
const resposta = await fetch(`http://localhost:3000${url}`, opcoes);
    const dados = await resposta.json()
    if(!resposta.ok) throw new Error(dados.erro || "Erro ao acessar o servidor.")
    return dados 
}

function mostrarErro(error){
    document.getElementById("mensagem").textContent = error.message 
}