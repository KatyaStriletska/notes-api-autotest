"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const notes_controller_1 = require("./notes.controller");
const notes_service_1 = require("./notes.service");
const common_1 = require("@nestjs/common");
describe("NotesController", () => {
    let controller;
    let service;
    const note = {
        id: "1",
        title: "Note for testing title",
        content: "Some content",
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [notes_controller_1.NotesController],
            providers: [
                {
                    provide: notes_service_1.NotesService,
                    useValue: {
                        findAll: jest.fn().mockResolvedValue([note]),
                        findOne: jest.fn().mockResolvedValue(note),
                        create: jest.fn().mockResolvedValue(note),
                        update: jest.fn().mockResolvedValue({ ...note, title: "upd" }),
                        delete: jest.fn().mockResolvedValue({ success: true }),
                    },
                },
            ],
        }).compile();
        controller = module.get(notes_controller_1.NotesController);
        service = module.get(notes_service_1.NotesService);
    });
    it("findAll() test", async () => {
        const result = await controller.findAll();
        expect(result.items.length).toBe(1);
        expect(result.items[0].id).toBe("1");
        expect(service.findAll).toHaveBeenCalled();
    });
    it("findOne() by id test", async () => {
        const result = await controller.findOne("1");
        expect(result.title).toBe(note.title);
        expect(service.findOne).toHaveBeenCalledWith("1");
    });
    it("create note test", async () => {
        const dto = { title: "Test note", content: "Some content" };
        const result = await controller.create(dto);
        expect(result.id).toBe(note.id);
        expect(service.create).toHaveBeenCalledWith(dto);
    });
    it("оновлює нотатку", async () => {
        const dto = { title: "upd" };
        const result = await controller.update("1", dto);
        expect(result.title).toBe("upd");
        expect(service.update).toHaveBeenCalledWith("1", dto);
    });
    it("delete note tets", async () => {
        const result = await controller.delete("1");
        expect(result).toEqual({ success: true });
        expect(service.delete).toHaveBeenCalledWith("1");
    });
    it("error during delete test", async () => {
        service.findOne.mockRejectedValue(new common_1.NotFoundException());
        await expect(controller.findOne("2")).rejects.toThrow(common_1.NotFoundException);
    });
});
//# sourceMappingURL=notes.controller.spec.js.map