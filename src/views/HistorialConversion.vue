<template>
  <div>
    <h2>Historial de Conversiones</h2>
    <div>
      <i-mdi-account-box style="font-size: 2em; color: red"/>
      <button @click="exportToExcel">Exportar a Excel</button>
      <br>
      <br>
      <button @click="logout">Salir</button>
    </div>
    <table class="table table-striped">
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
  import ExcelJS from 'exceljs';
  
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
      async exportToExcel() {
      try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Historial de Conversiones");

        // Definir encabezados
        worksheet.columns = [
          { header: "Fecha actividad", key: "fecha_actividad", width: 25 },
          { header: "Usuario", key: "usuario", width: 20 },
          { header: "Monto Origen (UF)", key: "monto_origen", width: 25 },
          { header: "Fecha conversión", key: "fecha_conversion", width: 25 },
          { header: "Valor de la Moneda (CLP)", key: "valor_moneda", width: 20 },
          { header: "Monto de la conversión", key: "monto_conversion", width: 25 },
        ];

        // Agregar datos
        this.conversiones.forEach(conversion => {
          worksheet.addRow({
            fecha_actividad: this.formatDate(conversion.fecha_actividad),
            usuario: conversion.usuario[0].nombre_usuario,
            monto_origen: conversion.monto_origen,
            fecha_conversion: this.formatDate(conversion.fecha_conversion),
            valor_moneda: conversion.valor_moneda,
            monto_conversion: conversion.monto_conversion,
          });
        });

        // Generar un Blob con el archivo Excel
        const blob = await workbook.xlsx.writeBuffer();

        // Descargar el archivo Excel
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'historial_conversiones.xlsx';
        a.click();

        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error al exportar a Excel:", error);
      }
    },
      async getHistorialConversion() {
        try {
          const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/conversiones`);
         
          this.conversiones = response.data;
          //console.log(this.conversiones)
        } catch (error) {
          console.error(error);
        }
      },
    formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(date).toLocaleDateString('es-CL', options);
    return formattedDate;
  },
     async logout() {
      localStorage.removeItem('token');
      this.$router.push('/'); 
    
    }
  }
  };
  </script>
  