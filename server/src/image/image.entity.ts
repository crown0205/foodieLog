import { Post } from 'src/post/post.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn() // NOTE : 자동 생성되는 ID 필드
  id: number;

  @Column()
  url: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date | null;

  @ManyToOne(() => Post, (post) => post.images, {
    onDelete: 'CASCADE', // NOTE : Post가 삭제되면 이미지도 삭제된다.
  })
  post: Post;
}
