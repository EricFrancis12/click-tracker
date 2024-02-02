import { useState, useRef, useEffect } from 'react';
import Dropdown from '../components/Dropdown';
import { traverseParentsForId } from '../utils/utils';

export default function useHoverDropdown(id: string) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownId = useRef(crypto.randomUUID());

    function handleMouseEnter() {
        setIsHovered(true);

        const targetElement = document.getElementById(id);
        if (targetElement) targetElement.addEventListener('mouseleave', handleMouseExit);
        if (dropdownRef.current) dropdownRef.current.addEventListener('mouseleave', handleMouseExit);
    };

    function handleMouseExit(e: MouseEvent) {
        if (!traverseParentsForId(e.target as HTMLElement, id)
            && !traverseParentsForId(e.target as HTMLElement, dropdownId.current)) {
            setIsHovered(false);

            const targetElement = document.getElementById(id);
            if (targetElement) targetElement.removeEventListener('mouseleave', handleMouseExit);
            if (dropdownRef.current) dropdownRef.current.removeEventListener('mouseleave', handleMouseExit);
        }
    }

    useEffect(() => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
            targetElement.addEventListener('mouseenter', handleMouseEnter);
        }
        return () => {
            if (targetElement) {
                targetElement.removeEventListener('mouseenter', handleMouseEnter);
            }
        };
    }, [id, handleMouseEnter]);

    return { Dropdown, isHovered };
}
