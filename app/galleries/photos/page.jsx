import RoutesHeader from "@/app/ui/components/RoutesHeader";
import PhotoGallery from "../../ui/components/PhotoGallery"
import Image from "next/image";

export const metadata = {
  title: 'آموزشگاه چهارباغ | گالری عکس',
  description: 'این صفحه گالری عکس آموزشگاه موسیقی چهارباغ است.',
};

const PhotoGalleryPage = () => {
    return ( 
        <div className="bg-[#F6F4EE] dark:bg-gray-900">
            <RoutesHeader pageTitle={'گالری'} boldText={'گالـــــری'} Highlight={' عکس های برتر'}/>
            <PhotoGallery/>
          <Image width={1920} height={134} src="/images/shapes/footer-1.png" alt="footer" />
        </div>
     );
}
 
export default PhotoGalleryPage;