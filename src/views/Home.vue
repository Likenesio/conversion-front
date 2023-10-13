<template>
  <div>
    <h2>Home</h2>

    
    <router-link to="/conversion">Ir a Conversión</router-link>
    
    <br>
    
    <router-link v-if="isAdmin" to="/historialconversion">Ir a Historial de Conversiones</router-link>
    <br>
    <br>
    <button v-if="isAuthenticated" @click="logout">Cerrar Sesión</button>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      isAdmin: false,
      isAuthenticated: false,
    };
  },
  created() {
    let token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    const rol = decodedToken.rol;
    this.isAdmin = rol === "admin";
    this.isAuthenticated = !!token; 
  },
  methods: {
    logout() {
      // Eliminar el token del almacenamiento local
      localStorage.removeItem("token");
      // Redirigir al usuario a la página de inicio de sesión o a la página de inicio
      this.$router.push("/"); // Cambia "/login" por la ruta que desees
    },
  },
};
</script>