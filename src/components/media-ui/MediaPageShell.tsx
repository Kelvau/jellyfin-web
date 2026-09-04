import React, { type FC, type PropsWithChildren } from 'react';

interface MediaPageShellProps extends PropsWithChildren {
    mode: 'netflix' | 'livetv';
}

const MediaPageShell: FC<MediaPageShellProps> = ({ mode, children }) => (
    <div className={`mediaPageShell mediaPageShell--${mode}`} data-media-mode={mode}>
        {children}
    </div>
);

export default MediaPageShell;
