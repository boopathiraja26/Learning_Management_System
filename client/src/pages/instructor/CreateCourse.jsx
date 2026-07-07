import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../../api/course";
import toast from "react-hot-toast";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleThumbnail = (e) => {
    setThumbnail(e.target.files[0]);
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

      const res = await createCourse(data);

      if (res.success) {
        toast.success(res.message);
        navigate("/instructor");
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create course"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">

      <h1 className="text-4xl font-bold mb-8">
        Create Course
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-8 space-y-6"
      >

        <div>
          <label className="block mb-2 font-semibold">
            Course Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Thumbnail
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnail}
            className="w-full"
          />
        </div>

        <button
          disabled={loading}
          className="bg-purple-700 text-white px-8 py-3 rounded-lg hover:bg-purple-800 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>

      </form>

    </div>
  );
};

export default CreateCourse;