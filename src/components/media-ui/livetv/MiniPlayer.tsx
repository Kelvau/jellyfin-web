import React, { type FC } from 'react';

interface MiniPlayerProps {
    src?: string;
    title?: string;
    poster?: string;
}

export const MiniPlayer: FC<MiniPlayerProps> = ({ src, title, poster }) => (
    <aside className='mediaMiniPlayer' aria-label={title || 'Mini player'}>
        <video controls playsInline poster={poster} src={src} />
        {title && <div className='mediaMiniPlayer__title'>{title}</div>}
    </aside>
);

export default MiniPlayer;
