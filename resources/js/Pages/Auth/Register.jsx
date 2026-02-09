import ApplicationAiLogo from "@/Components/ApplicationAiLogo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader, User, Mail, EyeOff, Eye, Lock, UserPlus, FileText, Sparkles, CheckCircle, Zap, Shield } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();

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

    // Vérification des conditions de mot de passe
    const passwordConditions = {
        minLength: data.password.length >= 8,
        hasUpperCase: /[A-Z]/.test(data.password),
        hasLowerCase: /[a-z]/.test(data.password),
        hasNumber: /[0-9]/.test(data.password),
    };

    const submit = (e) => {
        e.preventDefault();
        validatePassword();

        if (Object.keys(errors).length === 0) {
            post(route("register"), {
                onFinish: () => reset("password", "password_confirmation"),
            });
        }
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* Card Horizontale - max 95% de hauteur et largeur */}
            <div className="w-[95vw] max-w-6xl h-[95vh] rounded-2xl sm:rounded-3xl border-[6px] border-zinc-800 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.4)] overflow-hidden bg-white">
                {/* Pattern de fond subtil */}
                <div
                    className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.03] z-0"
                    style={{
                        backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)",
                    }}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 h-full">
                    {/* LEFT SIDE - Formulaire */}
                    <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center overflow-y-auto">
                        {/* Header */}
                        <div className="mb-3 sm:mb-4">
                            <Link href="/" className="inline-block mb-2 sm:mb-3">
                                <img
                                    src={logo}
                                    className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto hover:scale-105 transition-transform duration-200"
                                    alt="AI Resume Builder Logo"
                                />
                            </Link>

                            <h1 className="text-zinc-800 text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-1">
                                CREATE ACCOUNT
                            </h1>
                            <p className="text-zinc-600 text-xs sm:text-sm font-medium">
                                Join us and start building your perfect resume
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-2.5 sm:space-y-3">
                            {/* Champ Nom */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    className="text-xs font-black uppercase tracking-wide text-zinc-700 mb-1 sm:mb-1.5 flex items-center gap-1.5"
                                >
                                    <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    NAME
                                </InputLabel>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                                    autoComplete="name"
                                    placeholder={t("Enter_your_name")}
                                    isFocused={true}
                                    onChange={(e) => setData("name", e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-1 font-bold text-xs" />
                            </div>

                            {/* Champ Email */}
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    className="text-xs font-black uppercase tracking-wide text-zinc-700 mb-1 sm:mb-1.5 flex items-center gap-1.5"
                                >
                                    <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    EMAIL
                                </InputLabel>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                                    autoComplete="username"
                                    placeholder={t("Enter_your_email")}
                                    onChange={(e) => setData("email", e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-1 font-bold text-xs" />
                            </div>

                            {/* Champ Mot de Passe */}
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    className="text-xs font-black uppercase tracking-wide text-zinc-700 mb-1 sm:mb-1.5 flex items-center gap-1.5"
                                >
                                    <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    PASSWORD
                                </InputLabel>
                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={data.password}
                                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 pr-9 sm:pr-10 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                                        autoComplete="new-password"
                                        placeholder={t("Enter_your_password")}
                                        onChange={(e) => {
                                            setData("password", e.target.value);
                                            validatePassword();
                                        }}
                                        onKeyUp={validatePassword}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-100 rounded transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-600" />
                                        ) : (
                                            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-600" />
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-1 font-bold text-xs" />
                            </div>

                            {/* Champ Confirmation Mot de Passe */}
                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    className="text-xs font-black uppercase tracking-wide text-zinc-700 mb-1 sm:mb-1.5 flex items-center gap-1.5"
                                >
                                    <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    CONFIRM PASSWORD
                                </InputLabel>
                                <div className="relative">
                                    <TextInput
                                        id="password_confirmation"
                                        type={showPassword ? "text" : "password"}
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 pr-9 sm:pr-10 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                                        autoComplete="new-password"
                                        placeholder={t("Confirm_your_password")}
                                        onChange={(e) => setData("password_confirmation", e.target.value)}
                                        required
                                    />
                                </div>
                                <InputError message={errors.password_confirmation} className="mt-1 font-bold text-xs" />
                            </div>

                            {/* Conditions de mot de passe - Optionnel, décommenté si nécessaire */}
                            {/* <div className="bg-orange-50 p-2.5 sm:p-3 rounded-lg border-[2px] border-zinc-800">
                                <p className="text-xs font-black uppercase text-zinc-700 mb-1.5 sm:mb-2">
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

                            {/* Register Button */}
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                                className="w-full py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-black uppercase tracking-wide rounded-lg text-white bg-gradient-to-br from-orange-400 to-orange-500 border-[2px] border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-[3px] active:translate-y-[3px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-3 sm:mt-4"
                            >
                                {processing ? (
                                    <>
                                        <Loader size={14} className="animate-spin sm:w-4 sm:h-4" />
                                        <span>Loading...</span>
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        <span>{t("S'inscrire")}</span>
                                    </>
                                )}
                            </PrimaryButton>

                            {/* Login Link - FLEX BETWEEN */}
                            <div className="flex items-center justify-between pt-1.5 sm:pt-2">
                                <p className="text-xs font-medium text-zinc-700">
                                    {t("Déjà_inscrit")}?
                                </p>
                                <Link
                                    href={route("login")}
                                    className="font-black text-blue-600 hover:text-blue-800 text-xs uppercase tracking-wide transition-colors hover:underline inline-flex items-center gap-1 whitespace-nowrap"
                                >
                                    <span>Se connecter</span>
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT SIDE - Illustration */}
                    <div className="hidden lg:flex bg-gradient-to-br from-orange-400 to-orange-500 p-6 lg:p-8 flex-col items-center justify-center relative overflow-hidden border-l-[6px] border-zinc-800">
                        {/* Decorative Pattern */}
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 10px)",
                            }}
                        />

                        {/* Content */}
                        <div className="relative z-10 text-center text-white space-y-4 lg:space-y-6">
                            <div className="flex items-center justify-center gap-2 mb-3 lg:mb-4">
                                <Sparkles className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={2.5} />
                                <h2
                                    className="text-3xl lg:text-4xl font-extrabold uppercase tracking-tight"
                                    style={{
                                        textShadow: "3px 3px 0px rgba(0,0,0,0.3)",
                                    }}
                                >
                                    AI RESUME
                                </h2>
                                <Sparkles className="w-6 h-6 lg:w-8 lg:h-8" strokeWidth={2.5} />
                            </div>

                            {/* Illustration */}
                            <div className="flex items-center justify-center mb-4 lg:mb-6">
                                <div className="relative w-40 h-40 lg:w-48 lg:h-48">
                                    <div className="absolute inset-0 bg-white rounded-2xl border-4 border-zinc-800 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] p-5 lg:p-6 flex flex-col items-center justify-center">
                                        <UserPlus className="w-20 h-20 lg:w-24 lg:h-24 text-orange-500 mb-2 lg:mb-3" strokeWidth={1.5} />
                                        <div className="w-full space-y-1 lg:space-y-1.5">
                                            <div className="h-1.5 lg:h-2 bg-orange-200 rounded-full"></div>
                                            <div className="h-1.5 lg:h-2 bg-orange-300 rounded-full w-4/5"></div>
                                            <div className="h-1.5 lg:h-2 bg-orange-200 rounded-full w-3/5"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-2.5 lg:space-y-3 text-left max-w-xs mx-auto">
                                <div className="flex items-start gap-2 lg:gap-2.5 bg-white/20 p-2.5 lg:p-3 rounded-xl border-2 border-white/30 backdrop-blur-sm">
                                    <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                                    <div>
                                        <h3 className="font-black text-xs uppercase">FREE TO START</h3>
                                        <p className="text-xs font-medium text-white/90">No credit card required</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 lg:gap-2.5 bg-white/20 p-2.5 lg:p-3 rounded-xl border-2 border-white/30 backdrop-blur-sm">
                                    <Zap className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                                    <div>
                                        <h3 className="font-black text-xs uppercase">INSTANT ACCESS</h3>
                                        <p className="text-xs font-medium text-white/90">Start building immediately</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 lg:gap-2.5 bg-white/20 p-2.5 lg:p-3 rounded-xl border-2 border-white/30 backdrop-blur-sm">
                                    <FileText className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                                    <div>
                                        <h3 className="font-black text-xs uppercase">UNLIMITED RESUMES</h3>
                                        <p className="text-xs font-medium text-white/90">Create as many as you need</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
