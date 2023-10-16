<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <h2 class="mt-5">Login</h2>
        <div class="mt-3">
          <form @submit="handleSubmit">
            <div class="mb-3">
              <label for="correo" class="form-label">Correo</label>
              <input type="text" class="form-control" id="correo" v-model="correo" placeholder="Correo">
            </div>
            <div class="mb-3">
              <label for="contrasenia" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="contrasenia" v-model="contrasenia" placeholder="Contraseña">
            </div>
            <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.css';

export default {
  data() {
    return {
      correo: '',
      contrasenia: '',
    };
  },
  methods: {
  async handleSubmit(event) {
    event.preventDefault();

    // Validar si el correo y la contraseña son proporcionados
    if (!this.correo || !this.contrasenia) {
      alert("Por favor, ingrese tanto el correo como la contraseña.");
      return;
    }

    // Datos para enviar al servidor
    const data = {
      correo: this.correo,
      contrasenia: this.contrasenia,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/usuario/login`, data);
      const token = response.data.token;
      localStorage.setItem('token', token);

      const decodedToken = jwt_decode(token);
      const rol = decodedToken.rol;
      const id = decodedToken.userId;

      if (rol === 'admin' || rol === 'user') {
 
        this.$router.push('home');
      } else {
        console.error('Rol desconocido:', rol);
        alert("Error: Rol desconocido");
      }

    } catch (error) {
      console.error('Error al iniciar sesión', error);

      if (error.response && error.response.status === 401) {
       
        alert("Correo o contraseña incorrectos. Por favor, inténtelo de nuevo.");
      } else {
        
        alert("Correo o contraseña incorrectos. Por favor, inténtelo de nuevo.");
      }
    }
  },
}

};
</script>

<style>
.input_pass{
  margin-top: 0.1vh;
}

</style>