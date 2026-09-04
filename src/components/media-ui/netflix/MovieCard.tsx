import React, { type FC } from 'react';

export interface MovieCardItem {
    id: string;
    title: string;
    imageUrl?: string;
    subtitle?: string;
    onClick?: () => void;
}

interface MovieCardProps {
    item: MovieCardItem;
}

export const MovieCard: FC<MovieCardProps> = ({ item }) => (
    <article className='mediaMovieCard'>
        <button
            type='button'
            className='mediaMovieCard__button'
            aria-label={item.title}
            onClick={item.onClick}
        >
            <div className='mediaMovieCard__image'>
                {item.imageUrl && <img src={item.imageUrl} alt='' loading='lazy' />}
                <div className='mediaMovieCard__overlay'>
                    <span className='mediaMovieCard__play'>▶</span>
                    <strong>{item.title}</strong>
                    {item.subtitle && <small>{item.subtitle}</small>}
                </div>
            </div>
        </button>
    </article>
);

export default MovieCard;
