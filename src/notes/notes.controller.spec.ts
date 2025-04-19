import { Test, TestingModule } from "@nestjs/testing";
import { NotesController } from "./notes.controller";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { NotFoundException } from "@nestjs/common";

describe("NotesController", () => {
  let controller: NotesController;
  let service: jest.Mocked<NotesService>;

  const note = {
    id: "1",
    title: "Note for testing title",
    content: "Some content",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
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

    controller = module.get<NotesController>(NotesController);
    service = module.get(NotesService);
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
    const dto: CreateNoteDto = { title: "Test note", content: "Some content" };
    const result = await controller.create(dto);
    expect(result.id).toBe(note.id);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it("оновлює нотатку", async () => {
    const dto: UpdateNoteDto = { title: "upd" };
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
    service.findOne.mockRejectedValue(new NotFoundException());
    await expect(controller.findOne("2")).rejects.toThrow(NotFoundException);
  });
});
