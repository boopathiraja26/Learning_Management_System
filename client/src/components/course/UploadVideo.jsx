import { useState } from "react";
import toast from "react-hot-toast";

import { uploadLectureVideo } from "../../api/Lecture";

const UploadVideo = ({ lectureId, onSuccess, onClose }) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!video) {
      return toast.error("Please select a video");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("video", video);

      const res = await uploadLectureVideo(
        lectureId,
        formData
      );

      toast.success(res.message);

      if (onSuccess) {
        onSuccess();
      }

      if (onClose) {
        onClose();
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Upload Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="space-y-5"
    >
      <input
        type="file"
        accept="video/*"
        onChange={(e) =>
          setVideo(e.target.files[0])
        }
        className="w-full border rounded-lg p-3"
      />

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={onClose}
          className="bg-gray-400 text-white px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          {loading
            ? "Uploading..."
            : "Upload Video"}
        </button>

      </div>
    </form>
  );
};

export default UploadVideo;