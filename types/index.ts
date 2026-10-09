export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
  link: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  author: string;
  commentsCount: string;
  image: string;
}