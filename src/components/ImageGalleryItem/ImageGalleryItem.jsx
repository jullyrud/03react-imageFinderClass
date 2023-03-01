import { GalleryItem, GalleryItemImg } from '../ImageGalleryItem/ImageGalleryItem.styled'


export function ImageGalleryItem({gallery, onSelect}) {
    const { webformatURL, tags } = gallery
    return (
       
        <GalleryItem >
            <GalleryItemImg onClick={() => {onSelect(gallery)}} src={webformatURL} alt={ tags } />
        </GalleryItem>
    )
 }