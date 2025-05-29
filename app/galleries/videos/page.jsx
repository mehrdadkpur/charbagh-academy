import RoutesHeader from "@/app/ui/components/RoutesHeader";
import VideoGallery from "../../ui/components/VideoGallery"

export const metadata = {
    title: 'آموزشگاه چهارباغ | گالری فیلم',
    description: 'این صفحه گالری فیلم آموزشگاه موسیقی چهارباغ است.',
  };

const VideoGalleryPage = () => {
    return ( 
        <div className="bg-[#F6F4EE] dark:bg-gray-900">
            <RoutesHeader pageTitle={'گالری'} boldText={'گالـــــری'} Highlight={' فیلم های برتر'}/>
            <VideoGallery/>
        </div>
     );
}
 
export default VideoGalleryPage;