import React, { type FC, type PropsWithChildren } from 'react';

export interface Channel {
    id: string;
    name: string;
    logoUrl?: string;
}

interface ChannelRowProps extends PropsWithChildren {
    channel: Channel;
}

export const ChannelRow: FC<ChannelRowProps> = ({ channel, children }) => (
    <div className='mediaTvChannelRow'>
        <div className='mediaTvChannelRow__channel'>
            {channel.logoUrl ? <img src={channel.logoUrl} alt='' loading='lazy' /> : <span>TV</span>}
            <strong title={channel.name}>{channel.name}</strong>
        </div>
        <div className='mediaTvChannelRow__programs'>{children}</div>
    </div>
);

export default ChannelRow;
