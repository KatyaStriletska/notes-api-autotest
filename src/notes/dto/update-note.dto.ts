import { IsString, IsOptional, Length } from "class-validator";

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
