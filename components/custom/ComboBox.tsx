import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxTrigger,
    ComboboxValue,
} from "@/components/ui/combobox"
import { Button } from "../ui/button"

type OptionType = {
    label: string
    value: string
}

type OptionProps = {
    options: OptionType[]
    value?: string
    onChange?: (value: string) => void
}

function ComboBox({ options, value, onChange }: OptionProps) {
    const selected = options.find(o => o.value === value) ?? null
    return (
        <Combobox
            items={options}
            itemToStringValue={(option: OptionType) => option.label}
            value={selected}
            onValueChange={(option: OptionType | null) => {
                onChange?.(option?.value ?? "")
            }}
        >
            <ComboboxTrigger render={
                <Button variant="outline" className="w-64 justify-between font-normal">
                    <ComboboxValue />
                    {!value && "یک دسته‌بندی انتخاب کنید"}
                </Button>} />
            <ComboboxContent>
                <ComboboxInput placeholder="جستجو" className="bg-white" showTrigger={false} />
                <ComboboxEmpty>دسته‌بندی وجود ندارد</ComboboxEmpty>
                <ComboboxList>
                    {(option: OptionType) => (
                        <ComboboxItem key={option.value} value={option}>
                            {option.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}

export default ComboBox