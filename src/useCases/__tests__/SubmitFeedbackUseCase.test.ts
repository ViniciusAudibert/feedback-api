import { SubmitFeedbackUseCase } from '../SubmitFeedbackUseCase'

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    // Arrange
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: createFeedbackSpy },
      { sendEmail: sendMailSpy }
    )

    // Act
    const result = submitFeedback.execute({
      type: 'BUG',
      comment: 'test comment',
      screenshot: 'data:image/png;base64 test',
    })

    // Assert
    await expect(result).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalledTimes(1)
    expect(sendMailSpy).toHaveBeenCalledTimes(1)
  })

  it('should not be able to submit feedback with invalid screenshot', async () => {
    // Arrange
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: createFeedbackSpy },
      { sendEmail: sendMailSpy }
    )

    // Act
    const result = submitFeedback.execute({
      type: 'BUG',
      comment: 'test comment',
      screenshot: 'test.png',
    })

    // Assert
    await expect(result).rejects.toThrow()

    expect(createFeedbackSpy).not.toHaveBeenCalled()
    expect(sendMailSpy).not.toHaveBeenCalled()
  })
})
