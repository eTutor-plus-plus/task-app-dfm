import { Injectable } from '@nestjs/common';
import { Language, Mode } from '@prisma/client';

@Injectable()
export class MessageHandlerService {
  generateResponse(
    mode: Mode,
    language: Language,
    feedbackLevel: number,
    ...message: string[]
  ): string {
    switch (mode) {
      //Diagnose shows feedback, submit basically the same, but Run without feedback
      //Run only shows syntax errors, but no feedback
      //feedbackLevel 0: no feedback, 3: full feedback
      case Mode.DIAGNOSE:
        if (feedbackLevel === 0) {
          return `Mode: ${mode}, Language: ${language}, Message: ${message.join(' ')}`;
        }
        break;
      case Mode.SUBMIT:
        if (feedbackLevel === 1) {
          return `Mode: ${mode}, Language: ${language}, Message: ${message.join(' ')}`;
        }
        break;
      case Mode.RUN:
      default:
        return `Mode: ${mode}, Language: ${language}, Message: ${message.join(' ')}`;
    }
    return `Mode: ${mode}, Language: ${language}, Message: ${message.join(' ')}`;
  }
}
