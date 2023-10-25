console.log('CRUD DOM');

// BBDD
const list = [
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
  }
];

const ulElement = document.getElementById('list-shoes');
list.forEach((shoe, index) => {
  const liElement = document.createElement('li');
  liElement.id = `list-item-${shoe.id}`;
  liElement.className = 'list-item';
  liElement.innerHTML = `
    <div class="list-item__info">
      <strong class="list-item__name">${shoe.name}</strong>
      <span class="list-item__color">${shoe.color}</span>
      <span class="list-item__price">${shoe.price}</span>
    </div>
    <div class="list-item__actions">
      <button id="btn-edit-${index}" class="btn waves-effect waves-light indigo" type="button">Editar</button>
      <button id="btn-remove-${index}" class="btn waves-effect waves-light lime" type="button">Eliminar</button>
    </div>
  `;
  ulElement.appendChild(liElement);
});
