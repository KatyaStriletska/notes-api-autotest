import { Test, TestingModule } from "@nestjs/testing";
import { NotesService } from "./notes.service";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { NoteEntity } from "./note.entity";

describe("NotesService", () => {
  let service: NotesService;
  let repo: jest.Mocked<Repository<NoteEntity>>;

  const mockRepository = () => ({
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: getRepositoryToken(NoteEntity),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    repo = module.get(getRepositoryToken(NoteEntity));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
