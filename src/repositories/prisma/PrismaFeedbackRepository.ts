import { prisma } from '../../prisma'
import { FeedbackCreateData, FeedbackRepository } from '../FeedbackRepository'

export class PrismaFeedbackRepository implements FeedbackRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    })
  }
}
