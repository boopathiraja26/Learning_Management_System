import { useState } from "react";
import toast from "react-hot-toast";
import { updateCourse } from "../../api/course";

const EditCourse = ({ course, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description,
    category: course.category,
    price: course.price,
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);

      if (thumbnail) {
        data.append("thumbnail", thumbnail);
      }

      const res = await updateCourse(course._id, data);

      toast.success(res.message);

      if (onSuccess) onSuccess();
      if (onClose) onClose();

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update course"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Course Title"
        className="w-full border rounded-lg p-3"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
        placeholder="Description"
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setThumbnail(e.target.files[0])}
        className="w-full border rounded-lg p-3"
      />

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          {loading ? "Updating..." : "Update Course"}
        </button>

      </div>

    </form>
  );
};

export default EditCourse;