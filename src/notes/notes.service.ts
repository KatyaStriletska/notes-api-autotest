import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NoteEntity } from "./note.entity";
import { Repository } from "typeorm";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly notesRepository: Repository<NoteEntity>,
  ) {}
  async findAll(): Promise<NoteEntity[]> {
    return await this.notesRepository.find();
  }
  async findOne(id: string): Promise<NoteEntity> {
    const note = await this.notesRepository.findOneBy({ id });
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    return note;
  }
  async create(createNoteDto: CreateNoteDto): Promise<NoteEntity> {
    const newNote = this.notesRepository.create(createNoteDto);
    return await this.notesRepository.save(newNote);
  }
  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<NoteEntity> {
    const noteToUpdate = await this.notesRepository.preload({
      id: id,
      ...updateNoteDto,
    });
    if (!noteToUpdate) {
      // throw new HttpException('Note not found', 401);
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    return await this.notesRepository.save(noteToUpdate);
  }
  async delete(id: string): Promise<{ success: boolean }> {
    const result = await this.notesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    return { success: true };
  }
}
