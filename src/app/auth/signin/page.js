"use client";
import { FormControl } from "@mui/joy";
import { Sheet } from "@mui/joy";
import { useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import FormInput from "@/component/shared/form/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { SigninValidation } from "@/component/Validation/SigninValidation";
import { errorMsg, successMsg } from "@/component/Toastmsg/toaster";
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SigninValidation) });
  const router = useRouter();
  const onSubmit = async (data) => {
    const { email, password } = data;
    const localData = localStorage.getItem("teacherData");
    const stuData = localStorage.getItem("student");
    let parsedData = [];
    try {
      if (localData) parsedData = JSON.parse(localData);
      if (stuData) parsedData = [...JSON.parse(stuData), ...parsedData];
    } catch (error) {}
    const checkEmail = parsedData.find((item) => item.email === email);
    if (checkEmail === undefined) {
      errorMsg("User Doesn't exist");
    }
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        localData,
        stuData,
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
                alignItems: "center",
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
                    <FormInput
                      className="w-80 ml-2"
                      label="Email"
                      control={control}
                      errors={errors}
                      name="email"
                      inputType="email"
                      placeholder="example123@gmail.com"
                    />
                  </FormControl>
                </div>
                <br />
                <div>
                  <FormControl>
                    <FormInput
                      className="w-80 ml-2"
                      control={control}
                      errors={errors}
                      name="password"
                      inputType="password"
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
                </div>
              </form>
              <br />
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
