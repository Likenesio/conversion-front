<template>
  <div>
    <h2>Home</h2>

    
    <router-link to="/conversion">Ir a Conversión</router-link>
    
    <br>
    
    <router-link v-if="isAdmin" to="/historialconversion">Ir a Historial de Conversiones</router-link>
    <br>
    <br>
    <button v-if="isAuthenticated" @click="logout">Salir</button>
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
      localStorage.removeItem("token");   
      this.$router.push("/");
    },
  },
};
</script>