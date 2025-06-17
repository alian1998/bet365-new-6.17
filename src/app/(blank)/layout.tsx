import Container from "@/components/shared/container/Container";

const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen overflow-auto overflow-auto">
      <Container>{children}</Container>
    </div>
  );
};

export default SignUpLayout;
