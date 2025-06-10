function simularPeticionApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Datos recibidos correctamente ");
    }, 5000);
  });
}

async function obtenerDatos() {
  //Usa await para esperar la respuesta de simularPeticionApi
  //imprime resultado   
    try {
        const resultado = await simularPeticionApi();
        console.log(resultado);
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}
  
obtenerDatos(); 
//usa la funcion async