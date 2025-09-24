import { PUBLIC_SERVER_API_URL } from '$env/static/public';

export async function generateVisualization(taskId: number, content: string) {
	const requestBody = {
		userId: 'DFMTestPageUser',
		assignmentId: 'DFMTestPageAssignment',
		taskId: taskId,
		language: 'EN',
		mode: 'DIAGNOSE',
		feedbackLevel: 3,
		submission: {
			input: content
		}
	};

	const response = await fetch(
		`${PUBLIC_SERVER_API_URL}/api/submission?` +
			new URLSearchParams({
				runInBackground: 'false',
				persist: 'false'
			}).toString(),
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		}
	);

	return await response.json();
}
