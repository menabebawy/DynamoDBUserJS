const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.use('/users', require('./routes/api/users'))

app.listen(port, () => {
    console.log(`Backend Listening at Port ${port}`)
})