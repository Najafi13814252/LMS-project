import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DataCardProps {
    value: number
    label: string
    shouldFormat?: boolean
}

function DataCard({ label, value, shouldFormat }: DataCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">{label}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xl font-bold">
                    {shouldFormat ? `${value.toLocaleString('fa-ir')} تومان` : value}
                </div>
            </CardContent>
        </Card>
    )
}

export default DataCard
