import express from 'express'
import { routes } from './routes'

const port = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
