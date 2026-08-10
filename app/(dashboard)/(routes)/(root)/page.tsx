import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { auth } from "@clerk/nextjs/server";
import CoursesList from "../search/_components/CoursesList";
import InfoCard from "./_components/InfoCard";
import { CheckCircle, Clock } from "@hugeicons/core-free-icons";

export default async function Home() {
  const { userId } = await auth()

  const { completedCourses, coursesInProgress } = await getDashboardCourses(userId!)

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="درحال انجام"
          numberOfItem={coursesInProgress.length}
          variant="default"
        />
        <InfoCard
          icon={CheckCircle}
          label="کامل شده"
          numberOfItem={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
