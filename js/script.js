//Monitorando o formulario
const search = document.querySelector('#search');
const submit = document.querySelector('#submit');

//Monitorando informações na dom
const usersFound = document.querySelector('#usersFound');
const statisticsFound = document.querySelector('#statisticsFound');

//Monitorando dados
const usersFiltred = document.querySelector('#usersFiltred');
const filtredStatistics = document.querySelector('#filtredStatistics');

//Buscando dados da API
async function fetchPeople() {
  //prettier-ignore
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  //Transformando em JSON
  const json = await res.json();
  //filtrando os dados importantes para o projeto
  const allPeopleFind = json.results.map((people) => {
    const { gender, name, dob, picture } = people;
    return {
      picture: picture.medium,
      name: `${name.first} ${name.last}`,
      age: dob.age,
      gender,
    };
  });
  console.log(allPeopleFind);
  return allPeopleFind;
}

function load() {
  //Tirando evento padrão do botão de busca
  submit.addEventListener('click', (event) => {
    event.preventDefault();
  });
  search.addEventListener('keyup', (event) => {
    event.preventDefault();
    //Analisando o valor do search
    if (search.value === '') {
      usersFiltred.innerHTML = '';
      filtredStatistics.innerHTML = '';
      const notFoundUser = document.querySelector('#notFoundUser');
    }
  });
}

load();
