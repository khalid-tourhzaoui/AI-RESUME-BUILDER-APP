import ApplicationAiLogo from "@/Components/ApplicationAiLogo";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader, Mail, CheckCircle, LogOut, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});
    const { t } = useTranslation();

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

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

                            {/* Icon */}
                            <div className="mb-4 flex justify-center">
                                <div className="w-20 h-20 bg-orange-100 rounded-2xl border-[3px] border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] flex items-center justify-center">
                                    <Mail className="w-10 h-10 text-orange-500" strokeWidth={2} />
                                </div>
                            </div>

                            <h1 className="text-zinc-800 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-2">
                                VERIFY EMAIL
                            </h1>
                            <p className="text-zinc-600 text-sm font-medium">
                                {t("verify-email-check-your-email")}
                            </p>
                        </div>

                        {status === "verification-link-sent" && (
                            <div className="mb-6 p-3 bg-green-100 rounded-lg border-[2px] border-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <p className="text-xs font-bold text-green-800">
                                        {t("verification-link-sent")}
                                    </p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            {/* Resend Button */}
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                                className="w-full py-2.5 px-4 text-sm font-black uppercase tracking-wide rounded-lg text-white bg-gradient-to-br from-orange-400 to-orange-500 border-[2px] border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-[3px] active:translate-y-[3px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <Loader size={16} className="animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>{t("Resend_Verification_Email")}</span>
                                    </>
                                )}
                            </PrimaryButton>

                            {/* Logout Link */}
                            <div className="text-center pt-2">
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="inline-flex items-center gap-2 text-sm font-black text-zinc-600 hover:text-zinc-900 uppercase tracking-wide transition-colors hover:underline"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>{t("Log_Out")}</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
