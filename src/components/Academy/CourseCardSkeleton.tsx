export const SingleLevelCourseSkeleton = () => (
    <>
        {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-white px-5 py-6 flex flex-col flex-1 animate-pulse">
                <div className="flex gap-2">
                    <div className="h-8 w-16 rounded-lg bg-gray-200" />
                    <div className="h-8 w-24 rounded-lg bg-gray-200" />
                </div>
                <div className="h-6 w-3/4 rounded bg-gray-200 mt-[18px]" />
                <div className="h-4 w-1/2 rounded bg-gray-200 mt-2" />
                <div className="h-4 w-1/3 rounded bg-gray-200 mt-[20px]" />
                <div className="space-y-2 mt-2 flex-1">
                    <div className="h-3 w-full rounded bg-gray-200" />
                    <div className="h-3 w-5/6 rounded bg-gray-200" />
                    <div className="h-3 w-4/6 rounded bg-gray-200" />
                </div>
                <div className="h-[54px] w-full rounded-[12px] bg-gray-200 mt-5" />
            </div>
        ))}
    </>
)

export const BundledCourseSkeleton = () => (
    <div className="rounded-lg bg-white px-5 py-6 flex flex-col flex-1 animate-pulse">
        <div className="flex gap-2">
            <div className="h-8 w-24 rounded-lg bg-gray-200" />
            <div className="h-8 w-16 rounded-lg bg-gray-200" />
        </div>
        <div className="h-6 w-3/4 rounded bg-gray-200 mt-[18px]" />
        <div className="h-4 w-1/2 rounded bg-gray-200 mt-2" />
        <div className="h-4 w-1/3 rounded bg-gray-200 mt-[14px]" />
        <div className="space-y-2 mt-2">
            <div className="h-3 w-full rounded bg-gray-200" />
            <div className="h-3 w-5/6 rounded bg-gray-200" />
            <div className="h-3 w-4/6 rounded bg-gray-200" />
        </div>
        <div className="flex gap-4 mt-5">
            <div className="h-[54px] flex-1 rounded-[12px] bg-gray-200" />
            <div className="h-[54px] flex-1 rounded-[12px] bg-gray-200" />
        </div>
    </div>
)
