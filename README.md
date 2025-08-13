1. Prerrequisitos
Tener instalados los siguientes programas:

Git: Para clonar el repositorio.

Node.js v18+ y npm: Para ejecutar el backend e instalar las dependencias del frontend.

MySQL: La base de datos que usa el proyecto.

2. Configuración del Backend
Navega a la carpeta del backend:

Instala las dependencias: 

npm install


Configura las variables de entorno:

Crea un archivo llamado .env en la raíz de la carpeta backend.

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=BDPruebaTecnicaCanopia
JWT_SECRET=tu_secret_seguro



3. Configuración y Ejecución del Frontend
navega a la carpeta del frontend:



cd nombre-de-tu-proyecto/frontend
Instala las dependencias:

npm install

4. Ejecución de la Aplicación
Inicia el backend:

npm run dev

Inicia el frontend:

ng serve