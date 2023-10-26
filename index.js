console.log('CRUD DOM');

// BBDD
const backup_list = [
  {
    id: 56412,
    name: 'Adidas F50',
    color: 'white',
    price: 110
  },
  {
    id: 16541,
    name: 'Adidas F50',
    color: 'red',
    price: 110
  },
  {
    id: 74556,
    name: 'Nike Total 90',
    color: 'black',
    price: 90
  },
  {
    id: 33551,
    name: 'Umbro Speciali',
    color: 'black',
    price: 90
  },
  {
    id: 12457,
    name: 'Adidas Predator',
    color: 'blue',
    price: 80
  },
  {
    id: 22457,
    name: 'Nike Tiempo',
    color: 'red',
    price: 70
  },
  {
    id: 54172,
    name: 'Nike Total 90',
    color: 'black',
    price: 90
  },
  {
    id: 98542,
    name: 'Nike Mercurial Vapor III',
    color: 'white',
    price: 150
  }
];
// sessionStorage.setItem('bbdd_shoes', JSON.stringify(list))

// Init
const bbddStr = sessionStorage.getItem('bbdd_shoes');
const list = JSON.parse(bbddStr) ?? backup_list;


// [DOM] Vars
const container = document.getElementById('container');
const ulElement = document.getElementById('list-shoes');

// [Helper] - COMMON
const generateLi = (shoe, index) => {
  const liElement = document.createElement('li');
  liElement.id = `list-item-${shoe.id}`;
  liElement.className = 'list-item';
  liElement.innerHTML = `
    <div class="list-item__info">
      <span class="list-item__description">
        <strong class="list-item__name">${shoe.name}</strong>
        <span class="list-item__color bg-${shoe.color}"></span>
      </span>
      <span class="list-item__price">${shoe.price} €</span>
    </div>
    <div class="list-item__actions">
      <button id="btn-edit-${index}" class="btn waves-effect waves-light indigo" type="button">Editar</button>
      <button id="btn-delete-${index}" class="btn waves-effect waves-light lime" type="button">Eliminar</button>
    </div>
  `;
  return liElement;
};

/***********************************************/

// [Helper] - DELETE
const findIndexShoeById = (id) => {
  const index = list.findIndex(shoe => shoe.id === id);
  return index;
}

// [Helper] - DELETE
const removeElement = (shoe, list, liElement) => {
  const indexToDelete = findIndexShoeById(shoe.id);
  list.splice(indexToDelete, 1);
  liElement.remove();
  sessionStorage.setItem('bbdd_shoes', JSON.stringify(list));
}

/***********************************************/

// [Helper] - ADD
const showCreateForm = () => {
  document.getElementById('create-form').classList.toggle('hide');
}

// [Helper] - ADD
const addNewShoeToList = () => {
  const name = document.getElementById('name').value;
  const color = document.getElementById('color').value;
  const price = document.getElementById('price').value;
  const id = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
  const shoe = {
    id,
    name,
    color,
    price
  }
  list.push(shoe);
  const index = list.length - 1;
  const liElement = generateLi(shoe, index);
  ulElement.appendChild(liElement);
  generateEventListeres(index, shoe, liElement);
  sessionStorage.setItem('bbdd_shoes', JSON.stringify(list));
}

/***********************************************/

// [Helper] - DOM init
const generateEventListeres = (index, shoe, liElement) => {
  const editBtn = document.getElementById('btn-edit-' + index);
  editBtn.addEventListener('click', () => {
    // TODO: editar
    console.log('edit con id', shoe);
  });
  const deleteBtn = document.getElementById('btn-delete-' + index);
  deleteBtn.addEventListener('click', () => removeElement(shoe, list, liElement));
};

/***********************************************/

// [DOM] Rellenar el DOM recorriendo el listado
list.forEach((shoe, index) => {
  const liElement = generateLi(shoe, index);
  ulElement.appendChild(liElement);
  generateEventListeres(index, shoe, liElement);
});

// [DOM] Añade en el DOM el botón de mostrar
const btnShow = document.createElement('button');
btnShow.id = 'btn-show';
btnShow.classList = 'btn waves-effect waves-light blue';
btnShow.innerText = 'Mostrar/Ocultar formulario de creación';
btnShow.addEventListener('click', () => showCreateForm());
container.appendChild(btnShow);
// [DOM] Vincula lógica de botón de crear
const btnAdd = document.getElementById('btn-add');
btnAdd.addEventListener('click', () => addNewShoeToList());


