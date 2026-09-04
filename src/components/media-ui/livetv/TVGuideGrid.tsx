import React, { type FC } from 'react';

interface TVGuideGridProps {
    children: React.ReactNode;
    timelineStart?: Date;
    minutes?: number;
    pixelsPerMinute?: number;
}

export const TVGuideGrid: FC<TVGuideGridProps> = ({ children, timelineStart = new Date(), minutes = 360, pixelsPerMinute = 8 }) => {
    const start = new Date(timelineStart);
    start.setSeconds(0, 0);
    const now = Date.now();
    const nowOffset = (now - start.getTime()) / 60000 * pixelsPerMinute;
    const totalWidth = minutes * pixelsPerMinute;

    return (
        <section className='mediaTvGuide' aria-label='Guia de televisão'>
            <div className='mediaTvGuide__toolbar'>
                <button type='button'>Agora</button>
                <button type='button'>Próximos</button>
                <button type='button'>Hoje à noite</button>
            </div>
            <div className='mediaTvGuide__viewport'>
                <div className='mediaTvGuide__timeline' style={{ width: totalWidth }}>
                    <div className='mediaTvGuide__now' style={{ left: Math.max(0, nowOffset) }} aria-hidden='true' />
                    {children}
                </div>
            </div>
        </section>
    );
};

export default TVGuideGrid;
