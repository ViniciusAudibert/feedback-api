import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

const port = process.env.PORT || 3001
const app = express()

app.use(express.json())

var transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'fbf93d58fc1183',
    pass: '4b0819e1b09934',
  },
})

app.post('/feedback', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  })

  await transport.sendMail({
    from: 'Equipe teste <test@test.com>',
    to: 'Test <test@test.com>',
    subject: 'Novo feedback',
    html: `
        <div style="font-family: sans-serif; font-size: 16px; color: #111;">
            <p>Tipo do feedback: ${type}</p>
            <p>Comentário: ${comment}</p>
        </div>
    `,
  })

  res.status(201).json({ data: feedback })
})

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
