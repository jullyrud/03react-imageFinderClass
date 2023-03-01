import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'
import { GalleryWrap } from './ImageGallery.styled'

export function ImageGallery({ gallery, onSelect }) {
    return (
        
        <GalleryWrap >
            {gallery.map(item => <ImageGalleryItem onSelect={onSelect} key={item.id} gallery={item} />)}
        </GalleryWrap>
        
       
    )
}


