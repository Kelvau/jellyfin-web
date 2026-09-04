import React, { type FC, type PropsWithChildren, useRef } from 'react';

interface CarouselProps extends PropsWithChildren {
    title?: string;
}

export const Carousel: FC<CarouselProps> = ({ title, children }) => {
    const ref = useRef<HTMLDivElement>(null);

    const scroll = (direction: number) => {
        ref.current?.scrollBy({ left: direction * Math.max(ref.current.clientWidth * 0.75, 320), behavior: 'smooth' });
    };

    return (
        <section className='mediaCarousel' aria-label={title}>
            <div className='mediaCarousel__header'>
                {title && <h2>{title}</h2>}
                <div className='mediaCarousel__controls'>
                    <button type='button' aria-label='Anterior' onClick={() => scroll(-1)}>‹</button>
                    <button type='button' aria-label='Próximo' onClick={() => scroll(1)}>›</button>
                </div>
            </div>
            <div ref={ref} className='mediaCarousel__track'>
                {children}
            </div>
        </section>
    );
};

export default Carousel;
