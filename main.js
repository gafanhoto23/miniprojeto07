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

