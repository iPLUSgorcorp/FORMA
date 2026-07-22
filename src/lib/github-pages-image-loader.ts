type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

export default function githubPagesImageLoader({ src }: ImageLoaderProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${src}`;
}
