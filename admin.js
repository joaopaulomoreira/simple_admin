const mongoose = require('mongoose')
const express = require('express')
const AdminBro = require('admin-bro')

const ProjectSchema = new mongoose.Schema({

title:{
type:String,
require: true,
},

description: String,
completed: Boolean,
created_at: { type: Date, default: Date.now},

})

const Project = mongoose.model("Project", ProjectSchema)


const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const adminBroOption = new AdminBro({
	resources: [
    { resource: Project, options: {
      properties: {
        description: { type: 'richtext' },
        created_at: {
          isVisible: { edit: false, list: true, show: true, filter: true }
        }
      }
   }},
  ],
  locale: {
    translations: {
      labels: {
        Project: 'Meus Projetos'
      }
    }
  },
  rootPath: '/admin'
})

const router = AdminBroExpress.buildRouter(adminBroOption)

// Server
const server = express();

server
  .use(adminBroOption.options.rootPath, router)

const run = async () => {

  mongoose.connect('mongodb://localhost/admin', {

    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  
  await server.listen(3000, () => console.log("Servidor executando"))
  
  }
  
  run()