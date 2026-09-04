import React, { type FC } from 'react';

export interface Program {
    id: string;
    name: string;
    start: Date | string;
    end: Date | string;
    description?: string;
    imageUrl?: string;
    onSelect?: () => void;
}

interface ProgramCellProps {
    program: Program;
    timelineStart: Date;
    pixelsPerMinute?: number;
}

export const ProgramCell: FC<ProgramCellProps> = ({ program, timelineStart, pixelsPerMinute = 8 }) => {
    const start = new Date(program.start).getTime();
    const end = new Date(program.end).getTime();
    const offset = Math.max(0, (start - timelineStart.getTime()) / 60000 * pixelsPerMinute);
    const width = Math.max(90, (end - start) / 60000 * pixelsPerMinute);

    return (
        <button
            type='button'
            className='mediaTvProgramCell'
            style={{ left: offset, width }}
            onClick={program.onSelect}
            title={program.description || program.name}
        >
            {program.imageUrl && <img src={program.imageUrl} alt='' loading='lazy' />}
            <span className='mediaTvProgramCell__body'>
                <strong>{program.name}</strong>
                <small>{new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
            </span>
        </button>
    );
};

export default ProgramCell;
