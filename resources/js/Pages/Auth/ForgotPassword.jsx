import ApplicationAiLogo from "@/Components/ApplicationAiLogo";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryButtonLink from "@/Components/PrimaryButtonLink";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader } from "lucide-react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <div className="max-w-md w-full mx-auto bg-opacity-90 bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]">
                <div className="mb-5">
                    <h3 className="text-3xl font-extrabold">
                        <Link href="/">
                            <ApplicationAiLogo className="h-20 w-40 fill-current text-gray-500 mx-auto" />
                        </Link>
                    </h3>
                </div>
                <div className="mb-4 text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your
                    email address and we will email you a password reset link
                    that will allow you to choose a new one.
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="relative flex items-center">

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            required
                            placeholder="Enter your email"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#333"
                            stroke="#333"
                            className="w-[18px] h-[18px] absolute right-2"
                            viewBox="0 0 682.667 682.667"
                        >
                            <defs>
                                <clipPath id="a" clipPathUnits="userSpaceOnUse">
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

                    <div className="mt-4 flex items-center justify-between">
                        <PrimaryButtonLink
                            href={route("login")}
                            className="ms-1"
                        >
                            Return to login
                        </PrimaryButtonLink>
                        <PrimaryButton className="ms-1" disabled={processing}>
                            {processing && (
                                <Loader
                                    size={20}
                                    className="animate-spin mr-2"
                                />
                            )}
                            Email Password Reset Link
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
