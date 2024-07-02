import { Injectable } from '@nestjs/common';

@Injectable()
export class EvaluationService {
  async evaluateSubmission(
    submissionId: string,
    persist: boolean,
  ): Promise<any> {
    const evaluationObject = {
      submissionId,
      persist,
    };
    return evaluationObject;
  }

  async persistEvaluationResult(submissionId: string, result: string) {
    throw new Error('Method not implemented');
  }
}
