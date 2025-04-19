"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const notes_service_1 = require("./notes.service");
const typeorm_1 = require("@nestjs/typeorm");
const note_entity_1 = require("./note.entity");
describe("NotesService", () => {
    let service;
    let repo;
    const mockRepository = () => ({
        find: jest.fn(),
        findOneBy: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    });
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                notes_service_1.NotesService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(note_entity_1.NoteEntity),
                    useFactory: mockRepository,
                },
            ],
        }).compile();
        service = module.get(notes_service_1.NotesService);
        repo = module.get((0, typeorm_1.getRepositoryToken)(note_entity_1.NoteEntity));
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=notes.service.spec.js.map