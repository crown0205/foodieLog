type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';

type Category = {
  [key in MarkerColor]: string;
};

interface ImageUrl {
  id?: number;
  url: string;
}

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: MarkerColor;
  score: number;
}

interface Post extends Marker {
  title: string;
  address: string;
  date: Date | string;
  description: string;
}

interface Profile {
  id: number;
  email: string;
  nickname: string | null;
  imageUrl: string | null;
  kakaoImageUrl: string | null;
  loginType: 'email' | 'kakao' | 'apple';
}

export type { Category, ImageUrl, Marker, MarkerColor, Post, Profile };
