/**
 * Updates the favicon depending on if there's darkmode or not
 */

const matcher = window.matchMedia('(prefers-color-scheme: dark)');
const update = () => {
const lightFavicon = document.getElementById('favicon-light');
const darkFavicon = document.getElementById('favicon-dark');
    if (matcher.matches) {
        lightFavicon?.remove();
        document.head.append(darkFavicon);
    } else {
        darkFavicon?.remove();
        document.head.append(lightFavicon);
    }
}
matcher.addEventListener('update', update);
update();