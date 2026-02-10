import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { User, Mail, CheckCircle2, Shield, Zap, Save } from "lucide-react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const { t } = useTranslation();
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            {/* Header with CRT Monitor Style */}
            <div className="bg-white border-b-4 border-zinc-800 px-4 sm:px-6 py-3 sm:py-4 rounded-t-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="bg-red-400 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-zinc-800"></span>
                    <span className="bg-yellow-400 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-zinc-800"></span>
                    <span className="bg-green-500 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-zinc-800"></span>
                    <h2 className="text-sm sm:text-base md:text-lg font-black uppercase ml-2 flex items-center gap-2">
                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                        {t("Profile_Information")}
                    </h2>
                </div>
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            </div>

            {/* Content Area */}
            <div className="bg-yellow-100 border-4 border-t-0 border-zinc-800 rounded-b-xl p-4 sm:p-6 md:p-8">
                {/* Description */}
                {/* <div className="bg-yellow-100 border-3 border-zinc-800 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 relative z-10">
                    <p className="text-xs sm:text-sm font-mono text-zinc-700 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        {t(
                            "Update_your_account's_profile_information_and_email_address.",
                        )}
                    </p>
                </div> */}

                <form
                    onSubmit={submit}
                    className="space-y-4 sm:space-y-6 relative z-10"
                >
                    {/* Name Field */}
                    <div className="bg-white border-3 border-zinc-800 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 text-orange-500" />
                            <InputLabel
                                htmlFor="name"
                                value="Name"
                                className="!text-sm sm:!text-base font-black uppercase text-zinc-800"
                            />
                        </div>

                        <TextInput
                            id="name"
                            className="mt-1 block w-full border-2 border-zinc-800 rounded focus:border-yellow-400 focus:ring-yellow-400"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            placeholder={t("Enter_your_name")}
                            isFocused
                            autoComplete="name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    {/* Email Field */}
                    <div className="bg-white border-3 border-zinc-800 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Mail className="w-4 h-4 text-orange-500" />
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                className="!text-sm sm:!text-base font-black uppercase text-zinc-800"
                            />
                        </div>

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full border-2 border-zinc-800 rounded focus:border-yellow-400 focus:ring-yellow-400"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            placeholder={t("Enter_your_email")}
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    {/* Email Verification Notice */}
                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div className="bg-orange-100 border-3 border-zinc-800 rounded-lg p-3 sm:p-4">
                            <p className="text-xs sm:text-sm text-zinc-800 font-mono">
                                {t("Your_email_address_is_unverified.")}
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="ml-2 text-blue-600 underline font-bold hover:text-blue-800"
                                >
                                    {t(
                                        "Click_here_to_re-send_the_verification_email.",
                                    )}
                                </Link>
                            </p>

                            {status === "verification-link-sent" && (
                                <div className="mt-2 text-xs sm:text-sm font-bold text-green-600 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" />
                                    {t(
                                        "A_new_verification_link_has_been_sent_to_your_email_address.",
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Success Message */}
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <div className="bg-green-100 border-3 border-zinc-800 rounded-lg p-3">
                            <p className="text-sm font-bold text-green-700 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                {t("Saved.")}
                            </p>
                        </div>
                    </Transition>

                    {/* Submit Button */}
                    <Button
                        className="w-full bg-orange-500 text-white font-black py-3 sm:py-4 rounded-lg sm:rounded-xl border-3 sm:border-4 border-zinc-800 shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] hover:shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] hover:translate-y-1 transition-all duration-150 flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 sm:border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                {t("Saving...")}
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                                {t("Save_Changes")}
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </section>
    );
}
