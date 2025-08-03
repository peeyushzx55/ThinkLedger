import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../services/settings.js";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      setError(null);

      service
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          } else {
            setError("Post not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          if (error.code === 404 || error.message.includes("not found")) {
            setError("Post not found");
          } else {
            setError("Failed to load post. Please try again later.");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  // Default placeholder image for when featuredImage is null/undefined
  const placeholderImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDQwMCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiBmaWxsPSIjMzM0MTU1Ii8+CjxwYXRoIGQ9Ik0xMDAgODhIMzAwVjEzN0gxMDBWODhaIiBmaWxsPSIjNjc3M0Y2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTQ3SDMwMFYxOTZIMTAwVjE0N1oiIGZpbGw9IiM2NzczRjYiLz4KPC9zdmc+";

  const getImageUrl = () => {
    if (!post?.featuredImage) {
      return placeholderImage;
    }

    try {
      const imageUrl = service.getFilePreview(post.featuredImage);
      return imageUrl || placeholderImage;
    } catch (error) {
      console.error("Error getting image URL:", error);
      return placeholderImage;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              Go Home
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return post ? (
    <div className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="w-full flex justify-center mb-8 relative">
            <div className="w-full max-w-4xl aspect-video overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <img
                src={getImageUrl()}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = placeholderImage;
                }}
              />
            </div>

            {isAuthor && (
              <div className="absolute right-6 top-6 flex space-x-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-green-600 hover:bg-green-700"
                    className="shadow-lg"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-600 hover:bg-red-700"
                  onClick={deletePost}
                  className="shadow-lg"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Post Title */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
          </div>

          {/* Post Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-gray-200 leading-relaxed text-lg">
              {parse(post.content)}
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
};

export default Post;
