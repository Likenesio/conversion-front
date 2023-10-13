## Front-end conversor

### Instalación

Para el funcionamiento de la aplicación, es necesario tener instalado los siguientes programas:
- [Node.js](https://nodejs.org/es "Node.js")
- [Vitejs](https://vitejs.dev/guide/ "Vitejs")  
- [Git ](https://git-scm.com/downloads "Git ")


#### Proceso de instalación
Una vez instalado node.js, se debe instalar vite, para eso se debe ejecutar el siguiente comando en la terminal:

    npm install -g create-vite

Ya teniendo instalado vite, es hora de clonar el proyecto desde github usando la terminal. Es importante tener instalado Git para hacer la operación.

```bash
git clone https://github.com/Likenesio/conversion-front.git
```
Una vez clonado el proyecto, desde la terminal debe ir al directorio donde están los archivos del proyecto, usando el comando:

```bash
cd conversion-front
```
Y después debe instalar las librerías del proyecto para que pueda funcionar, usando el siguiente comando:

```bash
npm install
```
Una vez teniendo instalado las librerías, debe crear un archivo .env para colocar la url del backend, sin este archivo, el proyecto no funcionará correctamente.

El archivo .env debe contener lo siguiente:

    VITE_URL_BACKEND = coloque_aqui_la_url_del_backend

Reemplace el coloque_aqui_la_url_del_backend con lo que se solicita. **La url del backend debe estar funcional o sino el proyecto no funcionará correctamente**.

Ya teniendo todo esto listo, ahora podemos ejecutar el proyecto de forma local con el siguiente comando:

    npm run dev

Con esto ya tendremos el proyecto funcionando correctamente, la url en donde se está ejecutando está en la misma consola, que normalmente es:  http://localhost:5173/
