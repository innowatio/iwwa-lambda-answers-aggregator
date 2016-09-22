import log from "services/logger";
import {find, upsert} from "services/mongodb";

export async function saveAnswers (id, answers) {

    // Seatch in MONGO
    const answersOnDB = await find({_id: id});
    var answersToSave = answers;

    // if found it, add the new answers
    if (answersOnDB.length > 0) {
        answersToSave.answers = [
            ...answersToSave.answers,
            ...answersOnDB[0].answers
        ];
    }

    log.info(answersToSave);
    // else save
    await upsert(id, answersToSave);
}
