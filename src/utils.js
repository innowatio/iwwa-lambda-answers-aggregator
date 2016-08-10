export function generateQuestionnaireId (answers) {
    return `${answers.type}-${answers.category}-${answers.siteId}`;
}

export function generateSurveyId (answers) {
    return `${answers.type}-${answers.category}-${answers.userId}`;
}
