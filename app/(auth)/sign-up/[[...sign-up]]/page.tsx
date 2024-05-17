import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className='flex items-center justify-center h-full mt-10'>
      <SignUp path='/sign-up' />
    </div>
  );
}
