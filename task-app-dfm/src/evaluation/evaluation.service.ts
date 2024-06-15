import { Injectable } from '@nestjs/common';

@Injectable()
export class EvaluationService {
  async evaluateSubmission(submissionId: string): Promise<string> {
    throw new Error('Method not implemented');
  }

  async persistEvaluationResult(submissionId: string, result: string) {
    throw new Error('Method not implemented');
  }
}
