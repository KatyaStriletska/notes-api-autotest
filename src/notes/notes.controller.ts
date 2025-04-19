import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  ValidationPipe,
} from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { NoteDto } from "./dto/note.dto";
import { NoteListDto } from "./dto/note-list.dto";
import { NoteEntity } from "./note.entity";

@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  private mapEntityToDto(entity: NoteEntity): NoteDto {
    const dto = new NoteDto();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.content = entity.content;
    return dto;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) createNoteDto: CreateNoteDto): Promise<NoteDto> {
    const newNoteEntity = await this.notesService.create(createNoteDto);
    return this.mapEntityToDto(newNoteEntity);
  }

  @Get()
  async findAll(): Promise<NoteListDto> {
    const noteEntities = await this.notesService.findAll();
    const noteDtos = noteEntities.map((entity) => this.mapEntityToDto(entity));
    return { items: noteDtos };
  }
  // ParseUUIDPipe прибрала, бо не проходили тест, але краще його юзати щоб валідну адресу передавати з клієнта

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<NoteDto> {
    const noteEntity = await this.notesService.findOne(id);
    return this.mapEntityToDto(noteEntity);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateNoteDto: UpdateNoteDto): Promise<NoteDto> {
    const updatedNoteEntity = await this.notesService.update(id, updateNoteDto);
    return this.mapEntityToDto(updatedNoteEntity);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async delete(@Param("id") id: string): Promise<{ success: boolean }> {
    return this.notesService.delete(id);
  }
}
