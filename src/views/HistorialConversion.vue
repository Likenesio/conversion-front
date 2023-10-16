<template>
  <div>
    <h2 class="page-title">Historial de Conversiones</h2>
    <div class="d-flex justify-content-between align-items-center mb-1">
      <button @click="exportToExcel" class="btn btn-success">
     <icon><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-type-xls" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
     <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
     <path d="M14 3v4a1 1 0 0 0 1 1h4" />
     <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
     <path d="M4 15l4 6" />
     <path d="M4 21l4 -6" />
     <path d="M17 20.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75" />
     <path d="M11 15v6h3" />
    </svg></icon>
    </button>
    </div>
    <div class="table-container" >
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
          <tr v-for="conversion in paginatedConversions" :key="conversion._id">
            <td>{{ formatDate(conversion.fecha_actividad) }}</td>
            <td>{{ conversion.usuario[0].nombre_usuario }}</td>
            <td>${{ conversion.monto_origen }} UF</td>
            <td>{{ formatDate(conversion.fecha_conversion) }}</td>
            <td>{{ conversion.valor_moneda }} CLP</td>
            <td>{{ conversion.monto_conversion.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }) + ' CLP' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav aria-label="Page navigation">
  <ul class="pagination">
    <li :class="{ 'page-item': true, 'disabled': currentPage === 1 }">
      <button @click="changePage(currentPage - 1)" class="page-link" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </button>
    </li>

    <li v-for="page in totalPages" :key="page" :class="{ 'page-item': true, 'active': page === currentPage }">
      <button @click="changePage(page)" class="page-link">{{ page }}</button>
    </li>

    <li :class="{ 'page-item': true, 'disabled': currentPage === totalPages }">
      <button @click="changePage(currentPage + 1)" class="page-link" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </button>
    </li>
  </ul>
</nav>
  </div>
  <button @click="logout" class="btn btn-danger">Salir</button>
</template>

  
  <script>
  import axios from 'axios';
  import ExcelJS from 'exceljs';
  import 'bootstrap/dist/css/bootstrap.css';

  export default {
    data() {
      return {
        conversiones: [],
        itemsPerPage: 10,
        currentPage: 1,
        
      };
    },
    mounted() {
      this.getHistorialConversion();
      
    },
    computed: {
    paginatedConversions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.conversiones.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.conversiones.length / this.itemsPerPage);
    },
  },
    methods: {
      changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
      async exportToExcel() {
      try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Historial de Conversiones");

        // Definir encabezados
        worksheet.columns = [
          { header: "Fecha actividad", key:"fecha_actividad", width: 30 },
          { header: "Usuario", key: "usuario", width: 20 },
          { header: "Monto Origen (UF)", key: "monto_origen", width: 30 },
          { header: "Fecha conversión", key: "fecha_conversion", width: 30 },
          { header: "Valor de la Moneda (CLP)", key:"valor_moneda", width: 30 },
          { header: "Monto de la conversión (CLP)", key: "monto_conversion", width: 30 },
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
      const fechaFormateada = new Date(date).toISOString().substring(0, 10);
      const fechaSplit = fechaFormateada.split('-'); // Divide la fecha en partes: año, mes, día
      const fechaEnFormatoDeseado = `${fechaSplit[2]}-${fechaSplit[1]}-${fechaSplit[0]}`;
      date = fechaEnFormatoDeseado;
      return date;
  },
     async logout() {
      localStorage.removeItem('token');
      this.$router.push('/'); 
    
    }
  }
  };

  
  </script>
  
  <style scoped>

  .page-title {
    font-size: 24px; 
    margin: 20px 0; 
  }
  
  /* Your existing CSS */
  .table-responsive {
    max-width: 100%;
    overflow-x: auto;
  }
  .table {
    font-size: 14px; 
  }
  
  .table th,
  .table td {
    padding: 5px 10px;
  }
  .table-container {
    overflow-x: auto;
    width: 100%;
  }
  @media (max-width: 768px) {
  .page-title {
    font-size: 18px; /* Adjust the font size for the title on smaller screens */
  }

  .table {
    font-size: 12px; /* Adjust the font size for the table on smaller screens */
  }

  .table th,
  .table td {
    padding: 5px 5px; /* Adjust the spacing for table cells on smaller screens */
  }
  .pagination {
    font-size: 14px; /* Adjust the font size for pagination links on smaller screens */
    margin-top: 10px; /* Add margin to separate pagination from the content */
  }
}
  </style>