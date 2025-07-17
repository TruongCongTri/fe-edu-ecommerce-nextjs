"use client";
import { jwtDecode } from "jwt-decode";
import { setAuthCookie } from "@/src/utils/auth-cookie";

import { useState } from "react";
import { useAPI } from "@/src/hooks/useAPI";

import { validate } from "class-validator";
import Link from "next/link";
import { authApi } from "@/src/libs/api-categories/auth";

import { UserLoginDto } from "@/src/dtos/validation/login.dto";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LoginResponse, DecodedUser } from "@/src/types/api-response";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const { execute, loading, error } = useAPI(authApi.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side DTO validation
    const dto = new UserLoginDto();
    dto.email = email;
    dto.password = password;

    const errors = await validate(dto);
    if (errors.length > 0) {
      setValidationErrors(
        errors.flatMap((err) => Object.values(err.constraints || {}))
      );
      return;
    }

    setValidationErrors([]);

    try {
      const result = (await execute(dto)) as LoginResponse;
      toast.success("Login success!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.log("Login success:", result);

      const { token } = result.data.login;

      if (!token) throw new Error("No token received");

      // Decode JWT to get user info
      const userData = jwtDecode<DecodedUser>(token);

      // Save both
      setAuthCookie(token, userData);

      router.push("/dashboard"); // or wherever

      // redirect or store token
    } catch (err) {
      toast.error("Login fail!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error("API error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="max-w-5xl w-full bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* LEFT SIDE - FORM */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to <span className="text-green-600">Antoree</span>
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            By signing in, you agree to Antoree&apos;s{" "}
            <Link href="/terms" className="text-blue-600 underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 underline">
              Privacy Policy
            </Link>
            .
          </p>

          {/* <button className="w-full border border-red-600 text-red-600 font-semibold py-2 rounded mb-4 flex items-center justify-center hover:bg-red-50 transition">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 533.5 544.3">
              <path
                fill="#EA4335"
                d="M533.5 278.4c0-17.7-1.6-35-4.6-51.6H272v97.6h146.9c-6.3 34.4-25 63.5-53.5 83.1v68h86.4c50.5-46.5 81.7-115.1 81.7-197.1z"
              />
              <path
                fill="#34A853"
                d="M272 544.3c72.9 0 134.1-24.1 178.8-65.3l-86.4-68c-24.1 16.2-55.1 25.7-92.4 25.7-70.9 0-131-47.9-152.5-112.2H32.8v70.5c44.7 89.2 137.3 149.3 239.2 149.3z"
              />
              <path
                fill="#4A90E2"
                d="M119.5 324.5c-10.3-30.4-10.3-63.6 0-94l-86.7-70.5C12.4 212.6 0 243.2 0 278.4c0 35.1 12.4 65.7 32.8 92.4l86.7-70.3z"
              />
              <path
                fill="#FBBC05"
                d="M272 107.7c39.7 0 75.4 13.6 103.6 40.5l77.8-77.8C403.4 24.1 341.6 0 272 0 169.1 0 76.5 60.1 32.8 149.3l86.7 70.5c21.5-64.3 81.6-112.1 152.5-112.1z"
              />
            </svg>
            Sign in with Google
          </button> */}

          {/* <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div> */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span></span>
              <Link href="/forgot-password" className="text-blue-600 underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              {loading ? "Signing in..." : "Sign In with Email"}
            </button>
          </form>

          {validationErrors.length > 0 && (
            <ul className="mt-4 text-red-500 text-sm space-y-1">
              {validationErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}

          {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

          <p className="mt-6 text-center text-sm">
            Do not have an account?{" "}
            <Link href="/register" className="text-blue-600 underline">
              Sign up now!
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE - INFO */}
        <div className="hidden md:block md:w-1/2 bg-gray-50 p-8">
          <h2 className="text-xl font-bold mb-4">
            Sign in to get instant access to thousands of reviews and salary
            information
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔</span> View salary to help
              you negotiate your offer or pay rise
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔</span> Find out about
              benefits, interview, company culture via reviews
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔</span> Easy apply with
              only 1 click
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔</span> Manage your own
              profile & privacy
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
