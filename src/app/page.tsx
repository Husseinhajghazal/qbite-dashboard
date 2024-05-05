import LoginForm from "@/components/Login/LoginForm";
import Shape from "@/components/Shapes/Shape";
import LanguageSwitcher from "@/components/Buttons/LanguageSwitcher";
import authenticate from "@/utils/Authentication";

const page = async () => {
  await authenticate("auth");

  return (
    <div className="relative overflow-hidden min-h-[100vh] md:h-[100vh] bg-[#dceed8] py-[30px] md:py-[60px] flex flex-col items-center justify-center">
      <Shape link="/circles/circles-2.png" className="shape-4" />
      <Shape link="/circles/circles-1.png" className="shape-5" />
      <LoginForm />
      <LanguageSwitcher x="right" y="top" />
    </div>
  );
};

export default page;
