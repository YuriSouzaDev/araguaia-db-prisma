import LoginForm from './components/LoginForm';

const LoginPage = () => {
  return (
    <div className="relative flex h-screen items-center justify-center bg-fixed bg-[url('/toyota.jpg')] bg-cover bg-center">
      <div className="text-center justify-center items-center flex-col p-12 bg-slate-900/90 shadow-3xl">
        <h1 className="mb-16 text-4xl text-white font-semibold">
          Faça seu login
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
