import { Injectable } from '@nestjs/common';
import { SubmissionService } from '../submission/submission.service';

@Injectable()
export class EvaluationService {
  async evaluateSubmission(
    submissionId: string,
    persist: boolean,
  ): Promise<string> {
    throw new Error('Method not implemented');
  }

  async persistEvaluationResult(submissionId: string, result: string) {
    throw new Error('Method not implemented');
  }
}
