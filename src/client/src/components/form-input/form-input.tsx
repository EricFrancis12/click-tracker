
import { InputHTMLAttributes, FC } from 'react';

import './form-input.css';

type FromInputProps = { label: string } &
    InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FromInputProps> = ({ label, ...otherProps }) => {
    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        fetch('http://localhost:3001/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ hi: 'there' })
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }

    return (
        <>
            {/* <div className='group'>
            <input {...otherProps} />
            {
                label &&
                <div className='form-input-label'>
                    {label}
                </div>
            }
        </div> */}
            <div>
                <button onClick={handleClick}>
                    Send Post
                </button>
            </div>
        </>
    );
}

export default FormInput;
