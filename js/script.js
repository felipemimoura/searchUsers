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
  return allPeopleFind;
}

//Filtro de usuários
function filterUsers(results, indice) {
  const users = results.filter((person) => {
    return person.name.toLowerCase().includes(indice.toLowerCase());
  });
  return users;
}

function noLetter(letter) {
  search.addEventListener('keyup', () => {
    if (search.value === '') {
      letter.innerHTML = '';
    }
  });
}

//Renderizando usuarios
function renderUser(users) {
  let usersHTML = '<div>';
  let countUsers = 0;

  users.forEach((person) => {
    const { name, picture, age } = person;

    const renderHTML = `
    <div class='users>
      <img src="${picture}" alt="${name}" />
      <span>${name}, ${age} anos </span>
    </div>`;

    usersHTML += renderHTML;
    countUsers += 1;
  });
  usersHTML += '</div>';
  usersFiltred.innerHTML = usersHTML;
  usersFound.innerHTML = `${countUsers} usuário(s) encontrados(s)`;

  noLetter(usersFound);

  const notFoundUser = document.querySelector('#notFoundUser');
  noUserFound.innerHTML = '';
}

//renderizando estatisticas
function renderStatistic(users) {
  let renderHTML = '<div>';
  let countMale = 0,
    countFemale = 0;
  let sumAge = 0;
  averageAge = 0;

  let countUsers = 0;

  users.forEach((person) => {
    const { age, gender } = person;

    gender === 'male' ? (countMale += 1) : (countFemale += 1);
    sumAge += age;

    countUsers += 1;
  });
  averageAge = sumAge / countUsers;
  averageAge = averageAge.toFixed(2);
  renderHTML += `
            <div><p>Sexo Masculino: ${countMale}</p></div>
            <div><p>Sexo Feminino: ${countFemale}</p></div>
            <div><p>Soma das idades: ${sumAge}</p></div>
            <div><p>Média das idades: ${averageAge}</p></div>
  `;
  statisticsFound.innerHTML = 'Estatísticas';
  renderHTML += '</div>';
  filtredStatistics.innerHTML = renderHTML;

  noLetter(statisticsFound);

  const notStatisticsFound = document.querySelector('#notStatisticsFound');
  notStatisticsFound.innerHTML = '';
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
      //Monitorando o html
      const notFoundUser = document.querySelector('#notFoundUser');
      const notStatisticsFound = document.querySelector('#notStatisticsFound');
      //Mostrando mensagem no HTML
      notFoundUser.innerHTML = 'Nada encontrado';
      notStatisticsFound.innerHTML = 'Nenhuma estatística encontrada';
    } else {
      fetchPeople()
        .then((results) => {
          const users = filterUsers(results, search.value);

          renderUser(users);
          renderStatistic(users);
        })
        .catch((error) => {});
    }
  });
}

load();
