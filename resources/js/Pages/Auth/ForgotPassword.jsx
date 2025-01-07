import ApplicationAiLogo from "@/Components/ApplicationAiLogo";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryButtonLink from "@/Components/PrimaryButtonLink";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import InputLabel from "@/Components/InputLabel";
import logo from "../../assets/logo.png";
export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });
    const { t } = useTranslation();

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
                            <img src={logo} className="h-50 w-52 fill-current text-gray-500 mx-auto" />
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
                        <InputLabel htmlFor="email" value="Email-Address" className="text-sm text-gray-800"/>
                        <TextInput
                            type="email"
                            name="email"
                            required
                            placeholder={t("Enter_your_email")}
                            value={data.email}
                            className={`mt-1 block w-full ${errors.email ? 'border-red-500' : ''}`}
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => {
                                setData("email", e.target.value);
                            }}
                        />
                        <Mail className="absolute right-2 top-[37px] cursor-pointer" />
                        <InputError message={errors.email} className="mt-2" />
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
