import { useState } from 'react';

type TForm = {
    username: string,
    password: string
};

export default function Login() {
    const [form, setForm] = useState<TForm>({
        username: '',
        password: ''
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!form.username || !form.password) {
            setError('Username and password required.');
            return;
        }

        setError('');
        setLoading(true);

        fetch('/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(form)
        })
            .then(async (res) => {
                const resJson = await res.json();
                if (resJson?.success === true) {
                    window.location.href = '/';
                } else {
                    setError('Login Error. Please check your username and password.');
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
            >
                <input
                    placeholder='username'
                    onChange={e => setForm({ ...form, username: e.target.value })}
                />
                <input
                    placeholder='password'
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button
                    type='submit'
                    disabled={loading}
                >
                    Submit
                </button>
            </form>
            <div>
                {error}
            </div>
        </div>
    )
}
