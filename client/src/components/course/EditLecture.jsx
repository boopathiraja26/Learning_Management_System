import { useState } from "react";
import { updateLecture } from "../../api/lecture";
import toast from "react-hot-toast";


const EditLecture = ({ lecture, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    title: lecture.title,
    description: lecture.description,
    duration: lecture.duration,
  });

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

      const res = await updateLecture(
        lecture._id,
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
          "Update Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Lecture Title"
        className="w-full border rounded-lg p-3"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows="4"
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="number"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        placeholder="Duration"
        className="w-full border rounded-lg p-3"
        required
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
          {loading ? "Updating..." : "Update Lecture"}
        </button>

      </div>

    </form>
  );
};

export default EditLecture;