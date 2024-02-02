import React, { useState, useEffect } from 'react';
import useWindowResize from './useWindowResize';

type TDirection = 'left' | 'right' | 'top' | 'bottom';

export default function useMatchOffset(
    options: {
        selector?: string;
        startSelector: string;
        endSelector: string;
        direction?: TDirection;
        startDirection?: TDirection;
        endDirection?: TDirection;
    },
    dependencies: React.DependencyList | undefined = []
) {
    const {
        selector,
        startSelector,
        endSelector,
        direction,
        startDirection = 'left',
        endDirection = 'left',
    } = options;

    const [pixels, setPixels] = useState('0px');

    function matchOffset() {
        const offsetToOffsetProp = (directions: TDirection[]) => {
            return directions.map((_direction) => {
                let result;
                switch (_direction) {
                    case 'left':
                        result = 'offsetLeft';
                        break;
                    case 'right':
                        result = 'offsetRight';
                        break;
                    case 'top':
                        result = 'offsetTop';
                        break;
                    case 'bottom':
                        result = 'offsetBottom';
                        break;
                    default:
                        result = 'offsetLeft';
                }
                return result;
            });
        };

        const [startDirectionProp, endDirectionProp] = direction
            ? offsetToOffsetProp([direction, direction])
            : offsetToOffsetProp([startDirection, endDirection]);

        const startElement = selector
            ? { offsetLeft: 0 }
            : startSelector
                ? document.querySelector(startSelector)?.getBoundingClientRect()
                : { offsetLeft: 0 };
        const endElement = selector
            ? document.querySelector(selector)?.getBoundingClientRect()
            : endSelector
                ? document.querySelector(endSelector)?.getBoundingClientRect()
                : { offsetLeft: 0 };

        if (!startElement || !endElement) {
            setPixels('0px');
            return;
        }

        const startValue = startElement[startDirectionProp as keyof typeof startElement] || 0;
        const endValue = endElement[endDirectionProp as keyof typeof startElement] || 0;

        setPixels(`${endValue - startValue}px`);
    }

    useEffect(() => matchOffset(), dependencies);
    useWindowResize(() => matchOffset());

    return pixels;
}
