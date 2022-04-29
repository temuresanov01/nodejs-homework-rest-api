const { mkdir } = require('fs/promises')
const app = require('./app')
const db = require('./config/db')
db.then(() => {
  // console.log('Connection to DB')
  app.listen(3000, async () => {
    await mkdir(process.env.UPLOAD_FOLDER, {recursive: true})
     console.log("Server running. Use our API on port: 3000")
  })
}).catch((error) => {
  console.log(`Server not running. Error: ${error.message}`);
})
