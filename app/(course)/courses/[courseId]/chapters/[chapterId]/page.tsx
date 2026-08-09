import { getChapter } from "@/actions/get-chapter"
import Banner from "@/components/custom/Banner"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import VideoPlayer from "./_components/VideoPlayer"
import CourseEnrollButton from "./_components/CourseEnrollButton"
import { Separator } from "@/components/ui/separator"
import DOMPurify from "isomorphic-dompurify"
import { HugeiconsIcon } from "@hugeicons/react"
import { File } from "@hugeicons/core-free-icons"

async function ChapterIdPage({ params }: { params: Promise<{ courseId: string, chapterId: string }> }) {
  const { chapterId, courseId } = await params

  const { userId } = await auth()

  if (!userId) {
    return redirect('/')
  }

  const { chapter, course, attachment, nextChapter, purchase, userProgress } = await getChapter({ userId, courseId, chapterId })

  if (!chapter || !course) {
    return redirect('/')
  }

  const isLocked = !chapter.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isComplated

  return (
    <div className="">
      {userProgress?.isComplated && (
        <Banner label="شما قبلا این فصل را تکمیل کرده‌اید" variant="success" />
      )}
      {isLocked && (
        <Banner label="برای تماشای این فصل باید دوره را خریداری کنید" variant="warning" />
      )}
      <div className="flex flex-col max-w-2xl mx-auto pb-20 px-4 pt-4 gap-y-4">
        <VideoPlayer
          chapterId={chapterId}
          title={chapter.title}
          courseId={courseId}
          videoUrl={chapter.videoUrl!}
          nextChapterId={nextChapter?.id}
          isLocked={isLocked}
          completedOnEnd={completeOnEnd}
        />

        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col md:flex md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <div></div>
            ) : (
              <CourseEnrollButton
                courseId={courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(chapter.description!),
          }}
          ></div>
          {!!attachment.length && (
            <>
              <Separator />
              <div>
                {attachment.map(attach => (
                  <a href={attach.url} target="_blank" key={attach.id} className="flex items-center p-3 w-full bg-lime-100 border border-dashed border-lime-600 text-lime-600 gap-x-2 rounded-md hover:underline">
                    <HugeiconsIcon icon={File} />
                    <p className="line-clamp-1">{attach.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChapterIdPage
