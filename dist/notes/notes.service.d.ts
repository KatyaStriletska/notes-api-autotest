import { NoteEntity } from "./note.entity";
import { Repository } from "typeorm";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
export declare class NotesService {
    private readonly notesRepository;
    constructor(notesRepository: Repository<NoteEntity>);
    findAll(): Promise<NoteEntity[]>;
    findOne(id: string): Promise<NoteEntity>;
    create(createNoteDto: CreateNoteDto): Promise<NoteEntity>;
    update(id: string, updateNoteDto: UpdateNoteDto): Promise<NoteEntity>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
