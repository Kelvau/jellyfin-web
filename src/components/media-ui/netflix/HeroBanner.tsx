import React, { type FC } from 'react';

export interface HeroBannerItem {
    title: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    onPlay?: () => void;
    onMoreInfo?: () => void;
}

interface HeroBannerProps {
    item?: HeroBannerItem;
}

export const HeroBanner: FC<HeroBannerProps> = ({ item }) => {
    if (!item) return null;

    return (
        <section
            className='mediaHeroBanner'
            style={item.imageUrl ? { backgroundImage: `url("${item.imageUrl}")` } : undefined}
            aria-label={item.title}
        >
            <div className='mediaHeroBanner__content'>
                <h1>{item.title}</h1>
                {item.subtitle && <div className='mediaHeroBanner__subtitle'>{item.subtitle}</div>}
                {item.description && <p>{item.description}</p>}
                <div className='mediaHeroBanner__actions'>
                    {item.onPlay && <button type='button' onClick={item.onPlay}>▶ Reproduzir</button>}
                    {item.onMoreInfo && <button type='button' onClick={item.onMoreInfo}>ⓘ Mais informações</button>}
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;
