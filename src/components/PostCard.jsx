import { Link } from "react-router-dom";
import service from "../services/settings.js";

const PostCard = ({ $id, title, featuredImage }) => {
  // Default placeholder image for when featuredImage is null/undefined
  const placeholderImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDQwMCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiBmaWxsPSIjMzM0MTU1Ii8+CjxwYXRoIGQ9Ik0xMDAgODhIMzAwVjEzN0gxMDBWODhaIiBmaWxsPSIjNjc3M0Y2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTQ3SDMwMFYxOTZIMTAwVjE0N1oiIGZpbGw9IiM2NzczRjYiLz4KPC9zdmc+";

  const getImageUrl = () => {
    if (!featuredImage) {
      return placeholderImage;
    }

    try {
      const imageUrl = service.getFilePreview(featuredImage);
      return imageUrl || placeholderImage;
    } catch (error) {
      console.error("Error getting image URL:", error);
      return placeholderImage;
    }
  };

  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105">
        <div className="aspect-video overflow-hidden">
          <img
            src={getImageUrl()}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.src = placeholderImage;
            }}
          />
        </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
            {title}
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Read more</span>
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-purple-300 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
