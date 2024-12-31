import ApplicationAiLogo from "@/Components/ApplicationAiLogo";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff, Loader, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
                    <div className="relative">
                        <InputLabel
                            htmlFor="email"
                            value="Email-Address"
                            className="text-sm text-gray-800"
                        />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            placeholder={t("Enter_your_email")}
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <Mail className="absolute right-2 top-[35px] cursor-pointer" />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="relative mt-4">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="text-sm text-gray-800"
                        />
                        <TextInput
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            placeholder={t("Enter_your_password")}
                            isFocused={true}
                            onChange={(e) => {
                                setData("password", e.target.value);
                                validatePassword();
                            }}
                        />
                        <Lock className="absolute right-2 top-[37px] cursor-pointer" />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="relative rmt-4">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                            className="text-sm text-gray-800"
                        />
                        <TextInput
                            type={showPassword ? "text" : "password"}
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            placeholder={t("Confirm_your_password")}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                        {showPassword ? (
                            <EyeOff
                                className="absolute right-2 top-[37px] cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            <Eye
                                className="absolute right-2 top-[37px] cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )}
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                    {/* Conditions de mot de passe */}
                    <div className="mt-4 text-sm">
                        <p>
                            {t(
                                "Votre_mot_de_passe_doit_respecter_les_conditions_suivantes"
                            )}{" "}
                            :
                        </p>
                        <ul className="list-inside list-disc">
                            <li
                                className={
                                    passwordConditions.minLength
                                        ? "text-green-500"
                                        : "text-red-500"
                                }
                            >
                                {t("Au_moins_8_caractères")}
                            </li>
                            <li
                                className={
                                    passwordConditions.hasUpperCase
                                        ? "text-green-500"
                                        : "text-red-500"
                                }
                            >
                                {t("Contenir_au_moins_une_majuscule")}
                            </li>
                            <li
                                className={
                                    passwordConditions.hasLowerCase
                                        ? "text-green-500"
                                        : "text-red-500"
                                }
                            >
                                {t("Contenir_au_moins_une_minuscule")}
                            </li>
                            <li
                                className={
                                    passwordConditions.hasNumber
                                        ? "text-green-500"
                                        : "text-red-500"
                                }
                            >
                                {t("Contenir_au_moins_un_chiffre")}
                            </li>
                        </ul>
                    </div>

                    <div className="mt-4 flex items-center justify-center">
                        <PrimaryButton
                            className="w-full flex justify-center"
                            disabled={processing}
                        >
                            {processing && (
                                <Loader
                                    size={20}
                                    className="animate-spin mr-2"
                                />
                            )}
                            {t("Reset_Password")}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
