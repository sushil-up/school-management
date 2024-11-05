"use client";
import { FormControl } from "@mui/joy";
import { Sheet } from "@mui/joy";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import InputField from "@/component/shared/form/InputField";
import { errorMsg, successMsg } from "@/component/Toastmsg/toaster";
import Link from "next/link";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState:{errors}
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const { username, password } = data;

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (res.error) {
        return errorMsg("Invalid credentials");
      } else {
        router.replace("/");
        return successMsg("Login Successfully");
      }
    } catch (error) {
      return errorMsg("Login Error");
    }
  };

  return (
    <>
      <div className="mt-5 grid place-items-center h-screen">
        <div
          className="shadow-xl border border-slate-200 flex rounded-3xl bg-white overflow-hidden login-container"
          style={{ width: "80%", maxWidth: "1200px" }}
        >
          <div className="w-1/2">
            <img
              src="/edu.png"
              alt="Sign In"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-1/2">
            <Sheet
              sx={{
                mx: "auto",
                my: 5,
                py: 5,
                px: 5,
                display: "flex",
                flexDirection: "column",
                alignItems:"center",
                gap: 2,
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Typography variant="h4" className="text-center">
                    <b>Welcome!</b>
                  </Typography>
                </div>
                <br />
                <div>
                  <FormControl>
                    <InputField
                      className="w-80 ml-2"
                      label="Username"
                      control={control}
                      errors={errors}
                      name="username"
                      type="text"
                      placeholder="example123@gmail.com"
                    />
                  </FormControl>
                </div>
                <br />
                <div>
                  <FormControl>
                    <InputField
                      className="w-80 ml-2"
                      control={control}
                      errors={errors}
                      name="password"
                      type="password"
                      label="Password"
                    />
                  </FormControl>
                </div>
                <br />
                <div>
                  <Button
                    type="submit"
                    className=" btn w-80 ml-2 bg-blue-600 hover:bg-blue-700 text-white font-bold 
                    cursor-pointer px-6 py-2 rounded-md transition duration-300"
                  >
                    Login
                  </Button>
                  <br />
                  <p className="mt-2 ml-2">
                    {`Don't have an account?`}
                    <span className="ml-2">
                      <Link href="/signup" className="text-blue-600">
                        Create account
                      </Link>
                    </span>
                  </p>
                </div>
              </form>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
