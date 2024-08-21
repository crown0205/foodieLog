import {
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;

  @IsNotEmpty()
  color: string;

  @IsString()
  address: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsNumber()
  score: number;

  @IsArray()
  imageUrls: { url: string }[];
}
