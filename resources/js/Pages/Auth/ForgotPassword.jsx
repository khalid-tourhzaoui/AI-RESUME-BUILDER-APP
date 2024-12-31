import ApplicationAiLogo from "@/Components/ApplicationAiLogo";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryButtonLink from "@/Components/PrimaryButtonLink";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });
    const { t } = useTranslation();

    // State to hold the email validation error
    const [emailError, setEmailError] = useState("");

    // Handler to validate email
    const validateEmail = () => {
        if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError("");
        }
    };

    const submit = (e) => {
        e.preventDefault();

        // Validate email before submitting the form
        validateEmail();

        // Only submit if there are no errors
        if (!emailError) {
            post(route("password.email"));
        }
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
                    {t("Forgot_message")}
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="relative">
                        <TextInput
                            type="email"
                            name="email"
                            required
                            placeholder={t("Enter_your_email")}
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => {
                                setData("email", e.target.value);
                                validateEmail();
                            }}
                        />
                        <Mail className="absolute right-2 top-2.5 cursor-pointer" />
                        <InputError message={emailError || errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <PrimaryButtonLink
                            href={route("login")}
                            className="ms-1"
                        >
                            {t("Sign_in")}
                        </PrimaryButtonLink>
                        <PrimaryButton className="ms-1" disabled={processing}>
                            {processing && (
                                <Loader
                                    size={20}
                                    className="animate-spin mr-2"
                                />
                            )}
                            {t("Email_Password_Reset_Link")}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
