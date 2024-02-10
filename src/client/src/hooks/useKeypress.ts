import { useEffect } from 'react';

type TKeyboardKey = 'enter' | 'tab' | 'delete' | 'backspace' | 'escape';

export default function useKeypress(keyboardKey: TKeyboardKey, callback: Function) {
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (keyboardKey === 'enter' && e?.key?.toLocaleLowerCase() === 'enter') {
                callback(e);
            } else if (keyboardKey === 'tab' && e?.key?.toLocaleLowerCase() === 'tab') {
                callback(e);
            } else if (keyboardKey === 'delete' && e?.key?.toLocaleLowerCase() === 'delete') {
                callback(e);
            } else if (keyboardKey === 'backspace' && e?.key?.toLocaleLowerCase() === 'backspace') {
                callback(e);
            } else if (keyboardKey === 'escape' && e?.key?.toLocaleLowerCase() === 'escape') {
                callback(e);
            }
        }
        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, [keyboardKey, callback]);
}
