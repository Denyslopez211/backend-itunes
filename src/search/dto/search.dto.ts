import { IsString, IsNotEmpty } from 'class-validator';

export class SearchTracksDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la banda es obligatorio' })
  name: string;
}
