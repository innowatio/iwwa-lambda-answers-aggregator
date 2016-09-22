import log from "services/logger";
import {generateQuestionnaireId, generateSurveyId} from "utils";
import {saveAnswers} from "steps/save-answers";

export default async function pipeline (event) {
    log.info(event);
    const answers = event.data.element;
    const answersType = answers.type;

    var id;

    switch (answersType) {
    case "questionnaire":
        // id questionnaire
        id = generateQuestionnaireId(answers);
        break;
    case "survey":
        // id survey
        id = generateSurveyId(answers);
        break;
    default:
        id = event.data.id;
    }

    // insert to mongo
    await saveAnswers(id, answers);

    return null;
}
