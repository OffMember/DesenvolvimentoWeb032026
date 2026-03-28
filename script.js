let tarefas = []

let titulo = document.querySelector("#titulo")
let descricao = document.querySelector("#descricao")
let prioridade = document.querySelector("#prioridade")
let botao = document.querySelector("#add")
let lista = document.querySelector("#lista")
let buscar = document.querySelector("#buscar")

let dados = localStorage.getItem("tarefas")

if(dados){
tarefas = JSON.parse(dados)
mostrarTarefas()
}

botao.addEventListener("click", function(){

let t = titulo.value
let d = descricao.value
let p = prioridade.value

if(t.trim() == "" || d.trim() == ""){
alert("Preencha título e descrição")
return
}

let tarefa = {
titulo:t,
descricao:d,
prioridade:p,
status:"pendente",
data: new Date().toLocaleDateString()
}

tarefas.push(tarefa)

salvar()
mostrarTarefas()

titulo.value=""
descricao.value=""

})

function salvar(){
localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function mostrarTarefas(){

lista.innerHTML=""

if(tarefas.length == 0){
lista.innerHTML="<p>nenhuma tarefa cadastrada</p>"
return
}

for(let i=0;i<tarefas.length;i++){

let tarefa = tarefas[i]

let li = document.createElement("li")

if(tarefa.prioridade == "Alta"){
li.classList.add("prioridade-alta")
}

if(tarefa.prioridade == "Media"){
li.classList.add("prioridade-media")
}

if(tarefa.prioridade == "Baixa"){
li.classList.add("prioridade-baixa")
}

if(tarefa.status == "concluida"){
li.classList.add("tarefa-concluida")
}

li.innerHTML = `
<strong>${tarefa.titulo}</strong><br>
${tarefa.descricao}<br>
Prioridade: ${tarefa.prioridade}<br>
Criado em: ${tarefa.data}<br>

Status: <span class="${tarefa.status == "pendente" ? "status-pendente" : "status-concluido"}">
<strong>${tarefa.status}</strong>
</span>

<div class="botoes">
<button onclick="concluir(${i})">Concluir</button>
<button onclick="editar(${i})">Editar</button>
<button onclick="remover(${i})">Excluir</button>
</div>
`

lista.appendChild(li)

}

}

function concluir(i){

if(tarefas[i].status == "pendente"){
tarefas[i].status = "concluido"
}else{
tarefas[i].status = "pendente"
}

salvar()
mostrarTarefas()

}

function remover(i){

tarefas.splice(i,1)

salvar()
mostrarTarefas()

}

function editar(i){

let novoTitulo = prompt("Novo titulo", tarefas[i].titulo)
let novaDesc = prompt("Nova descricao", tarefas[i].descricao)

if(novoTitulo){
tarefas[i].titulo = novoTitulo
}

if(novaDesc){
tarefas[i].descricao = novaDesc
}

salvar()
mostrarTarefas()

}

buscar.addEventListener("keyup", function(){

let texto = buscar.value.toLowerCase()

let itens = lista.querySelectorAll("li")

let achou = false

for(let i=0;i<itens.length;i++){

let conteudo = itens[i].innerText.toLowerCase()

if(conteudo.includes(texto)){
itens[i].style.display="block"
achou = true
}else{
itens[i].style.display="none"
}

}

let aviso = document.querySelector("#aviso")

if(!achou){
if(!aviso){
let p = document.createElement("p")
p.id = "aviso"
p.textContent = "Não foi possível achar nenhum resultado"
lista.appendChild(p)
}
}else{
if(aviso){
aviso.remove()
}
}

})