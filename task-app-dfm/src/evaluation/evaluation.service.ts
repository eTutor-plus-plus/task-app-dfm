import { Injectable } from '@nestjs/common';
import { SubmissionService } from '../submission/submission.service';

@Injectable()
export class EvaluationService {
  async evaluateSubmission(
    submissionId: string,
    persist: boolean,
  ): Promise<string> {
    return 'Evaluation result for submission ' + submissionId;
  }

  async persistEvaluationResult(submissionId: string, result: string) {
    throw new Error('Method not implemented');
  }
}
