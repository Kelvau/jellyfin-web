import { CollectionType } from '@jellyfin/sdk/lib/generated-client/models/collection-type';
import React, { type FC } from 'react';

import LibraryPage from 'apps/modern/features/libraries/components/LibraryPage';
import MediaPageShell from 'components/media-ui/MediaPageShell';

const LiveTv: FC = () => {
    return (
        <MediaPageShell mode='livetv'>
            <LibraryPage type={CollectionType.Livetv} />
        </MediaPageShell>
    );
};

export default LiveTv;
