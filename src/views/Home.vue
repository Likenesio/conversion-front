<template>
  <div class="container">
    <h2>Home</h2>
    <div class="mt-4">
      <router-link to="conversion" class="btn btn-primary">Ir a Conversión</router-link>
    </div>
    <div v-if="isAdmin" class="mt-4">
      <router-link to="historialconversion" class="btn btn-secondary">Ir a Historial de Conversiones</router-link>
    </div>
    <br>   
    <br>
    <button v-if="isAuthenticated" @click="logout" class="btn btn-danger">Salir</button>
  </div>
</template>


<script>
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.css';


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

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.btn-primary,
.btn-secondary,
.btn-danger{
  width:100%;
}
  
@media (max-width:576px){
 .container{
   padding-left :10px;
   padding-right :10px; 
 } 
  
}</style>