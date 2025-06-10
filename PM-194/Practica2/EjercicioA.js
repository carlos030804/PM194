const personas= {
    nombre: "Ivan Isay",
    edad: 37,
    direccion: {
        ciudad: "Qro",
        pais:"MX"
    }
};
 
const { nombre, edad, direccion: { ciudad } } = personas;

console.log(`Me llamo ${nombre}, tengo ${edad} años y vivo en ${ciudad}.`);
//Aplica destructuración aqui 

//Imprime el mensaje de Me llamo Ivan Isay, tengo 37 años y vivo en Qro.