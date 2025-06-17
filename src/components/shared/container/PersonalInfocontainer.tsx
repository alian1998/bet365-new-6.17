const PersonalInfocontainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" mainBgColor w-full h-screen fixed overflow-hidden right-0 left-0 md:max-w-[450px] mx-auto z-20">
      <div className="w-full h-full overflow-auto">{children}</div>
    </div>
  );
};

export default PersonalInfocontainer;
