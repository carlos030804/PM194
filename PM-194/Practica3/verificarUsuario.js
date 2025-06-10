function VerificarUsuario(usuario) {
    //retorna una promesa aqui 
    return new Promise((resolve, reject) => {
        if (usuario === "admin") {
            resolve("Acceso concedido");
        } else {
            reject("Acceso denegado");
        }
    });
}

VerificarUsuario("admin")
    .then(res => console.log(res))  
    .catch(err => console.log(err));

VerificarUsuario("Ivan")
    .then(res => console.log(res))
    .catch(err => console.log(err)); 
