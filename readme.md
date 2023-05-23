# Funeraria App

## Descripción
La aplicación Funeraria es una plataforma web para gestionar el stock y los servicios de una empresa funeraria. La aplicación permite agregar nuevos cajones, transferir cajones entre depósitos y registrar solicitudes de fallecimiento. Además, la aplicación también gestiona la fabricación y registro de lápidas, así como el registro de personas fallecidas.

## Tecnologías
La aplicación está construida con las siguientes tecnologías:

- React
- Vite
- Redux
- TypeScript
- SCSS
- Python
- FastAPI
- Firebase

## Estructura del proyecto
El proyecto está organizado de la siguiente manera:

- `client/`: Contiene el código del frontend construido con React y Vite.
- `server/`: Contiene el código del backend construido con Node.js y Express.
- `docs/`: Contiene la documentación del proyecto, incluyendo el archivo README.md.
- `LICENSE`: Contiene la licencia del proyecto.

## Estructura del cliente
|-- src/
|   |-- components/
|   |   |-- Common/
|   |   |   |-- Button.tsx
|   |   |   |-- Input.tsx
|   |   |-- Deposits/
|   |   |   |-- Deposit.tsx
|   |   |   |-- Deposits.tsx
|   |   |   |-- DepositForm.tsx
|   |   |   |-- DepositItem.tsx
|   |   |-- Laps/
|   |   |   |-- Lap.tsx
|   |   |   |-- Laps.tsx
|   |   |   |-- LapForm.tsx
|   |   |   |-- LapItem.tsx
|   |   |-- Requests/
|   |   |   |-- Request.tsx
|   |   |   |-- Requests.tsx
|   |   |   |-- RequestForm.tsx
|   |   |   |-- RequestItem.tsx
|   |   |-- Users/
|   |   |   |-- Login.tsx
|   |   |   |-- Register.tsx
|   |   |   |-- User.tsx
|   |   |   |-- Users.tsx
|   |   |   |-- UserForm.tsx
|   |   |   |-- UserItem.tsx
|   |-- redux/
|   |   |-- actions/
|   |   |   |-- depositActions.ts
|   |   |   |-- lapActions.ts
|   |   |   |-- requestActions.ts
|   |   |   |-- userActions.ts
|   |   |-- reducers/
|   |   |   |-- depositReducer.ts
|   |   |   |-- index.ts
|   |   |   |-- lapReducer.ts
|   |   |   |-- requestReducer.ts
|   |   |   |-- userReducer.ts
|   |   |-- store.ts
|   |-- App.tsx
|   |-- index.tsx
|-- public/
|   |-- index.html
|-- vite.config.js
|-- package.json
|-- tsconfig.json
|-- README.md



## Instalación
Para instalar la aplicación, siga los siguientes pasos:

1. Clone el repositorio.
2. Abra una terminal y navegue hasta el directorio del proyecto.
3. Ejecute `npm install` para instalar las dependencias del proyecto.
4. En el directorio `server/`, cree un archivo `.env` y configure las variables de entorno necesarias.
5. Ejecute `npm run dev` para iniciar la aplicación en modo de desarrollo.

## Contribución
Las contribuciones al proyecto son bienvenidas. Para contribuir al proyecto, siga los siguientes pasos:

1. Fork el repositorio.
2. Cree una nueva rama con su función o corrección.
3. Haga sus cambios y realice las pruebas necesarias.
4. Envíe una solicitud de extracción a la rama principal del repositorio.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulte el archivo LICENSE para obtener más detalles.
