import {generateQuestionnaireId, generateSurveyId} from "utils";
import {saveAnswers} from "steps/save-answers";

export default async function pipeline (event) {

    const answers = event.data.element;
    const answersType = answers.type;

    var id;

    switch (answersType) {
    case "questionnaire":
        // id questionario
        id = generateQuestionnaireId(answers);
        break;
    case "survey":
        // id survey
        id = generateSurveyId(answers);
        break;
    default:
        id = event.data.id;
    }

    // inserisci in mongo
    await saveAnswers(id, answers);

    return null;
}
