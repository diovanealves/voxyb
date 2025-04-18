import { LoginForm } from "./_components/login-form";

export default function Page() {
  return (
    <div className="grid h-screen max-h-screen md:grid-cols-[95%_5%] xl:grid-cols-2">
      <div className="container mx-auto flex max-w-[570px] flex-col justify-center px-8">
        <h1 className="text-4xl font-bold"> Enter Your Account</h1>
        <p className="mt-3 text-muted-foreground">
          Welcome to <strong>VoxyB</strong>, your AI-powered text-to-speech
          solution. Transform your written content into natural-sounding audio
          with just a few clicks.
        </p>

        <LoginForm />
      </div>

      <div className="flex-1 bg-gradient-to-br from-blue-900 to-purple-900" />
    </div>
  );
}
