import {expect} from "chai";

import {generateQuestionnaireId, generateSurveyId} from "utils";

describe("Utils", () => {

    it("`generateQuestionnaireId`", () => {
        const answers = {
            "id": "86e07f8b-9d55-4201-8ac2-bf2909da0878",
            "answers": [],
            "userId": "512cd39b-ae0e-a324-4e8e-04fde2a8bedf",
            "siteId": "my-site-id",
            "questionId": "8f6d2f9d-a3cb-4595-8c3c-73efc7c2a6cf",
            "category": "demographics",
            "type": "questionnaire",
        };

        expect(generateQuestionnaireId(answers)).to.equal("questionnaire-demographics-my-site-id");
    });


    it("`generateSurveyId`", () => {
        const answers = {
            "id": "86e07f8b-9d55-4201-8ac2-bf2909da0878",
            "questionId": "d77dbe3d-0608-41b1-bad5-95333e400219",
            "type": "survey",
            "category": "pilot",
            "userId": "512cd39b-ae0e-a324-4e8e-04fde2a8bedf",
            "answers": []
        };

        expect(generateSurveyId(answers)).to.equal("survey-pilot-512cd39b-ae0e-a324-4e8e-04fde2a8bedf");
    });

});
