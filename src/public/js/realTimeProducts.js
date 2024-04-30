const socket = io();

const btnAgregar = document.getElementById('agregar');
const btnEliminar = document.getElementById('eliminar');
const btnModificar = document.getElementById('modificar');


    btnAgregar.addEventListener('click', async () => {
        const product = {
            title: document.getElementById('AddName').value,
            description: document.getElementById('AddDescription').value,
            price: document.getElementById('AddName').value,
            code: document.getElementById('AddCode').value,
            stock: document.getElementById('AddStock').value,
            status:true,
            category: document.getElementById('AddCategory').value
        }
        socket.emit('agregarProd', product);
    })
    btnEliminar.addEventListener('click', async () => {
        const id = document.getElementById('DelateId').value
        const idNumber = parseInt(id);
        socket.emit('eliminarProd', idNumber);
    });

    btnModificar.addEventListener('click', async () => {
        const product = {
            title: document.getElementById('ModName').value,
            price: document.getElementById('ModPrice').value,
            description: document.getElementById('ModDescription').value,
            code: document.getElementById('ModCode').value,
            stock: document.getElementById('ModStock').value,
            category: document.getElementById('ModCategory').value,
            id: document.getElementById('ModId').value
        }
        socket.emit('modificarProd', product);
    });




socket.on('Lista-Modificada', (productos) => {
    const listaProductos = document.getElementById('Realtimeprod');
    console.log(productos);
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <h2>${producto.title}</h2>
            <h3>ID: ${producto.id}</h3>
            <p>Descripcion: ${producto.description}</p>
            <p>Precio: ${producto.price}</p>
            <p>Código: ${producto.code}</p>
            <p>Stock: ${producto.stock}</p>
        `;
        listaProductos.appendChild(productoDiv);
    });
});