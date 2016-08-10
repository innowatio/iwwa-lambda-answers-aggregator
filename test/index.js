import {expect} from "chai";

import {getEventFromObject, run} from "./mocks";
import {handler} from "index";
import {find, upsert, mongodb} from "services/mongodb";
import {COLLECTION_NAME} from "config";

describe("Answers aggregator", () => {

    var db;

    before(async () => {
        db = await mongodb;
    });

    after(async () => {
        await db.dropCollection(COLLECTION_NAME);
    });

    afterEach(async () => {
        await db.collection(COLLECTION_NAME).remove({});
    });

    describe("type survey", () => {

        it("INSERT a new answer", async () => {

            const event = getEventFromObject({
                data: {
                    element: {
                        answers: [
                            {
                                id: 2,
                                timestamp: "2016-08-09T14:30:32.543Z",
                                answer: "Vendita all'ingrosso o al dettaglio (negozi, ecc)",
                                question: {
                                    text: "In quale categoria opera la tua società?"
                                }
                            }
                        ],
                        userId: "512cd39b-ae0e-a324-4e8e-04fde2a8bedf",
                        siteId: "32",
                        questionId: "8f6d2f9d-a3cb-4595-8c3c-73efc7c2a6cf",
                        category: "inizio-pilot",
                        type: "survey",
                        visitId: "512cd39b-ae0e-a324-4e8e-04fde2a8bedf-2016-08-09T14:30:16.526Z"
                    },
                    id: "1f6d2a9d-a3cb-4595-8c3c-73efc7c2a6cd"
                },
                type: "element inserted in collection answers"
            });

            const expected = [{
                _id: "survey-inizio-pilot-512cd39b-ae0e-a324-4e8e-04fde2a8bedf",
                answers: [
                    {
                        id: 2,
                        timestamp: "2016-08-09T14:30:32.543Z",
                        answer: "Vendita all'ingrosso o al dettaglio (negozi, ecc)",
                        question: {
                            text: "In quale categoria opera la tua società?"
                        }
                    }
                ],
                userId: "512cd39b-ae0e-a324-4e8e-04fde2a8bedf",
                siteId: "32",
                questionId: "8f6d2f9d-a3cb-4595-8c3c-73efc7c2a6cf",
                category: "inizio-pilot",
                type: "survey",
                visitId: "512cd39b-ae0e-a324-4e8e-04fde2a8bedf-2016-08-09T14:30:16.526Z"
            }];

            await run(handler, event);

            const answersOnDB = await find({});

            expect(answersOnDB).to.deep.equal(expected);
        });

        it("UPDATE an existing answer", async () => {

            const eventOnDB = {
                answers: [
                    {
                        id: 2,
                        timestamp: "2016-08-09T14:30:32.543Z",
                        answer: "Vendita all'ingrosso o al dettaglio (negozi, ecc)",
                        question: {
                            text: "In quale categoria opera la tua società?"
                        }
                    }
                ],
                userId: "512cd39b-ae0e-a324-4e8e-04fde2a8aaaa",
                siteId: "32",
                questionId: "8f6d2f9d-a3cb-4595-8c3c-73efc7c2a6cf",
                category: "inizio-pilot",
                type: "survey",
                visitId: "512cd39b-ae0e-a324-4e8e-04fde2a8bedf-2016-08-09T14:30:16.526Z"
            };

            await upsert("survey-inizio-pilot-512cd39b-ae0e-a324-4e8e-04fde2a8aaaa", eventOnDB);

            const event = getEventFromObject({
                data: {
                    element: {
                        answers: [
                            {
                                id: 2,
                                timestamp: "2016-08-10T00:00:00.000Z",
                                answer: "Artigianato",
                                question: {
                                    text: "In quale categoria opera la tua società?"
                                }
                            }
                        ],
                        userId: "512cd39b-ae0e-a324-4e8e-04fde2a8aaaa",
                        siteId: "32",
                        questionId: "8f6d2f9d-a3cb-4595-8c3c-73efc7c2a6cf",
                        category: "inizio-pilot",
                        type: "survey",
                        visitId: "512cd39b-ae0e-a324-4e8e-04fde2a8aaaa-2016-08-10T00:00:00.000Z"
                    },
                    id: "1f6d2a9d-a3cb-4595-8c3c-73efc7c2a6cd"
                },
                type: "element inserted in collection answers"
            });

            const expected = [{
                _id: "survey-inizio-pilot-512cd39b-ae0e-a324-4e8e-04fde2a8aaaa",
                answers: [
                    {
                        id: 2,
                        timestamp: "2016-08-10T00:00:00.000Z",
                        answer: "Artigianato",
                        question: {
                            text: "In quale categoria opera la tua società?"
                        }
                    }, {
                        id: 2,
                        timestamp: "2016-08-09T14:30:32.543Z",
                        answer: "Vendita all'ingrosso o al dettaglio (negozi, ecc)",
                        question: {
                            text: "In quale categoria opera la tua società?"
                        }
                    }
                ],
                userId: "512cd39b-ae0e-a324-4e8e-04fde2a8aaaa",
                siteId: "32",
                questionId: "8f6d2f9d-a3cb-4595-8c3c-73efc7c2a6cf",
                category: "inizio-pilot",
                type: "survey",
                visitId: "512cd39b-ae0e-a324-4e8e-04fde2a8aaaa-2016-08-10T00:00:00.000Z"
            }];

            await run(handler, event);

            const answersOnDB = await find({});

            expect(answersOnDB).to.deep.equal(expected);
        });

    });

    describe("type questionnaire", () => {

        it("INSERT a new answer", async () => {

            const event = getEventFromObject({
                data: {
                    element: {
                        answers: [
                            {
                                id: 2,
                                timestamp: "2016-08-09T14:30:32.543Z",
                                answer: "Vendita all'ingrosso o al dettaglio (negozi, ecc)",
                                question: {
                                    text: "In quale categoria opera la tua società?"
                                }
                            }
                        ],
                        userId: "512cd39b-ae0e-a324-4e8e-04fde2a8bedf",
                        siteId: "32",
                        questionId: "8f6d2f9d-a3cb-4595-8c3c-73efc7c2a6cf",
                        category: "demographics",
                        type: "questionnaire",
                        visitId: "512cd39b-ae0e-a324-4e8e-04fde2a8bedf-2016-08-09T14:30:16.526Z"
                    },
                    id: "1f6d2a9d-a3cb-4595-8c3c-73efc7c2a6cd"
                },
                type: "element inserted in collection answers"
            });

            const expected = [{
                _id: "questionnaire-demographics-32",
                answers: [
                    {
                        id: 2,
                        timestamp: "2016-08-09T14:30:32.543Z",
                        answer: "Vendita all'ingrosso o al dettaglio (negozi, ecc)",
                        question: {
                            text: "In quale categoria opera la tua società?"
                        }
                    }
                ],
                userId: "512cd39b-ae0e-a324-4e8e-04fde2a8bedf",
                siteId: "32",
                questionId: "8f6d2f9d-a3cb-4595-8c3c-73efc7c2a6cf",
                category: "demographics",
                type: "questionnaire",
                visitId: "512cd39b-ae0e-a324-4e8e-04fde2a8bedf-2016-08-09T14:30:16.526Z"
            }];

            await run(handler, event);

            const answersOnDB = await find({});

            expect(answersOnDB).to.deep.equal(expected);
        });

        it("UPDATE an existing answer", async () => {

            const eventOnDB = {
                answers: [
                    {
                        id: 2,
                        timestamp: "2016-08-09T14:30:32.543Z",
                        answer: "Vendita all'ingrosso o al dettaglio (negozi, ecc)",
                        question: {
                            text: "In quale categoria opera la tua società?"
                        }
                    }
                ],
                userId: "512cd39b-ae0e-a324-4e8e-04fde2a8bedf",
                siteId: "32",
                questionId: "8f6d2f9d-a3cb-4595-8c3c-73efc7c2a6cf",
                category: "demographics",
                type: "questionnaire",
                visitId: "512cd39b-ae0e-a324-4e8e-04fde2a8bedf-2016-08-09T14:30:16.526Z"
            };

            await upsert("questionnaire-demographics-32", eventOnDB);

            const event = getEventFromObject({
                data: {
                    element: {
                        answers: [
                            {
                                id: 2,
                                timestamp: "2016-08-10T00:00:00.000Z",
                                answer: "Artigianato",
                                question: {
                                    text: "In quale categoria opera la tua società?"
                                }
                            }
                        ],
                        userId: "512cd39b-ae0e-a324-4e8e-04fde2a8aaaa",
                        siteId: "32",
                        questionId: "8f6d2f9d-a3cb-4595-8c3c-73efc7c2a6cf",
                        category: "demographics",
                        type: "questionnaire",
                        visitId: "512cd39b-ae0e-a324-4e8e-04fde2a8aaaa-2016-08-10T00:00:00.000Z"
                    },
                    id: "1f6d2a9d-a3cb-4595-8c3c-73efc7c2a6cd"
                },
                type: "element inserted in collection answers"
            });

            const expected = [{
                _id: "questionnaire-demographics-32",
                answers: [
                    {
                        id: 2,
                        timestamp: "2016-08-10T00:00:00.000Z",
                        answer: "Artigianato",
                        question: {
                            text: "In quale categoria opera la tua società?"
                        }
                    }, {
                        id: 2,
                        timestamp: "2016-08-09T14:30:32.543Z",
                        answer: "Vendita all'ingrosso o al dettaglio (negozi, ecc)",
                        question: {
                            text: "In quale categoria opera la tua società?"
                        }
                    }
                ],
                userId: "512cd39b-ae0e-a324-4e8e-04fde2a8aaaa",
                siteId: "32",
                questionId: "8f6d2f9d-a3cb-4595-8c3c-73efc7c2a6cf",
                category: "demographics",
                type: "questionnaire",
                visitId: "512cd39b-ae0e-a324-4e8e-04fde2a8aaaa-2016-08-10T00:00:00.000Z"
            }];

            await run(handler, event);

            const answersOnDB = await find({_id: "questionnaire-demographics-32"});

            expect(answersOnDB).to.deep.equal(expected);
        });
    });

    describe("type unknown", () => {

        it("INSERT a new answer", async () => {

            const event = getEventFromObject({
                data: {
                    element: {
                        answers: [
                            {
                                id: 2,
                                timestamp: "2016-08-09T14:30:32.543Z",
                                answer: "Vendita all'ingrosso o al dettaglio (negozi, ecc)",
                                question: {
                                    text: "In quale categoria opera la tua società?"
                                }
                            }
                        ],
                        userId: "512cd39b-ae0e-a324-4e8e-04fde2a8bedf",
                        siteId: "32",
                        questionId: "8f6d2f9d-a3cb-4595-8c3c-73efc7c2a6cf",
                        category: "demographics",
                        type: "wrongTypeSorry",
                        visitId: "512cd39b-ae0e-a324-4e8e-04fde2a8bedf-2016-08-09T14:30:16.526Z"
                    },
                    id: "1f6d2a9d-a3cb-4595-8c3c-73efc7c2a6cd"
                },
                type: "element inserted in collection answers"
            });

            const expected = [{
                _id: "1f6d2a9d-a3cb-4595-8c3c-73efc7c2a6cd",
                answers: [
                    {
                        id: 2,
                        timestamp: "2016-08-09T14:30:32.543Z",
                        answer: "Vendita all'ingrosso o al dettaglio (negozi, ecc)",
                        question: {
                            text: "In quale categoria opera la tua società?"
                        }
                    }
                ],
                userId: "512cd39b-ae0e-a324-4e8e-04fde2a8bedf",
                siteId: "32",
                questionId: "8f6d2f9d-a3cb-4595-8c3c-73efc7c2a6cf",
                category: "demographics",
                type: "wrongTypeSorry",
                visitId: "512cd39b-ae0e-a324-4e8e-04fde2a8bedf-2016-08-09T14:30:16.526Z"
            }];

            await run(handler, event);

            const answersOnDB = await find({});

            expect(answersOnDB).to.deep.equal(expected);
        });
    });
});
