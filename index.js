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

// Init
const bbddStr = sessionStorage.getItem('bbdd_shoes');
const list = JSON.parse(bbddStr) ?? backup_list;
// sessionStorage.setItem('bbdd_shoes', JSON.stringify(list))

// [DOM] Helpers
const updateSelect = (select) => {
  var instance = M.FormSelect.getInstance(select);
  instance.destroy();
  var selects = document.querySelectorAll('select');
  M.FormSelect.init(selects);
};


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
const openModal = () => {
  // Close modal
  const modal = document.getElementById('create-and-edit-form');
  const instance = M.Modal.getInstance(modal);
  instance.open();
  document.getElementById('btn-edit').classList.add('hide');
  document.getElementById('btn-add').classList.remove('hide');
  document.getElementById('name').value = '';
  const select = document.getElementById('color');
  select.value = '';
  updateSelect(select);
  document.getElementById('price').value = '';
}

// [Helper] - GENERATE ID
const generateID = () => {
  let id = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
  const alredyExist = list.find(shoe => shoe.id === id);
  if (alredyExist) {
    id = generateID(); // Recursividad
  }
  return id; // Patada de Inception parriba! :)
}

// [Helper] - ADD
const addNewShoeToList = () => {
  const name = document.getElementById('name').value;
  const color = document.getElementById('color').value;
  const price = document.getElementById('price').value;
  const id = generateID();
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

// [Helper] - EDIT
const editElement = (shoe) => {
  // Open modal
  const modal = document.getElementById('create-and-edit-form');
  const instance = M.Modal.getInstance(modal);
  instance.open();
  // Init modal
  document.getElementById('btn-edit').classList.remove('hide');
  document.getElementById('btn-add').classList.add('hide');
  document.getElementById('id').value = shoe.id;
  document.getElementById('name').value = shoe.name;
  const select = document.getElementById('color');
  select.value = shoe.color;
  updateSelect(select);
  document.getElementById('price').value = shoe.price;
  M.updateTextFields();
}

// [Helper] - EDIT
const editShoeInList = () => {
  const id = parseInt(document.getElementById('id').value);
  const name = document.getElementById('name').value;
  const color = document.getElementById('color').value;
  const price = document.getElementById('price').value;

  const editShoe = {
    id,
    name,
    color,
    price
  }
  const indexToEdit = findIndexShoeById(id);
  list.splice(indexToEdit, 1, editShoe);
  sessionStorage.setItem('bbdd_shoes', JSON.stringify(list));

  const liElement = document.getElementById(`list-item-${id}`);
  liElement.querySelector('.list-item__name').innerText = name;
  liElement.querySelector('.list-item__color').className = `list-item__color bg-${color}`;
  liElement.querySelector('.list-item__price').innerText = price + ' €';
  // Close modal
  const modal = document.getElementById('create-and-edit-form');
  const instance = M.Modal.getInstance(modal);
  instance.close();
}

/***********************************************/

// [Helper] - DOM init
const generateEventListeres = (index, shoe, liElement) => {
  const editBtn = document.getElementById('btn-edit-' + index);
  editBtn.addEventListener('click', () => editElement(shoe));
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

// [DOM] Vincula lógica de botón para abrir la modal
const btnModal = document.getElementById('btn-modal');
btnModal.addEventListener('click', () => openModal());
// [DOM] Vincula lógica de botón de crear
const btnAdd = document.getElementById('btn-add');
btnAdd.addEventListener('click', () => addNewShoeToList());
// [DOM] Vincula lógica de botón de editar
const btnEdit = document.getElementById('btn-edit');
btnEdit.addEventListener('click', () => editShoeInList());

// Init MaterializeCSS
document.addEventListener('DOMContentLoaded', function() {
  var selects = document.querySelectorAll('select');
  M.FormSelect.init(selects);
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
});