import {NextPage} from "next";
import {PropsWithChildren, ReactElement} from "react";
import {LayoutWithHeader} from "@/components";

export const GlobalLayout: NextPage<PropsWithChildren> = ({ children }) => {
    return (
        <LayoutWithHeader>
            <div className="min-h-[calc(100vh-60px)]">
                <div className="">
                    {children}
                </div>
            </div>
        </LayoutWithHeader>
    )
}
export const getGlobalLayout = (page: ReactElement) => {
    return <GlobalLayout>{page}</GlobalLayout>
}