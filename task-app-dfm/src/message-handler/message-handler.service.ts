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
    return `Mode: ${mode}, Language: ${language}, Message: ${message.join(' ')}`;
  }
}
