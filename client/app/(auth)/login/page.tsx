import { LoginForm } from './components/login-form';

export default function Login() {
    return (
        <div className="p-24 min-h-screen w-full flex justify-center items-center">
            <div className="w-full md:w-1/3">
                <LoginForm />
            </div>
        </div>
    );
}
