const mysql = require('mysql') //importando a biblioteca

const db = mysql.createConnection({
    host: 'localhost', //local
    port: 3306, //porta
    user: 'root', //usuario
    password: 'root', //senha do usuario
    database: 'listausuario' //nome do banco de dados
})

db.connect((err) => {
    if (err) {
        console.error('Erro ao Conectar ao MySQL', err);
    } else {
        console.log('Conectado ao MySQL');
    }
})

module.exports = db //exportar