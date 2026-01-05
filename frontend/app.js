const API_URL = 'http://localhost:1250/api/juegos';

// Cargar juegos al iniciar
document.addEventListener('DOMContentLoaded', cargarJuegos);

// ============ FUNCIONES CRUD ============

// CREATE & READ - Cargar todos los juegos
async function cargarJuegos() {
    try {
        const response = await fetch(API_URL);
        const juegos = await response.json();
        mostrarJuegos(juegos);
    } catch (error) {
        console.error('Error cargando juegos:', error);
        alert('Error al cargar los juegos');
    }
}

// Mostrar juegos en el DOM
function mostrarJuegos(juegos) {
    const lista = document.getElementById('juegos-lista');
    lista.innerHTML = '';
    
    juegos.forEach(juego => {
        const juegoDiv = document.createElement('div');
        juegoDiv.className = 'juego';
        juegoDiv.style.cursor = 'pointer';
        juegoDiv.onclick = (e) => {
            // No redirigir si se hace clic en los botones
            if (!e.target.classList.contains('btn-editar') && !e.target.classList.contains('btn-eliminar')) {
                window.location.href = `detalle.html?id=${juego._id}`;
            }
        };
        juegoDiv.innerHTML = `
            <div class="juego-info">
                <div class="categoria">${juego.categoria}</div>
                <div class="nombre-juego">${juego.nombre}</div>
                <div class="descripcion">${juego.descripcion}</div>
                <div class="juego-footer">
                    <div class="precio">$${Number(juego.precio).toFixed(2)}</div>
                    <div class="stock">Stock: ${juego.stock}</div>
                    <button class="btn-editar" onclick="event.stopPropagation(); editarJuego('${juego._id}')">Editar</button>
                    <button class="btn-eliminar" onclick="event.stopPropagation(); eliminarJuego('${juego._id}')">Eliminar</button>
                </div>
            </div>
            <div class="juego-imagen">
                <img src="${juego.imagen}" alt="${juego.nombre}">
            </div>
        `;
        lista.appendChild(juegoDiv);
    });
}

// CREATE - Agregar nuevo juego
async function agregarJuego(datosJuego) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosJuego)
        });
        
        if (response.ok) {
            alert('✅ Juego agregado exitosamente');
            cargarJuegos();
            cerrarFormulario();
        } else {
            alert('❌ Error al agregar el juego');
        }
    } catch (error) {
        console.error('Error agregando juego:', error);
        alert('Error al agregar el juego');
    }
}

// READ - Obtener un juego específico
async function obtenerJuego(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error obteniendo juego:', error);
        return null;
    }
}

// UPDATE - Actualizar juego
async function actualizarJuego(id, datosJuego) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosJuego)
        });
        
        if (response.ok) {
            alert('✅ Juego actualizado exitosamente');
            cargarJuegos();
            cerrarFormulario();
        } else {
            alert('❌ Error al actualizar el juego');
        }
    } catch (error) {
        console.error('Error actualizando juego:', error);
        alert('Error al actualizar el juego');
    }
}

// DELETE - Eliminar juego
async function eliminarJuego(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este juego?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('✅ Juego eliminado exitosamente');
            cargarJuegos();
        } else {
            alert('❌ Error al eliminar el juego');
        }
    } catch (error) {
        console.error('Error eliminando juego:', error);
        alert('Error al eliminar el juego');
    }
}

// ============ FUNCIONES DE INTERFAZ ============

// Mostrar formulario para agregar
function mostrarFormulario() {
    document.getElementById('form-titulo').textContent = 'Agregar Juego';
    document.getElementById('juego-form').reset();
    document.getElementById('juego-id').value = '';
    document.getElementById('formulario-modal').classList.remove('oculto');
    document.getElementById('formulario-modal').classList.add('activo');
}

// Mostrar formulario para editar
async function editarJuego(id) {
    const juego = await obtenerJuego(id);
    if (!juego) return;
    
    document.getElementById('form-titulo').textContent = 'Editar Juego';
    document.getElementById('juego-id').value = juego._id;
    document.getElementById('nombre').value = juego.nombre;
    document.getElementById('categoria').value = juego.categoria;
    document.getElementById('descripcion').value = juego.descripcion;
    document.getElementById('precio').value = juego.precio;
    document.getElementById('imagen').value = juego.imagen;
    document.getElementById('plataformas').value = juego.plataformas.join(', ');
    document.getElementById('stock').value = juego.stock;
    
    document.getElementById('formulario-modal').classList.remove('oculto');
    document.getElementById('formulario-modal').classList.add('activo');
}

// Cerrar formulario
function cerrarFormulario() {
    document.getElementById('formulario-modal').classList.remove('activo');
    document.getElementById('formulario-modal').classList.add('oculto');
    document.getElementById('juego-form').reset();
}

// Manejar envío del formulario
document.getElementById('juego-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const plataformasTexto = document.getElementById('plataformas').value;
    const plataformasArray = plataformasTexto.split(',').map(p => p.trim()).filter(p => p);
    
    const datosJuego = {
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value),
        imagen: document.getElementById('imagen').value,
        plataformas: plataformasArray,
        stock: parseInt(document.getElementById('stock').value)
    };
    
    const id = document.getElementById('juego-id').value;
    
    if (id) {
        // Actualizar
        await actualizarJuego(id, datosJuego);
    } else {
        // Crear
        await agregarJuego(datosJuego);
    }
});

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('formulario-modal');
    if (event.target === modal) {
        cerrarFormulario();
    }
}