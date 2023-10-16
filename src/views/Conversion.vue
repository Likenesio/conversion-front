<template>
  <div class="currency-converter">
    <h2>Convertir Moneda</h2>
    <br>
    <form @submit.prevent="convertCurrency" class="form">
      <div class="form-group">
        <label for="monto_origen">Monto origen</label>
        <input type="number" step = "any" id="monto_origen" placeholder="Monto en UF" v-model="conversion.monto_origen" required>
      
      </div>
      <br>
      <div class="form-group">
        <label for="fecha_conversion">Fecha de Conversión</label>
        <input type="date" id="fecha_conversion" v-model="this.conversion.fecha_conversion" required :max="maxDate()">
      </div>
      <br>
      <button type="submit" class="submit-button">Convertir</button>
    </form>
    <div class="result">
      <p>El monto es: ${{ conversion.monto_conversion}}</p>
    </div>
    <br>
    <br>
    <button @click="logout" class="logout-button">Salir</button>
  </div>
</template>
  
<script>
import axios from 'axios';
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.css'

export default {
data() {
  return {
    conversion: {
       fecha_actividad: new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-'),
      usuario: '',
      monto_origen: null,
      fecha_conversion: "",
      valor_moneda: null,
      monto_conversion: null
    },
  };
},
computed: {
},
methods: {

  async convertCurrency() {
    try {
      const tipoIndicador = 'uf'; //indicador a utilizar
      let token = localStorage.getItem('token')
      const decodedToken = jwt_decode(token); 
      this.conversion.usuario = decodedToken.userId;
      const fechaConversion = this.conversion.fecha_conversion;
      //console.log("qqq", fechaConversion)
      
     
      const fechaFormateada = new Date(this.conversion.fecha_conversion).toISOString().substring(0, 10);
      const fechaSplit = fechaFormateada.split('-'); // Divide la fecha en partes: año, mes, día
      const fechaEnFormatoDeseado = `${fechaSplit[2]}-${fechaSplit[1]}-${fechaSplit[0]}`;
      this.conversion.fecha_conversion = fechaEnFormatoDeseado;
      console.log(fechaEnFormatoDeseado)
      
       const response = await axios.get(`https://mindicador.cl/api/${tipoIndicador}/${fechaEnFormatoDeseado}`);

       let valorMoneda = response.data.serie[0].valor;
       this.conversion.valor_moneda = valorMoneda;
       this.conversion.fecha_conversion = fechaConversion;
       //console.log("El valor de la moneda es: ", this.conversion.valor_moneda )

       this.conversion.monto_conversion = Math.round(this.conversion.monto_origen * valorMoneda);
       
       //Envía los datos al servidor
       this.saveConversion(this.conversion);
       alert("Conversion realizada correctamente");
       //location.reload();
      
     } catch (error) { 
        console.error('Error al obtener los datos de conversión:', error);
     }
   },
   
   async saveConversion(conversion) { 
    //console.log("conversion", conversion)
    const conversionSave = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/conversion`, conversion);
},
   async logout() {
    localStorage.removeItem('token');
    this.$router.push('/'); 
  },
  maxDate() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();
      return `${yyyy}-${mm}-${dd}`;
    }
  }
}

</script>
<style>
  @media (min-width: 200px) {
    .currency-converter {
      padding: 20px;
    }
    .form-group {
      margin-bottom: 10px;
    }
    .form-group label {
      display: block;
      margin-bottom: 10px;
    }
    .form-group input {
      width: 100%;
      padding: 10px;
    }
    .form-group button {
      width: 100%;
      padding: 10px;
      color: rgb(255, 255, 255);
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    }
    .form-group button:hover {
      background-color: #a8260f;
    }
    .result {
      margin-top: 20px;
    }
    .logout-button {
      background-color: #a8260f;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 20px;
    }
    .logout-button:hover {
      background-color: #a8260f;
    }
  }

</style>