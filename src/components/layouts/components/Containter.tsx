import { FC, PropsWithChildren } from 'react'

import { clsx } from 'clsx'

interface Props {
    className?: string
}

export const Container: FC<PropsWithChildren<Props>> = ({ children, className }) => {
    return <div className={clsx('w-full px-4 mx-auto', className)}>{children}</div>
}
