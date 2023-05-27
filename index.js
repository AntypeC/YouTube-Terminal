const yt = require('youtube-search-without-api-key');

/**
 * Given a search query, searching on youtube
 * @param {string} search value.
 */

async function getVids() {
    const videos = yt.search('My Search Query');
    return videos
}
console.log('Videos:');
console.log(getVids());