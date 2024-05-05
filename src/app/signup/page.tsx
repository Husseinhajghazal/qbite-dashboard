import Steps from "@/components/Signup/Steps/Steps";
import Shape1 from "@/components/Shapes/Shape1";
import Shape2 from "@/components/Shapes/Shape2";
import Shape3 from "@/components/Shapes/Shape3";
import WelcomeScreen from "@/components/Signup/components/WelcomeScreen";
import WhiteLogo from "@/components/Signup/components/WhiteLogo";
import authenticate from "@/utils/Authentication";

const Page = async () => {
  await authenticate("auth");

  return (
    <div className="relative overflow-hidden min-h-[100vh] md:h-[100vh] bg-[#dceed8] py-[30px] md:py-[60px] flex flex-col justify-center items-center">
      <Steps />
      <WhiteLogo />
      <Shape1 />
      <Shape2 />
      <Shape3 />
      <WelcomeScreen />
    </div>
  );
};

export default Page;
