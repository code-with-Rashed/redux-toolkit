import CourseDetails from "@/components/student/course/CourseDetails";
import Videos from "@/components/student/course/Videos";

const Course = () => {
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <CourseDetails />
          <Videos />
        </div>
      </div>
    </section>
  );
};
export default Course;
