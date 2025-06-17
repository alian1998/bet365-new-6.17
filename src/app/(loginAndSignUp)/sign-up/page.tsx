import SignUp from "@/components/ui/LoginAndSignUp/SignUp";
import { fetchAllAgent } from "@/utils/fetchData/GetallAgents";

const Page = async () => {
  const data = await fetchAllAgent();

  return <SignUp data={data} />;
};

export default Page;
