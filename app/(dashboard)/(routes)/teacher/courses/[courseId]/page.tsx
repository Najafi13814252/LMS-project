async function Course({params}: {params: Promise<{ courseId: string }>}) {
    const { courseId } = await params
  return (
    <div>
      course id: {courseId}
    </div>
  )
}

export default Course
