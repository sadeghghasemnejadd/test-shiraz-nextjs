"use client";

import Input from "@/components/Input";
import useForm from "@/hooks/useForm";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { InfinitySpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";
const Login = () => {
  const [
    username,
    isUsernameValidate,
    isUsernameFocus,
    userNameChangeHandler,
    userNameFocusHandler,
    usernameValidation,
    setIsUsernameFocus,
  ] = useForm({ validation: { required: true } });

  const [
    password,
    isPasswordValidate,
    isPasswordFocus,
    passwordChangeHandler,
    passwordFocusHandler,
    passwordValidation,
    setIsPasswordFocus,
  ] = useForm({ validation: { required: true } });

  const [isLoading, setIsLoading] = useState(false);
  const { setUser, isAuthneticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    isAuthneticated && router.push("/");
  }, [isAuthneticated]);

  const canSubmit = isUsernameValidate && isPasswordValidate;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      setIsPasswordFocus(true);
      setIsUsernameFocus(true);
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://shserver.top:8080/test/users/login",
        {
          uname: username,
          pass: password,
        }
      );
      if (res.status === 200) {
        setUser(res);
        toast.success("login successfully!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="w-1/4 bg-white rounded-lg py-7 px-36 flex flex-col justify-center gap-16"
      onSubmit={submitHandler}
    >
      <h1 className="self-center font-bold text-4xl">Login</h1>
      <div className="flex flex-col gap-10">
        <Input
          label="username"
          placeholder="please type your username"
          value={username}
          changeHandler={userNameChangeHandler}
          focusHandler={userNameFocusHandler}
          validate={isUsernameValidate}
          validation={usernameValidation}
          isFocus={isUsernameFocus}
        />
        <Input
          label="password"
          placeholder="please type your password"
          type="password"
          value={password}
          changeHandler={passwordChangeHandler}
          focusHandler={passwordFocusHandler}
          validate={isPasswordValidate}
          validation={passwordValidation}
          isFocus={isPasswordFocus}
        />
      </div>
      <button
        type="submit"
        className={`bg-purple-600 text-white rounded-lg py-3 hover:bg-purple-900 transition-all ${
          (!canSubmit || isLoading) &&
          "cursor-not-allowed bg-slate-500 hover:bg-slate-500"
        } text-center flex justify-center `}
      >
        {isLoading ? <InfinitySpin width="75" color="red" /> : "Login"}
      </button>
    </form>
  );
};

export default Login;
