<template>
    <div class="currency-converter">
      <h2>Convertir Moneda</h2>
      <form @submit.prevent="convertCurrency" class="form">
        <div class="form-group">
          <label for="monto_origen">Monto origen:</label>
          <input type="number" step = "any" id="monto_origen" v-model="conversion.monto_origen" required>
        </div>
        <div class="form-group">
          <label for="fecha_conversion">Fecha de Conversión:</label>
          <input type="date" id="fecha_conversion" v-model="conversion.fecha_conversion" required>
        </div>
        <button type="submit" class="submit-button">Convertir</button>
      </form>
      <div class="result">
        <p>El monto es: ${{ conversion.monto_conversion }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import jwt_decode from "jwt-decode";
  
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
      }
    };
  },
  methods: {

    async convertCurrency() {
      try {
        const tipoIndicador = 'uf'; //indicador a utilizar
        let token = localStorage.getItem('token')
        const decodedToken = jwt_decode(token); 
        this.conversion.usuario = decodedToken.userId;
        //console.log(rol)    
        //console.log(id)  
        //console.log(token)
        const fechaConversion = this.conversion.fecha_conversion;
      
        const formatoFecha = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
  };
        const fechaFormateada = new Date(fechaConversion).toLocaleDateString('en-US', formatoFecha).replace(/\//g, '-');
        this.conversion.fecha_conversion = fechaFormateada;
        
         const response = await axios.get(`https://mindicador.cl/api/${tipoIndicador}/${fechaFormateada}`);

         let valorMoneda = response.data.serie[0].valor;
         this.conversion.valor_moneda = valorMoneda
         console.log("El valor de la moneda es: ", this.conversion.valor_moneda )
  
         this.conversion.monto_conversion = Math.round(this.conversion.monto_origen * valorMoneda);
         
         alert("Conversion realizada correctamente");
         this.saveConversion(this.conversion);
         
         //console.log("El monto es: $", this.conversion.monto_conversion)
  
       } catch (error) { 
          console.error('Error al obtener los datos de conversión:', error);
       }
     },
     
     async saveConversion(conversion) {
        console.log("Conversion recibida: ",conversion)
        const conversionResponsive = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/conversion`, conversion);   
     }

   }

  }

  </script>
  