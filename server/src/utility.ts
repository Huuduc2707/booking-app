import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'deoifwvax',
  api_key: '996692159189324',
  api_secret: '6Q0rVEI-7eNwQGnqytlJHGKHmLw',
});

export function IdGenerator(type: string): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = type;
  const charactersLength = characters.length;
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  return result;
}
