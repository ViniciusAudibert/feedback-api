import { MailAdapter } from '../adapters/MailAdapter'
import { FeedbackRepository } from '../repositories/FeedbackRepository'

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor(private feedbackRepository: FeedbackRepository, private mailAdapter: MailAdapter) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { comment, type, screenshot } = request

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbackRepository.create(request)

    await this.mailAdapter.sendEmail({
      subject: 'Novo Feedback',
      body: `
        <div style="font-family: sans-serif; font-size: 16px; color: #111;">
            <p>Tipo do feedback: ${type}</p>
            <p>Comentário: ${comment}</p>
        </div>
    `,
    })
  }
}
