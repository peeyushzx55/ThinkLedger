import { useCallback, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import service from "../../services/settings.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentLength, setContentLength] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const submit = async (data) => {
    setIsSubmitting(true);

    try {
      // Check content length
      if (data.content && data.content.length > 1000) {
        alert(
          "Content is too long. Please reduce the content to under 1000 characters."
        );
        setIsSubmitting(false);
        return;
      }

      if (post) {
        const file = data.image[0]
          ? await service.uploadFile(data.image[0])
          : null;

        if (file) {
          service.deleteFile(post.featuredImage);
        }

        const dbPost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await service.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await service.createPost({
            ...data,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);

      if (error.message.includes("Invalid document structure")) {
        alert(
          "Content is too long. Please reduce the content to under 1000 characters."
        );
      } else {
        alert("Failed to save post. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
      if (name === "content") {
        setContentLength(value.content?.length || 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Update the form value
      setValue("image", event.target.files);
    }
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          {post ? "Edit Post" : "Create New Post"}
        </h1>
        <p className="text-gray-300">
          {post
            ? "Update your post content"
            : "Share your thoughts with the world"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Input
              label="Title"
              placeholder="Enter your post title"
              className="mb-4"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug"
              placeholder="post-url-slug"
              className="mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Content
              </label>
              <RTE
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
              <div className="mt-2 text-sm">
                <span
                  className={`${
                    contentLength > 1000 ? "text-red-400" : "text-gray-400"
                  }`}
                >
                  {contentLength}/1000 characters
                </span>
                {contentLength > 1000 && (
                  <span className="text-red-400 ml-2">
                    ⚠️ Content is too long
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Featured Image
              </label>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                onChange={handleFileChange}
                name="image"
              />

              {/* Custom styled button */}
              <button
                type="button"
                onClick={handleFileSelect}
                className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span>{selectedFile ? selectedFile.name : "Choose Image"}</span>
              </button>

              {selectedFile && (
                <div className="mt-2 text-xs text-gray-400">
                  Selected: {selectedFile.name}
                </div>
              )}
            </div>

            {post && (
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Current Image
                </label>
                <div className="aspect-video overflow-hidden rounded-lg bg-white/10 border border-white/20">
                  <img
                    src={getImageUrl()}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = placeholderImage;
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Status
              </label>
              <Select
                options={["active", "inactive"]}
                className="mb-4 cursor-pointer"
                {...register("status", { required: true })}
              />
            </div>

            <Button
              type="submit"
              bgColor={
                post
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              }
              className="w-full py-3 text-lg font-semibold"
              disabled={isSubmitting || contentLength > 1000}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {post ? "Updating..." : "Publishing..."}
                </div>
              ) : post ? (
                "Update Post"
              ) : (
                "Publish Post"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
