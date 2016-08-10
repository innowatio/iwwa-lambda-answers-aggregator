import {find, upsert} from "services/mongodb";


export async function saveAnswers (id, answers) {

    // Cerca nel MONGO
    const answersOnDB = await find({_id: id});
    var answersToSave = answers;

    // se trova, aggiunge le nuove answers
    if (answersOnDB.length > 0) {
        answersToSave.answers = [
            ...answersToSave.answers,
            ...answersOnDB[0].answers
        ];
    }

    // altrimenti salva e basta
    await upsert(id, answersToSave);
}
