import ApplicationAiLogo from "@/Components/ApplicationAiLogo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader, User, Mail, EyeOff, Eye, Lock, UserPlus, Shield } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";
import RegisterImage from "../../assets/RegisterImage.png";
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
                                    className="font-black text-zinc-700 hover:text-blue-800 text-xs uppercase tracking-wide transition-colors hover:underline inline-flex items-center gap-1 whitespace-nowrap"
                                >
                                    <span>Se connecter</span>
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT SIDE - Image générée */}
                    <div className="hidden lg:flex bg-gradient-to-br from-orange-400 to-orange-500 p-0 flex-col items-center justify-center relative overflow-hidden border-l-[6px] border-zinc-800">
                        {/* Image générée en plein écran */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            <img
                                src={RegisterImage}
                                alt="AI Resume Builder - Register Illustration"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = '<div class="text-white text-center p-8"><p class="text-2xl font-black uppercase mb-4">AI Resume Builder</p><p class="text-sm">Placez votre image générée dans:<br/><code class="bg-white/20 px-2 py-1 rounded">public/images/register-illustration.png</code></p></div>';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
