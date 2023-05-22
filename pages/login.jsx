import React, { useState } from "react";
import Head from "next/head";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";

const Login = () => {
	const [login, setLogin] = useState(false);

	const { signIn, signUp } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async ({ email, password }) => {
		if (login) {
			await signIn(email, password);
		} else {
			await signUp(email, password);
		}
	};

	return (
		<div className="relative flex h-[110vh] items-center justify-center bg-black/50">
			<Head>
				<title>Login | Netflix</title>
			</Head>

			<img
				src="https://rb.gy/p2hphi"
				alt="bg-login-page"
				fill
				className="absolute -z-10 object-cover opacity-60 sm:!inline"
			/>

			<img
				src="https://rb.gy/ulxxee"
				className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
				width={150}
				height={150}
			/>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col rounded-md bg-black px-16 py-10 ">
				<h2 className="text-4xl font-semibold ">Sign In</h2>

				<div className="pt-9">
					<input
						type="email"
						placeholder="Enter email"
						className={`${
							errors.email && "border-b-[3px] border-orange-600"
						} w-[21rem] rounded bg-[#333333] px-5 py-3 placeholder-[gray] outline-none focus:bg-[#454545]`}
						{...register("email", { required: true })}
					/>

					{errors.email && (
						<p className="mt-1 pl-1 text-[13px] font-light text-orange-500">
							Please enter a valid email.
						</p>
					)}
				</div>

				<div className="pt-4">
					<input
						type="password"
						placeholder="Enter password"
						className={`${
							errors.email && "border-b-[3px] border-orange-600"
						} w-[21rem] rounded bg-[#333333] px-5 py-3 placeholder-[gray] outline-none focus:bg-[#454545]`}
						{...register("password", { required: true })}
					/>

					{errors.password && (
						<p className="mt-1 pl-1 text-[13px] font-light text-orange-500">
							Your password must contain between 4 and 60
							characters.
						</p>
					)}
				</div>

				<button
					type="submit"
					onClick={() => setLogin(true)}
					className="mt-9 rounded bg-red-600 py-3 hover:bg-red-600/90">
					Sign In
				</button>

				<p className="mt-8 text-gray-600">
					New to Netflix?{" "}
					<button
						type="submit"
						onClick={() => setLogin(false)}
						className="pl-1 text-white hover:underline">
						Sign up now
					</button>
				</p>
			</form>
		</div>
	);
};

export default Login;
