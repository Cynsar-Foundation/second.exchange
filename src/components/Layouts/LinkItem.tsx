import { FiCompass, FiEdit, FiHome, FiSettings, FiStar, FiTrendingUp } from "react-icons/fi";
import { IconType } from "react-icons/lib";

interface LinkItemProps {
    name: String,
    icon: IconType,
    where: string
  }
  
  const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome,  where: '/' },
    { name: 'Write', icon: FiEdit, where: 'write' },
    { name: 'Trending', icon: FiTrendingUp , where: 'trend'},
    { name: 'Explore', icon: FiCompass, where: 'explore' },
    { name: 'Favourites', icon: FiStar,  where: 'fav' },
    { name: 'Settings', icon: FiSettings, where: 'set' }
  ]; 


  export default LinkItems 