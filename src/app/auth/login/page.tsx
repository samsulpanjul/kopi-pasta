import SignInWithGoogleButton from "@/components/SignInWithGoogleButton";

export default function LoginPage() {
  return (
    <div className="flex justify-center h-screen mt-24">
      <div className="box w-1/2 lg:w-1/4 h-fit">
        <p>Login</p>
        <SignInWithGoogleButton />
      </div>
    </div>
  );
}
