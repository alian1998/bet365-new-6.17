import Container from "@/components/shared/container/Container";

const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative max-w-[480px] mx-auto min-h-screen overflow-auto overflow-auto">
      <Container>{children}</Container>
    </div>
  );
};

export default SignUpLayout;
