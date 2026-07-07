import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getCourseById } from "../../api/course";
import { getCourseLectures } from "../../api/lecture";
import {
  getCourseProgress,
  markLectureCompleted,
} from "../../api/progress";

const CoursePlayer = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [currentLecture, setCurrentLecture] = useState(null);

  const [progress, setProgress] = useState(0);
  const [completedLectures, setCompletedLectures] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
    fetchProgress();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const courseRes = await getCourseById(id);
      const lectureRes = await getCourseLectures(id);

      setCourse(courseRes.course);
      setLectures(lectureRes.lectures || []);

      if (lectureRes.lectures.length > 0) {
        setCurrentLecture(lectureRes.lectures[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const res = await getCourseProgress(id);

      setProgress(res.percentage || 0);
      setCompletedLectures(
        res.progress?.completedLectures || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async () => {
    if (!currentLecture) return;

    try {
      const res = await markLectureCompleted(
        id,
        currentLecture._id
      );

      toast.success(res.message);

      fetchProgress();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to mark lecture completed"
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

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8">
        {course?.title}
      </h1>

      {/* Progress */}

      <div className="mb-8">

        <div className="flex justify-between mb-2">

          <h2 className="font-semibold">
            Course Progress
          </h2>

          <span>{progress}%</span>

        </div>

        <div className="w-full bg-gray-300 rounded-full h-3">

          <div
            className="bg-green-600 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          ></div>

        </div>

      </div>

      <div className="grid md:grid-cols-4 gap-8">

        {/* Video Section */}

        <div className="md:col-span-3">

          {currentLecture ? (
            <>

              {currentLecture.videoUrl ? (
                <video
                  src={currentLecture.videoUrl}
                  controls
                  controlsList="nodownload"
                  className="w-full rounded-xl shadow-lg"
                />
              ) : (
                <div className="bg-gray-200 h-96 rounded-xl flex items-center justify-center">
                  No Video Uploaded
                </div>
              )}

              <h2 className="text-3xl font-bold mt-6">
                {currentLecture.title}
              </h2>

              <p className="text-gray-600 mt-3">
                {currentLecture.description}
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Duration : {currentLecture.duration || 0} mins
              </p>

              <button
                onClick={handleComplete}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
              >
                Mark as Completed
              </button>

            </>
          ) : (
            <div className="bg-gray-100 rounded-xl p-10 text-center">
              No Lectures Available
            </div>
          )}

        </div>

        {/* Sidebar */}

        <div className="bg-white rounded-xl shadow-lg p-5">

          <h2 className="text-2xl font-bold mb-5">
            Course Content
          </h2>

          <div className="space-y-3">

            {lectures.map((lecture, index) => {

              const completed =
                completedLectures.includes(lecture._id);

              return (
                <button
                  key={lecture._id}
                  onClick={() => setCurrentLecture(lecture)}
                  className={`w-full text-left p-4 rounded-lg transition ${
                    currentLecture?._id === lecture._id
                      ? "bg-purple-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center">

                    <div>

                      <p className="font-semibold">
                        {index + 1}. {lecture.title}
                      </p>

                      <p className="text-sm opacity-80">
                        {lecture.duration || 0} mins
                      </p>

                    </div>

                    {completed && (
                      <span className="text-green-500 text-xl">
                        ✓
                      </span>
                    )}

                  </div>
                </button>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  );
};

export default CoursePlayer;