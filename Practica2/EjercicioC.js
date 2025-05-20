const personas = [
    {nombre: "Ana", edad :22},
    {nombre: "Luis", edad :35},
    {nombre: "Maria", edad :28}
]

const personaLuis = personas.find(persona => persona.nombre === "Luis");
console.log(personaLuis);

personas.forEach(persona => {
    console.log(`Nombre: ${persona.nombre}, Edad: ${persona.edad}`);
});

const totalEdad = personas.reduce((acumulado, persona) => acumulado + persona.edad, 0);
console.log(`Total de edades: ${totalEdad}`);