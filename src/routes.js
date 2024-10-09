const express = require('express') //importando o express
const path = require('path') //importando o path
const router = express.Router() //falar para o router usar o express.Router (encutar o caminho)

//falar que na pagina principal (/, raiz) carregar o arquivo que esta na pasta pages 
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})

const clienteController = require('./clienteController')
router.get('/usuario', clienteController.listarUsuario)
router.get('/usuario/:id', clienteController.buscarUsuario)
router.post('/usuario', clienteController.adicionarUsuario)
router.patch('/usuario/:id', clienteController.atualizarUsuario)
router.delete('/usuario/:id' ,clienteController.deletarUsuario)

module.exports = router //exportar