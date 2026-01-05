# 🎮 Tienda de Juegos - Aplicación Web CRUD

Aplicación web full-stack para gestionar un catálogo de videojuegos con operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar).

## 📋 Características

- ✅ Catálogo de juegos con diseño moderno y minimalista
- ✅ Agregar nuevos juegos al catálogo
- ✅ Editar información de juegos existentes
- ✅ Eliminar juegos del catálogo
- ✅ Ver detalles completos de cada juego
- ✅ Interfaz responsive para móviles y desktop
- ✅ Almacenamiento persistente con MongoDB

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **CORS** - Middleware para permitir solicitudes entre dominios

### Frontend
- **HTML5** - Estructura de la aplicación
- **CSS3** - Estilos y diseño responsive
- **JavaScript (Vanilla)** - Lógica del frontend
- **Fetch API** - Comunicación con el backend

## 📦 Estructura del Proyecto
```
tienda_juegos/
├── backend/
│   ├── data/
│   │   └── juegos.json
│   ├── node_modules/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
└── frontend/
    ├── index.html
    ├── detalle.html
    ├── app.js
    ├── detalle.js
    └── styles.css
```

## 🚀 Instalación y Configuración

### 1. Prerequisitos

Asegúrate de tener instalado:
- **Node.js** (v14 o superior) - [Descargar aquí](https://nodejs.org/)
- **MongoDB Community Server** - [Descargar aquí](https://www.mongodb.com/try/download/community)

### 2. Instalar MongoDB

#### En Windows:
1. Descarga el instalador de MongoDB desde [mongodb.com](https://www.mongodb.com/try/download/community)
2. Ejecuta el instalador y sigue las instrucciones
3. Durante la instalación, selecciona "Install MongoDB as a Service"
4. Deja las opciones por defecto

#### Verificar instalación:
```bash
mongod --version
```

### 3. Iniciar MongoDB

#### En Windows (si se instaló como servicio):
MongoDB se inicia automáticamente. Para verificar:
```bash
# Abrir PowerShell como administrador
Get-Service MongoDB
```

Si no está corriendo:
```bash
net start MongoDB
```

#### Manualmente (si NO se instaló como servicio):
```bash
mongod
```

### 4. Instalar dependencias del proyecto
```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install
```

Esto instalará:
- express@^4.18.2
- mongodb@^6.3.0
- cors@^2.8.5
- dotenv@^16.0.3

## 🗄️ Configuración de MongoDB

### 1. Abrir MongoDB Shell
```bash
mongosh
```

### 2. Crear la base de datos
```javascript
// Cambiar a la base de datos (se crea automáticamente si no existe)
use tienda_juegos
```

### 3. Crear la colección de juegos
```javascript
// Crear la colección
db.createCollection("juegos")
```

### 4. Insertar datos de ejemplo
```javascript
db.juegos.insertMany([
  {
    nombre: "The Witcher 3: Wild Hunt",
    categoria: "RPG",
    descripcion: "Juego de rol de mundo abierto épico",
    precio: 39.99,
    imagen: "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png",
    plataformas: ["PC", "PS5", "Xbox"],
    stock: 50
  },
  {
    nombre: "Cyberpunk 2077",
    categoria: "RPG",
    descripcion: "RPG de acción futurista en Night City",
    precio: 59.99,
    imagen: "https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cKZ4tKNFj9C00giTzYtH8PF1.png",
    plataformas: ["PC", "PS5", "Xbox"],
    stock: 30
  },
  {
    nombre: "Elden Ring",
    categoria: "Acción",
    descripcion: "Souls-like de mundo abierto",
    precio: 59.99,
    imagen: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png",
    plataformas: ["PC", "PS5", "Xbox"],
    stock: 45
  },
  {
    nombre: "God of War",
    categoria: "Aventura",
    descripcion: "Aventura mitológica nórdica",
    precio: 49.99,
    imagen: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png",
    plataformas: ["PC", "PS5"],
    stock: 35
  }
])
```

### 5. Verificar que los datos se insertaron correctamente
```javascript
// Ver todos los juegos
db.juegos.find().pretty()

// Contar documentos
db.juegos.countDocuments()

// Salir de mongosh
exit
```

## ▶️ Ejecutar la Aplicación

### 1. Iniciar el servidor backend
```bash
# Desde la carpeta backend
cd backend
npm start
```

Deberías ver:
```
✅ Conectado a MongoDB
🚀 Servidor corriendo en http://localhost:1250
```

### 2. Abrir la aplicación en el navegador
```
http://localhost:1250
```

## 📖 Uso de la Aplicación

### Ver Catálogo
- La página principal muestra todos los juegos disponibles
- Haz clic en cualquier juego para ver sus detalles completos

### Agregar Juego
1. Haz clic en el botón **"+ Agregar Juego"**
2. Completa el formulario con:
   - Nombre del juego
   - Categoría
   - Descripción
   - Precio
   - URL de la imagen
   - Plataformas (separadas por coma)
   - Stock
3. Haz clic en **"Guardar"**

### Editar Juego
1. Haz clic en el botón **"Editar"** del juego que deseas modificar
2. Actualiza la información en el formulario
3. Haz clic en **"Guardar"**

### Eliminar Juego
1. Haz clic en el botón **"Eliminar"**
2. Confirma la acción

## 🔧 Comandos Útiles de MongoDB

### Conectarse a MongoDB
```bash
mongosh
```

### Ver todas las bases de datos
```javascript
show dbs
```

### Usar la base de datos
```javascript
use tienda_juegos
```

### Ver todas las colecciones
```javascript
show collections
```

### Buscar todos los juegos
```javascript
db.juegos.find()
```

### Buscar un juego específico
```javascript
db.juegos.findOne({ nombre: "Elden Ring" })
```

### Buscar por precio menor a $50
```javascript
db.juegos.find({ precio: { $lt: 50 } })
```

### Actualizar un juego
```javascript
db.juegos.updateOne(
  { nombre: "Elden Ring" },
  { $set: { precio: 54.99 } }
)
```

### Eliminar un juego
```javascript
db.juegos.deleteOne({ nombre: "Cyberpunk 2077" })
```

### Eliminar todos los documentos
```javascript
db.juegos.deleteMany({})
```

### Eliminar la colección completa
```javascript
db.juegos.drop()
```

### Respaldar la base de datos
```bash
# En la terminal (no en mongosh)
mongodump --db tienda_juegos --out ./backup
```

### Restaurar la base de datos
```bash
mongorestore --db tienda_juegos ./backup/tienda_juegos
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:1250/api/juegos
```

### Endpoints disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/juegos` | Obtener todos los juegos |
| GET | `/api/juegos/:id` | Obtener un juego por ID |
| POST | `/api/juegos` | Crear un nuevo juego |
| PUT | `/api/juegos/:id` | Actualizar un juego |
| DELETE | `/api/juegos/:id` | Eliminar un juego |

### Ejemplo de estructura de datos (JSON)
```json
{
  "nombre": "The Last of Us Part II",
  "categoria": "Aventura",
  "descripcion": "Secuela del aclamado juego post-apocalíptico",
  "precio": 59.99,
  "imagen": "https://ejemplo.com/imagen.jpg",
  "plataformas": ["PS5", "PC"],
  "stock": 25
}
```

## 🐛 Solución de Problemas

### El servidor no se conecta a MongoDB
```bash
# Verificar que MongoDB esté corriendo
mongosh

# Si no está corriendo, iniciarlo
net start MongoDB  # Windows
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # Mac
```

### Puerto 1250 ya está en uso
```bash
# Cambiar el puerto en backend/server.js
const PORT = process.env.PORT || 3000;  # Cambiar a otro puerto
```

### Error "Cannot find module"
```bash
# Reinstalar dependencias
cd backend
rm -rf node_modules
npm install
```

### Los juegos no se muestran en el frontend
1. Verifica que el backend esté corriendo
2. Abre `http://localhost:1250/api/juegos` en el navegador
3. Deberías ver un JSON con los juegos
4. Si está vacío, inserta datos en MongoDB

## 📝 Configuración Avanzada

### Cambiar el puerto del servidor

Edita `backend/server.js`:
```javascript
const PORT = process.env.PORT || 3000;  // Cambiar 1250 por el puerto deseado
```

### Cambiar la URI de MongoDB

Edita `backend/server.js`:
```javascript
const MONGODB_URI = 'mongodb://localhost:27017';  // Cambiar si MongoDB está en otro host
```

### Variables de entorno

Crea un archivo `.env` en la carpeta `backend`:
```
PORT=1250
MONGODB_URI=mongodb://localhost:27017
DB_NAME=tienda_juegos
```

