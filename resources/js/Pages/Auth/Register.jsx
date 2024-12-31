import ApplicationAiLogo from "@/Components/ApplicationAiLogo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader, User } from "lucide-react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="max-w-md w-full mx-auto bg-opacity-90 bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]">
                <div className="mb-1">
                    <h3 className="text-3xl font-extrabold">
                        <Link href="/">
                            <ApplicationAiLogo className="h-20 w-40 fill-current text-gray-500 mx-auto" />
                        </Link>
                    </h3>
                </div>

                <form onSubmit={submit}>
                    <div className="relative flex items-center">
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            placeholder="Enter you name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#333"
                            stroke="#333"
                            className="w-8  absolute right-2 mt-3"
                            viewBox="0 0 682.667 682.667"
                            id="user"
                        >
                            <path d="M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z"></path>
                        </svg>

                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    {/* -------------------------------------------------------------- */}
                    <div className="relative flex items-center mt-4">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            placeholder="Enter your email"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#333"
                            stroke="#333"
                            className="w-5 absolute right-2 mt-1 mr-2"
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

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="relative flex items-center  mt-4">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            placeholder="Enter your password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            id="password"
                             className="w-6 absolute right-2 mt-2 mr-1"
                        >
                            <g>
                                <path d="M19,20H5a4,4,0,0,1-4-4V12A4,4,0,0,1,5,8H19a4,4,0,0,1,4,4v4A4,4,0,0,1,19,20ZM5,10a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V12a2,2,0,0,0-2-2Z"></path>
                                <path d="M19,10H5V8A7,7,0,0,1,19,8ZM7,8H17A5,5,0,0,0,7,8Z"></path>
                                <path d="M19,9H5a3,3,0,0,0-3,3v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V12A3,3,0,0,0,19,9ZM6,15a1,1,0,1,1,1-1A1,1,0,0,1,6,15Zm4,0a1,1,0,1,1,1-1A1,1,0,0,1,10,15Zm4,0a1,1,0,1,1,1-1A1,1,0,0,1,14,15Zm4,0a1,1,0,1,1,1-1A1,1,0,0,1,18,15Z"></path>
                            </g>
                        </svg>

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="relative flex items-center mt-4">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        <Link
                            href={route("login")}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton className="ms-4" disabled={processing}>
                            {processing && (
                                <Loader
                                    size={20}
                                    className="animate-spin mr-2"
                                />
                            )}
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
