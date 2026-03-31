import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { client } from "../../client";


type MyParams = {
  token: string;
  uid: string;
};
const ActivateAccountPage = () => {
  const params = useParams<MyParams>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    client
      .post("/auth/users/activation/", params)
      .then((res) => {
        if (res.status == 204) {
          setLoading(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, [params]);
  return loading ? (
    <p>loading...</p>
  ) : (
    <div className="flex justify-center items-center pt-16">
      <div className="max-w-lg w-full p-6 ">
        <h2 className="text-2xl font-bold mb-4">
          Email Verification Successful!
        </h2>
        <p className="text-lg text-gray-600">
          Thank you for verifying your email address. You can now login to your
          account.
        </p>
        <a href="/login" className="text-blue-500 block w-full py-2">
          Login
        </a>
      </div>
    </div>
  );
};
export default ActivateAccountPage;
