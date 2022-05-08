import { Router } from 'express'
import { SubmitFeedbackUseCase } from './useCases/SubmitFeedbackUseCase'
import { PrismaFeedbackRepository } from './repositories/prisma/PrismaFeedbackRepository'
import { NodemailerMailAdapter } from './adapters/nodemailer/NodemailerMailAdapter'

const routes = Router()

routes.post('/feedback', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedbackRepository = new PrismaFeedbackRepository()
  const mailAdapter = new NodemailerMailAdapter()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(feedbackRepository, mailAdapter)

  const feedback = await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })

  res.status(201).json({ data: feedback })
})

export { routes }
