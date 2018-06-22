export default function getHeaderOptionClassName(pathname, path) {
    return `header-button ${pathname === `/${path}` ? 'active' : ''}`;
};
