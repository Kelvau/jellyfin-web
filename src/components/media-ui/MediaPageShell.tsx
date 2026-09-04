import React, { type FC, type PropsWithChildren, useEffect } from 'react';

interface MediaPageShellProps extends PropsWithChildren {
    mode: 'netflix' | 'livetv';
}

const MediaPageShell: FC<MediaPageShellProps> = ({ mode, children }) => {
    useEffect(() => {
        const className = `media-mode-${mode}`;
        document.body.classList.add(className);

        return () => {
            document.body.classList.remove(className);
        };
    }, [ mode ]);

    return (
        <div className={`mediaPageShell mediaPageShell--${mode}`} data-media-mode={mode}>
            {children}
        </div>
    );
};

export default MediaPageShell;
