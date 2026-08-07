"use client"

import { ReactElement } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loader } from "@hugeicons/core-free-icons"

interface ConfirmModalProps {
  children: ReactElement
  onConfirm: () => void
  disabled: boolean
  source: string
}

function ConfirmModal({ children, onConfirm, disabled, source }: ConfirmModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={children}>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>آیا از حذف {source} مطمئن هستید؟</AlertDialogTitle>
          <AlertDialogDescription>در صورت حذف {source} دیگر قابل بازگشت نخواهد بود</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>لغو</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {disabled ? (
              <>
              <HugeiconsIcon icon={Loader} className="animate-spin"/>
              درحال حذف...
              </>
            ) : "حذف"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmModal
