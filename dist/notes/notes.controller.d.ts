import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { NoteDto } from "./dto/note.dto";
import { NoteListDto } from "./dto/note-list.dto";
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    private mapEntityToDto;
    create(createNoteDto: CreateNoteDto): Promise<NoteDto>;
    findAll(): Promise<NoteListDto>;
    findOne(id: string): Promise<NoteDto>;
    update(id: string, updateNoteDto: UpdateNoteDto): Promise<NoteDto>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
