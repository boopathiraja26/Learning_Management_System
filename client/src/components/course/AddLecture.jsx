import { useState } from "react";
import { createLecture } from "../../api/lecture";

const AddLecture = ({ courseId, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
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

      await createLecture(courseId, formData);

      alert("Lecture Created Successfully");

      setFormData({
        title: "",
        description: "",
        duration: "",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create lecture"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">
        Add New Lecture
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-semibold">
            Lecture Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter lecture title"
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter lecture description"
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Duration (Minutes)
          </label>

          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="30"
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Creating..." : "Create Lecture"}
        </button>
      </form>
    </div>
  );
};

export default AddLecture;