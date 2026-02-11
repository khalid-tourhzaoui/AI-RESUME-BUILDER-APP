import ApplicationAiLogo from "@/Components/ApplicationAiLogo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff, Loader, Lock, Mail, Shield, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();

    const passwordConditions = {
        minLength: data.password.length >= 8,
        hasUpperCase: /[A-Z]/.test(data.password),
        hasLowerCase: /[a-z]/.test(data.password),
        hasNumber: /[0-9]/.test(data.password),
    };

    // Validation du mot de passe
    const validatePassword = () => {
        if (
            (data.password && data.password.length < 8) ||
            !/[A-Z]/.test(data.password) ||
            !/[a-z]/.test(data.password) ||
            !/[0-9]/.test(data.password)
        ) {
            errors.password =
                "Le mot de passe doit respecter les conditions au dessous.";
        } else {
            delete errors.password;
        }
    };

    const submit = (e) => {
        e.preventDefault();
        validatePassword();

        if (Object.keys(errors).length === 0) {
            post(route("password.store"), {
                onFinish: () => reset("password", "password_confirmation"),
            });
        }
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

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
                                RESET PASSWORD
                            </h1>
                            <p className="text-zinc-600 text-sm font-medium">
                                Create a new password for your account
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            {/* Email */}
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    className="text-xs font-black uppercase tracking-wide text-zinc-700 mb-1.5 flex items-center gap-1.5"
                                >
                                    <Mail className="w-3.5 h-3.5" />
                                    EMAIL
                                </InputLabel>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder={t("Enter_your_email")}
                                    value={data.email}
                                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                                    autoComplete="username"
                                    onChange={(e) => setData("email", e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-1 font-bold text-xs" />
                            </div>

                            {/* Password */}
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    className="text-xs font-black uppercase tracking-wide text-zinc-700 mb-1.5 flex items-center gap-1.5"
                                >
                                    <Lock className="w-3.5 h-3.5" />
                                    NEW PASSWORD
                                </InputLabel>
                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        value={data.password}
                                        className="w-full px-3.5 py-2.5 pr-10 text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                                        autoComplete="new-password"
                                        placeholder={t("Enter_your_password")}
                                        isFocused={true}
                                        onChange={(e) => {
                                            setData("password", e.target.value);
                                            validatePassword();
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-100 rounded transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4 text-zinc-600" />
                                        ) : (
                                            <Eye className="w-4 h-4 text-zinc-600" />
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-1 font-bold text-xs" />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    className="text-xs font-black uppercase tracking-wide text-zinc-700 mb-1.5 flex items-center gap-1.5"
                                >
                                    <Shield className="w-3.5 h-3.5" />
                                    CONFIRM PASSWORD
                                </InputLabel>
                                <div className="relative">
                                    <TextInput
                                        type={showPassword ? "text" : "password"}
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        placeholder={t("Confirm_your_password")}
                                        className="w-full px-3.5 py-2.5 pr-10 text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("password_confirmation", e.target.value)
                                        }
                                    />
                                </div>
                                <InputError message={errors.password_confirmation} className="mt-1 font-bold text-xs" />
                            </div>

                            {/* Password Conditions */}
                            {/* <div className="bg-orange-50 p-3 rounded-lg border-[2px] border-zinc-800">
                                <p className="text-xs font-black uppercase text-zinc-700 mb-2">
                                    {t("Votre_mot_de_passe_doit_respecter_les_conditions_suivantes")} :
                                </p>
                                <ul className="space-y-1">
                                    <li className={`text-xs font-bold flex items-center gap-1.5 ${passwordConditions.minLength ? "text-green-600" : "text-red-600"}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${passwordConditions.minLength ? "bg-green-600" : "bg-red-600"}`}></span>
                                        {t("Au_moins_8_caractères")}
                                    </li>
                                    <li className={`text-xs font-bold flex items-center gap-1.5 ${passwordConditions.hasUpperCase ? "text-green-600" : "text-red-600"}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${passwordConditions.hasUpperCase ? "bg-green-600" : "bg-red-600"}`}></span>
                                        {t("Contenir_au_moins_une_majuscule")}
                                    </li>
                                    <li className={`text-xs font-bold flex items-center gap-1.5 ${passwordConditions.hasLowerCase ? "text-green-600" : "text-red-600"}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${passwordConditions.hasLowerCase ? "bg-green-600" : "bg-red-600"}`}></span>
                                        {t("Contenir_au_moins_une_minuscule")}
                                    </li>
                                    <li className={`text-xs font-bold flex items-center gap-1.5 ${passwordConditions.hasNumber ? "text-green-600" : "text-red-600"}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${passwordConditions.hasNumber ? "bg-green-600" : "bg-red-600"}`}></span>
                                        {t("Contenir_au_moins_un_chiffre")}
                                    </li>
                                </ul>
                            </div> */}

                            {/* Submit Button */}
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                                className="w-full py-2.5 px-4 text-sm font-black uppercase tracking-wide rounded-lg text-white bg-gradient-to-br from-orange-400 to-orange-500 border-[2px] border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-[3px] active:translate-y-[3px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-6"
                            >
                                {processing ? (
                                    <>
                                        <Loader size={16} className="animate-spin" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <RotateCcw className="w-4 h-4" />
                                        <span>{t("Reset_Password")}</span>
                                    </>
                                )}
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
