import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getCourseById } from "../../api/course";
import { getCourseLectures } from "../../api/lecture";

import AddLecture from "../../components/course/AddLecture";
import UploadVideo from "../../components/course/UploadVideo";
import Modal from "../../components/common/Modal";
import EditLecture from "../../components/course/EditLecture";
import EditCourse from "../../components/course/EditCourse";
import toast from "react-hot-toast";

import { deleteCourse } from "../../api/course";
import { deleteLecture } from "../../api/lecture";


const ManageCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLecture, setEditingLecture] = useState(null);

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  const fetchCourseData = async () => {
    try {
      const courseResponse = await getCourseById(id);
      const lectureResponse = await getCourseLectures(id);

      setCourse(courseResponse.course);
      setLectures(lectureResponse.lectures || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const refreshLectures = async () => {
    try {
      const lectureResponse = await getCourseLectures(id);
      setLectures(lectureResponse.lectures || []);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteCourse = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this course?"
  );
  const handleDeleteLecture = async (lectureId) => {
  const confirmDelete = window.confirm(
    "Delete this lecture?"
  );

  if (!confirmDelete) return;

  try {
    const res = await deleteLecture(lectureId);

    toast.success(res.message);

    refreshLectures();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Delete failed"
    );
  }
};

  if (!confirmDelete) return;

  try {
    const res = await deleteCourse(course._id);

    toast.success(res.message);

    navigate("/instructor/dashboard");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to delete course"
    );
  }
};

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20 text-xl">
        Course not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Manage Course
      </h1>

      {/* Course Information */}

      <div className="bg-white rounded-xl shadow-md p-6 mb-10">

        <div className="grid md:grid-cols-2 gap-8">

          <img
            src={
              course.thumbnail ||
              "https://via.placeholder.com/700x400?text=Course"
            }
            alt={course.title}
            className="w-full h-72 object-cover rounded-lg"
          />

          <div>

            <h2 className="text-3xl font-bold mb-4">
              {course.title}
            </h2>

            <p className="text-gray-600 mb-6">
              {course.description}
            </p>

            <div className="space-y-3">

              <p>
                <strong>Category:</strong> {course.category}
              </p>

              <p>
                <strong>Price:</strong> ₹{course.price}
              </p>

              <p>
                <strong>Instructor:</strong>{" "}
                {course.instructor?.name}
              </p>

              <p>
                <strong>Students:</strong>{" "}
                {course.students?.length || 0}
              </p>

            </div>

            <div className="flex gap-4 mt-8">

              <button onClick={() => setShowEditCourseModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
              Edit Course
              </button>

              <button onClick={handleDeleteCourse}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg">
              Delete Course
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Lecture Header */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
          Lectures
        </h2>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-lg"
        >
          + Add Lecture
        </button>

      </div>

      {/* Add Lecture Modal */}

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Add New Lecture"
      >
        <AddLecture
          courseId={id}
          onSuccess={() => {
            refreshLectures();
            setOpenModal(false);
          }}
        />
      </Modal>

      {/* Upload Video Modal */}

      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Lecture Video"
      >
        {selectedLecture && (
          <UploadVideo
            lectureId={selectedLecture._id}
            onSuccess={() => {
              refreshLectures();
              setShowUploadModal(false);
            }}
            onClose={() => setShowUploadModal(false)}
          />
        )}
      </Modal> 

      {/* Edit Course Modal */}

    <Modal
      isOpen={showEditCourseModal}
      onClose={() => setShowEditCourseModal(false)}
      title="Edit Course">
    <EditCourse
    course={course}
    onSuccess={async () => {
      await fetchCourseData();
      setShowEditCourseModal(false);
    }}
    onClose={() => setShowEditCourseModal(false)}/>
    </Modal>
      
      {/* Edit Lecture Modal */}

    <Modal
      isOpen={showEditModal}
      onClose={() => setShowEditModal(false)}
      title="Edit Lecture">
    {editingLecture && (
    <EditLecture
      lecture={editingLecture}
      onSuccess={() => {
        refreshLectures();
        setShowEditModal(false);
      }}
      onClose={() => setShowEditModal(false)}/>
      )}
    </Modal>

      {/* Lecture List */}

      {lectures.length === 0 ? (

        <div className="bg-white rounded-xl shadow-md p-10 text-center">

          <h3 className="text-2xl font-semibold">
            No Lectures Available
          </h3>

          <p className="text-gray-500 mt-2">
            Click the "Add Lecture" button to create your first lecture.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {lectures.map((lecture, index) => (

            <div
              key={lecture._id}
              className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center"
            >

              <div>

                <h3 className="text-xl font-semibold">
                  {index + 1}. {lecture.title}
                </h3>

                <p className="text-gray-600 mt-2">
                  {lecture.description}
                </p>

                <p className="text-sm text-gray-400 mt-2">
                  Duration: {lecture.duration || 0} mins
                </p>

                {lecture.videoUrl ? (
                  <p className="text-green-600 text-sm mt-2 font-medium">
                    ✅ Video Uploaded
                  </p>
                ) : (
                  <p className="text-red-500 text-sm mt-2 font-medium">
                    ❌ No Video Uploaded
                  </p>
                )}

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => {
                    setSelectedLecture(lecture);
                    setShowUploadModal(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Upload Video
                </button>

                <button onClick={() => {
                setEditingLecture(lecture);
                setShowEditModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Edit
                </button>

                <button onClick={() => handleDeleteLecture(lecture._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default ManageCourse;