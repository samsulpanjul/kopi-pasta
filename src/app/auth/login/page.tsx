import SignInWithGoogleButton from "@/components/SignInWithGoogleButton";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center h-screen mt-24">
      <p className="mb-4 text-xl font-semibold bg-white">Login</p>
      <div className="box w-3/4 lg:w-1/4 h-fit">
        <SignInWithGoogleButton />
      </div>
    </div>
  );
}
