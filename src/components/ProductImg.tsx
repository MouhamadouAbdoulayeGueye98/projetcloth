
import { 
  ImageContainer, 
  StyledImage 
} from '../styles/ProductImg';

interface ProductImageProps {
  src: string;
  alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <ImageContainer>
      <StyledImage 
        src={src || "/placeholder.svg"} 
        alt={alt} 
        layout="fill" // Utilisation de 'layout' pour le dimensionnement de l'image
        sizes="(max-width: 768px) 100vw, 50vw" 
        priority 
      />
    </ImageContainer>
  );
}
