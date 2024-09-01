type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';

type Category = {
  [key in MarkerColor]: string;
};

interface Profile {
  id: number;
  email: string;
  nickname: string | null;
  imageUrl: string | null;
  kakaoImageUrl: string | null;
  loginType: 'email' | 'kakao' | 'apple';
}

export type {Profile, Category, MarkerColor};
