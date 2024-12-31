import ApplicationAiLogo from "@/Components/ApplicationAiLogo";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader } from "lucide-react";
import { useState } from "react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    const handleSocialLogin = (provider) => {
        window.location.href = route("socialite.redirect", provider);
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="max-w-md w-full mx-auto">
                <form
                    onSubmit={submit}
                    className="bg-opacity-90 bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]"
                >
                    <div className="mb-5">
                        <h3 className="text-3xl font-extrabold">
                            <Link href="/">
                                <ApplicationAiLogo className="h-20 w-40 fill-current text-gray-500 mx-auto" />
                            </Link>
                        </h3>
                    </div>

                    <div>
                        <div className="relative flex items-center">
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#333"
                                stroke="#333"
                                className="w-[18px] h-[18px] absolute right-2"
                                viewBox="0 0 682.667 682.667"
                            >
                                <defs>
                                    <clipPath
                                        id="a"
                                        clipPathUnits="userSpaceOnUse"
                                    >
                                        <path
                                            d="M0 512h512V0H0Z"
                                            data-original="#000000"
                                        ></path>
                                    </clipPath>
                                </defs>
                                <g
                                    clip-path="url(#a)"
                                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                                >
                                    <path
                                        fill="none"
                                        stroke-miterlimit="10"
                                        stroke-width="40"
                                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                        data-original="#000000"
                                    ></path>
                                    <path
                                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                        data-original="#000000"
                                    ></path>
                                </g>
                            </svg>
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <div className="relative flex items-center">
                            <TextInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#333"
                                stroke="#333"
                                onClick={() => setShowPassword(!showPassword)}
                                className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                                viewBox="0 0 128 128"
                            >
                                {
                                    showPassword ? (<path
                                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                        data-original="#000000"
                                    ></path>)
                                    :(<path
                                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                        data-original="#000000"
                                    ></path>)
                                }
                                <path
                                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                    data-original="#000000"
                                ></path>
                            </svg>
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex  items-center justify-between gap-4 mt-6">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                        <div>
                            {canResetPassword && (
                                <Link
                                    as="a"
                                    href={route("password.request")}
                                    className="text-sm text-blue-600 underline hover:text-blue-900 font-semibold"
                                >

                                    Forgot your password?
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="mt-5 mx-auto">
                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                            className="w-full py-2.5 px-4  text-sm font-semibold tracking-wider rounded-full text-white
                             bg-gray-800 hover:bg-[#222] flex items-center justify-center"
                        >
                            {processing && (
                                <Loader size={20} className="animate-spin mr-2"/>
                            )}
                            Sign in
                        </PrimaryButton>
                        <p className="text-gray-800 text-sm text-center mt-6">
                            Don't have an account{" "}
                            <Link
                                as="a"
                                href={route("register")}
                                className="text-sm text-blue-600 underline hover:text-blue-900 font-semibold whitespace-nowrap"
                            >
                                Register here
                            </Link>
                        </p>
                    </div>

                    <hr className="my-6 border-gray-400" />

                    <div className="space-x-8 flex justify-center">
                        <button
                            type="button"
                            className="border-none outline-none"
                            onClick={() => handleSocialLogin("google")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30px"
                                className="inline"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="#fbbd00"
                                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                                    data-original="#fbbd00"
                                />
                                <path
                                    fill="#0f9d58"
                                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                                    data-original="#0f9d58"
                                />
                                <path
                                    fill="#31aa52"
                                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                                    data-original="#31aa52"
                                />
                                <path
                                    fill="#3c79e6"
                                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                                    data-original="#3c79e6"
                                />
                                <path
                                    fill="#cf2d48"
                                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                                    data-original="#cf2d48"
                                />
                                <path
                                    fill="#eb4132"
                                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                                    data-original="#eb4132"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="border-none outline-none"
                            onClick={() => handleSocialLogin("github")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30px"
                                className="inline"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="border-none outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30px"
                                fill="#007bff"
                                viewBox="0 0 167.657 167.657"
                            >
                                <path
                                    d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                                    data-original="#010002"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
