<template>
  <div>
    <h2>Historial de Conversiones</h2>
    <table>
      <thead>
        <tr>
          <th>Fecha actividad</th>
          <th>Usuario</th>
          <th>Monto Origen</th>
          <th>Fecha conversión</th>
          <th>Valor de la Moneda</th>
          <th>Monto de la conversión</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="conversion in conversiones" :key="conversion._id">
          <td>{{ formatDate(conversion.fecha_actividad)}}</td>
          <td>{{conversion.usuario[0].nombre_usuario}}</td>
          <td>${{ conversion.monto_origen }} UF</td>
          <td>{{ formatDate(conversion.fecha_conversion) }}</td>
          <td>${{ conversion.valor_moneda }} CLP</td>
          <td>${{ conversion.monto_conversion }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  import jwt_decode from "jwt-decode";
  
  export default {
    data() {
      return {
        conversiones: [
       
        ]
      };
    },
    mounted() {
      this.getHistorialConversion();
      
    },
    methods: {
      async getHistorialConversion() {
        try {
          const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/conversiones`);
          //console.log(response)
          this.conversiones = response.data;
          console.log(this.conversiones)
        } catch (error) {
          console.error(error);
        }
      },
    formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(date).toLocaleDateString('es-CL', options);
    return formattedDate;
  }
    }

  };
  </script>
  