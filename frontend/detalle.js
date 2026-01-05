const API_URL = 'http://localhost:1250/api/juegos';

// Obtener ID del juego desde la URL
const urlParams = new URLSearchParams(window.location.search);
const juegoId = urlParams.get('id');

// Cargar detalles del juego
async function cargarDetalle() {
    if (!juegoId) {
        alert('No se especificó un juego');
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${juegoId}`);
        if (!response.ok) {
            throw new Error('Juego no encontrado');
        }
        const juego = await response.json();
        mostrarDetalle(juego);
    } catch (error) {
        console.error('Error cargando detalle:', error);
        alert('Error al cargar el juego');
        window.location.href = 'index.html';
    }
}

function mostrarDetalle(juego) {
    document.getElementById('juego-id').textContent = juego._id;
    document.getElementById('juego-nombre').textContent = juego.nombre;
    document.getElementById('juego-categoria').textContent = juego.categoria;
    document.getElementById('juego-descripcion').textContent = juego.descripcion;
    document.getElementById('juego-precio').textContent = `$${Number(juego.precio).toFixed(2)}`;
    document.getElementById('juego-stock').textContent = juego.stock;
    document.getElementById('juego-imagen').src = juego.imagen;
    document.getElementById('juego-imagen').alt = juego.nombre;

    // Mostrar plataformas
    const plataformasContainer = document.getElementById('juego-plataformas');
    plataformasContainer.innerHTML = '';
    if (juego.plataformas && juego.plataformas.length > 0) {
        juego.plataformas.forEach(plataforma => {
            const tag = document.createElement('div');
            tag.className = 'plataforma-tag';
            tag.textContent = plataforma;
            plataformasContainer.appendChild(tag);
        });
    }

    // Mostrar fecha si existe
    if (juego.fechaCreacion) {
        const fecha = new Date(juego.fechaCreacion).toLocaleDateString('es-ES');
        document.getElementById('juego-fecha').textContent = `Agregado: ${fecha}`;
    }
}

async function editarJuegoActual() {
    window.location.href = `index.html?editar=${juegoId}`;
}

async function eliminarJuegoActual() {
    if (!confirm('¿Estás seguro de que quieres eliminar este juego?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${juegoId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('✅ Juego eliminado exitosamente');
            window.location.href = 'index.html';
        } else {
            alert('❌ Error al eliminar el juego');
        }
    } catch (error) {
        console.error('Error eliminando juego:', error);
        alert('Error al eliminar el juego');
    }
}

// Cargar al iniciar
document.addEventListener('DOMContentLoaded', cargarDetalle);