import ApplicationAiLogo from "@/Components/ApplicationAiLogo";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader, Mail, ArrowLeft, Send } from "lucide-react";
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

            {/* Card Centrée */}
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white rounded-2xl sm:rounded-3xl border-[6px] border-zinc-800 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.4)] overflow-hidden">
                    {/* Pattern de fond subtil */}
                    <div
                        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.03] z-0"
                        style={{
                            backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)",
                        }}
                    />

                    <div className="relative z-10 p-6 sm:p-8 md:p-10">
                        {/* Header */}
                        <div className="mb-6 text-center">
                            <Link href="/" className="inline-block mb-4">
                                <img
                                    src={logo}
                                    className="h-14 sm:h-16 w-auto mx-auto hover:scale-105 transition-transform duration-200"
                                    alt="AI Resume Builder Logo"
                                />
                            </Link>

                            <h1 className="text-zinc-800 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-2">
                                FORGOT PASSWORD?
                            </h1>
                            <p className="text-zinc-600 text-sm font-medium">
                                {t("Forgot_message")}
                            </p>
                        </div>

                        {status && (
                            <div className="mb-4 p-3 bg-green-100 rounded-lg border-[2px] border-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                                <p className="text-xs font-bold text-green-800 text-center">{status}</p>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            {/* Email */}
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    className="text-xs font-black uppercase tracking-wide text-zinc-700 mb-1.5 flex items-center gap-1.5"
                                >
                                    <Mail className="w-3.5 h-3.5" />
                                    EMAIL ADDRESS
                                </InputLabel>
                                <TextInput
                                    type="email"
                                    name="email"
                                    required
                                    placeholder={t("Enter_your_email")}
                                    value={data.email}
                                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => {
                                        setData("email", e.target.value);
                                    }}
                                />
                                <InputError message={errors.email} className="mt-1 font-bold text-xs" />
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Link
                                    href={route("login")}
                                    className="flex-1 py-2.5 px-4 text-sm font-black uppercase tracking-wide rounded-lg text-zinc-800 bg-white border-[2px] border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>{t("Sign_in")}</span>
                                </Link>

                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 py-2.5 px-4 text-sm font-black uppercase tracking-wide rounded-lg text-white bg-gradient-to-br from-orange-400 to-orange-500 border-[2px] border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-[3px] active:translate-y-[3px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <Loader size={16} className="animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>Send Link</span>
                                        </>
                                    )}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
