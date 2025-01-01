import ApplicationAiLogo from "@/Components/ApplicationAiLogo";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";

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
            <div className="max-w-md w-full mx-auto">
                <form
                    onSubmit={submit}
                    className="bg-opacity-90 bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]"
                >
                    <div className="mb-5 text-center">
                        <Link href="/">
                            <ApplicationAiLogo className="h-20 w-40 fill-current text-gray-500 mx-auto" />
                        </Link>
                    </div>
                    <div className="mb-4 text-sm text-gray-600">
                        {t("verify-email-check-your-email")}
                    </div>

                    {status === "verification-link-sent" && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {t("verification-link-sent")}
                        </div>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                        <PrimaryButton disabled={processing}>
                            {processing && (
                                <Loader
                                    size={20}
                                    className="animate-spin mr-2"
                                />
                            )}
                            {t("Resend_Verification_Email")}
                        </PrimaryButton>

                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            {t("Log_Out")}
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
