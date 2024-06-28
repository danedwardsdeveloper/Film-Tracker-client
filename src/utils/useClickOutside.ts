export function useClickOutside(node: HTMLElement, { callback, ignoredElements = [] }: { callback: () => void, ignoredElements?: HTMLElement[] }) {
    const handleClick = (event: MouseEvent) => {
        const target = event.target as Node;
        if (node && !node.contains(target) && !ignoredElements.some(el => el.contains(target)) && !event.defaultPrevented) {
            callback();
        }
    };

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    };
}