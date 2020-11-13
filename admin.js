const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')

const adminBro = new AdminBro({

    database:[],
    rootPath:'/admin',
})

const router = AdminBroExpress.buildRouter(adminBro)

const express = require('express')
const app = express()
const port = 3000

app.use(adminBro.options.rootPath, router)

app.listen(port, () => {
  console.log('Servidor executando')
})