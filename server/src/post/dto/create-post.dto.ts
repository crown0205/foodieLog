import {
  IsArray,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { MarkerColor } from '../marker-color.enum';

export class CreatePostDto {
  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;

  @IsNotEmpty()
  color: MarkerColor;

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
