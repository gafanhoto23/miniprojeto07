"use strict";

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () => {
  clearFields();
  document.getElementById("modal").classList.remove("active");
};
//Funçao que cria um objeto de aluno
const tempAluno = {
  nome: "Isaias",
  email: "I.oliveiraa02@gmail.com",
  celular: "21980864994",
  cidade: "rio",
};
//funçao para trazer cliente
const getLocalStorage = () => JSON.parse(localStorage.getItem("dbAluno")) ?? [];

//funçao para enviar
const setLocalStorage = (dbAluno) =>
  localStorage.setItem("dbAluno", JSON.stringify(dbAluno));
//CRUD - creat read upadte delete

const deleteAluno = (index) => {
  const dbAluno = readAluno();
  dbAluno.splice(index, 1);
  setLocalStorage(dbAluno);
};

const upadteAluno = (index, aluno) => {
  const dbAluno = readAluno();
  dbAluno[index] = aluno;
  setLocalStorage(dbAluno);
};

//Serve para ler dados
const readAluno = () => getLocalStorage();

//CRUD, CREATE Funçao que pega o obejto e manda para localStorage
const createAluno = (aluno) => {
  const dbAluno = getLocalStorage();
  dbAluno.push(aluno);
  setLocalStorage(dbAluno);
};

//forma de validar de todos os campos foram, junto com required,
const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};
//Limpando os campos do modal
const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((field) => (field.value = ""));
};

//Interaçao com layout
const salvarAluno = () => {
  if (isValidFields()) {
    const aluno = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      celular: document.getElementById("celular").value,
      cidade: document.getElementById("cidade").value,
    };
    const index = document.getElementById("nome").dataset.index;
    if (index == "new") {
      createAluno(aluno);
      upadteTable();
      closeModal();
    } else {
      upadteAluno(index, aluno);
      upadteTable();
      closeModal();
    }
  }
};

//apagando os dados da tabela
const clearTable = () => {
  const rows = document.querySelectorAll("#tableAluno>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

//funçao que atulizado dadodos do cliente
const upadteTable = () => {
  const dbAluno = readAluno();
  clearTable();
  //pega cada cliente e cria um linha
  dbAluno.forEach(createRow);
};

//criado um linha vazinha,prencheu elas com td depois inseriu no tbody, index para difrenciar o click do button
const createRow = (aluno, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `     
  <td>${aluno.nome}</td>
  <td>${aluno.email}</td>
  <td>${aluno.celular}</td>
  <td>${aluno.cidade}</td>
  <td>


  <button type="button" class="button green" id="edit-${index}"  >Editar</button>
  <button type="button" class="button red" id="delete-${index}" >Excluir</button>
</td> `;

  //acima criado dois atributos pernonalizados data-action="delete"

  document.querySelector("#tableAluno>tbody").appendChild(newRow);
};

const fillFields = (aluno) => {
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("email").value = aluno.email;
  document.getElementById("celular").value = aluno.celular;
  document.getElementById("cidade").value = aluno.cidade;
  document.getElementById("nome").dataset.index = aluno.index;
};

const editAluno = (index) => {
  const aluno = readAluno()[index];
  aluno.index = index;
  fillFields(aluno);
  openModal();
};

// forma de pegar o click do button
const editDelete = (event) => {
  if (event.target.type == "button") {
    const [action, index] = event.target.id.split("-");

    if (action == "edit") {
      editAluno(index);
    } else {
      const aluno = readAluno()[index];
      const reponse = confirm(`Deseja realmente excluir o aluno ${aluno.nome}`);
      if (reponse) {
        deleteAluno(index);
        upadteTable();
      }
    }
  }
};

upadteTable();

//Eventos
document.getElementById("cadastrarAluno").addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

document.getElementById("salvar").addEventListener("click", salvarAluno);

document
  .querySelector("#tableAluno>tbody")
  .addEventListener("click", editDelete);
