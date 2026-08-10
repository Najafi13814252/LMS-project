import { cn } from "@/lib/utils"
import { Progress, ProgressLabel, ProgressValue } from "../ui/progress"

interface CourseProgressProps {
  variant?: "default" | "success"
  value?: number
  size?: "default" | "sm"
}

const colorVariant = {
  default: "text-primary",
  success: "text-primary"
}

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs"
}

function CourseProgress({ variant, value, size }: CourseProgressProps) {
  return (
    <div>
      <Progress value={value || 0}>
        <ProgressLabel className={cn(
          colorVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}>پیشرفت شما</ProgressLabel>
        <ProgressValue className={cn(
          colorVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )} />
      </Progress>
    </div>
  )
}

export default CourseProgress
