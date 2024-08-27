import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  // NOTE : page에 해당하는 즐겨찾기한 게시글을 가져옵니다.
  async getMyFavoritePosts(page: number, user: User) {
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const favorites = await this.favoriteRepository
      .createQueryBuilder('favorite')
      .innerJoinAndSelect('favorite.post', 'post')
      .where('favorite.userId = :userId', { userId: user.id })
      .orderBy('favorite.createAt', 'DESC')
      .skip(offset)
      .take(pageSize)
      .getMany();

    const newPosts = favorites.map((favorite) => {
      const post = favorite.post;

      if (!post.images) {
        return { ...post, images: [] };
      }

      const images = [...post.images].sort((a, b) => (a.id = b.id));

      return {
        ...post,
        images,
      };
    });

    return newPosts;
  }

  // NOTE : postId에 해당하는 게시글을 즐겨찾기에 추가하거나 삭제합니다.
  async toggleFavorite(postId: number, user: User) {
    if (!postId) {
      throw new BadRequestException('존재하지 않는 게시글입니다.');
    }

    const existingFavorite = await this.favoriteRepository.findOne({
      where: { postId, userId: user.id },
    });

    console.log({ existingFavorite });

    if (existingFavorite) {
      await this.favoriteRepository.delete(existingFavorite.id);

      return { id: postId, message: '즐겨찾기에서 삭제되었습니다.' };
    }

    const favorite = this.favoriteRepository.create({
      postId,
      userId: user.id,
    });

    await this.favoriteRepository.save(favorite);

    return { id: favorite.postId, message: '즐겨찾기에 추가되었습니다.' };
  }
}
