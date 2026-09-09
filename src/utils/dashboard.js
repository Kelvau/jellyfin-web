import { appHost } from 'components/apphost';
import viewContainer from 'components/viewContainer';
import { AppFeature } from 'constants/appFeature';
import { ServerConnections } from 'lib/jellyfin-apiclient';

import toast from '../components/toast/toast';
import loading from '../components/loading/loading';
import { appRouter } from '../components/router/appRouter';
import baseAlert from '../components/alert';
import baseConfirm from '../components/confirm/confirm';
import globalize from '../lib/globalize';
import * as webSettings from '../scripts/settings/webSettings';
import datetime from '../scripts/datetime';
import { setBackdropTransparency } from '../components/backdrop/backdrop';
import DirectoryBrowser from '../components/directorybrowser/directorybrowser';
import dialogHelper from '../components/dialogHelper/dialogHelper';
import itemIdentifier from '../components/itemidentifier/itemidentifier';
import { getLocationSearch } from './url.ts';
import { queryClient } from './query/queryClient';

const CODE_SPACE_PROXY_PATH = '/jellyfin-proxy';

function getDefaultServerUrl() {
    const hostname = window.location.hostname;
    const isCodespace = hostname.endsWith('.app.github.dev') || hostname === 'localhost' || hostname === '127.0.0.1';

    if (isCodespace) {
        return `${window.location.origin}${CODE_SPACE_PROXY_PATH}`;
    }

    return window.location.origin;
}

export function getCurrentUser() {
    return window.ApiClient.getCurrentUser(false);
}

// TODO: investigate url prefix support for serverAddress function
export async function serverAddress() {
    const apiClient = window.ApiClient;

    if (apiClient) {
        return Promise.resolve(apiClient.serverAddress());
    }

    // Use servers specified in config.json
    const urls = await webSettings.getServers();

    if (urls.length === 0) {
        // Otherwise use computed base URL
        let url;
        const index = window.location.href.toLowerCase().lastIndexOf('/web');
        if (index != -1) {
            url = window.location.href.substring(0, index);
        } else {
            url = getDefaultServerUrl();
        }

        // Don't use bundled app URL (file:) as server URL
        if (url.startsWith('file:')) {
            return Promise.resolve();
        }

        urls.push(url);
    }

    console.debug('URL candidates:', urls);

    const promises = urls.map(url => {
        return fetch(`${url}/System/Info/Public`, { cache: 'no-cache' })
            .then(async resp => {
                if (!resp.ok) {
                    return;
                }

                let config;
                try {
                    config = await resp.json();
                } catch {
                    return;
                }

                return {
                    url,
                    config
                };
            }).catch(error => {
                console.error(error);
            });
    });

    return Promise.all(promises).then(responses => {
        return responses.filter(obj => obj?.config);
    }).then(configs => {
        const selection = configs.find(obj => !obj.config.StartupWizardCompleted) || configs[0];
        return selection?.url;
    }).catch(error => {
        console.error(error);
    });
}

export function getCurrentUserId() {
    const apiClient = window.ApiClient;

    if (apiClient) {
        return apiClient.getCurrentUserId();
    }

    return null;
}

export function onServerChanged(_userId, _accessToken, apiClient) {
    ServerConnections.setLocalApiClient(apiClient);
}

export function logout() {
    ServerConnections.logout().then(function () {
        // Clear the query cache
        queryClient.clear();
        // Reset cached views
        viewContainer.reset();

        if (appHost.supports(AppFeature.MultiServer)) {
            selectServer();
        } else {
            navigate('login');
        }
    });
}

export function getPluginUrl(name) {
    return 'configurationpage?name=' + encodeURIComponent(name);