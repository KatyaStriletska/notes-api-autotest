import { IsUUID } from "class-validator";

export class NoteDto {
  @IsUUID()
  id: string;
  title: string;
  content: string;
}
