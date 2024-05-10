import { useContext } from "react";
import { AuthContext } from "../AdminAuth/AdminAuth";
import React from "react";

export default function Login() {
  const { handleEmail, handlePassword, handleSignIn, loggedIn } =
    useContext(AuthContext);

  return (
    <div className="pt-[1rem] sm:flex sm:flex-col min-h-[80vh]">
      <h1 className="text-center text-xl">LOGIN TO ADMIN</h1>
      <form
        action=""
        onSubmit={handleSignIn}
        className="px-[1rem] mt-[1rem] sm:w-[70%] xl:w-[50%] sm:mx-auto">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            id="email"
            onChange={handleEmail}
            required
            className="h-[3rem] border-2 border-solid border-black px-4"
          />
        </div>
        <div className="flex flex-col mt-[1rem]">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
            onChange={handlePassword}
            required
            className="h-[3rem] border-2 border-solid border-black px-4"
          />
        </div>
        <button
          type="submit"
          className="w-full h-[3rem] bg-black text-white mt-[1rem] font-medium tracking-wide">
          LOGIN
        </button>
      </form>
    </div>
  );
}
