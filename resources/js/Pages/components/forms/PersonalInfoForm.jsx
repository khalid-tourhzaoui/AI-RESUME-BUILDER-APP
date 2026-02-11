import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    AlertCircle,
    Briefcase,
    Loader,
    LocateIcon,
    Mail,
    PhoneIcon,
    Send,
    UserCircle,
    Zap,
} from "lucide-react";
import { useForm } from "@inertiajs/react";
import { useState, useEffect, useMemo, useCallback } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import { generateThumbnail } from "@/lib/helper";

function PersonalInfoForm({ handleNext, document }) {
    const [personalInfo, setPersonalInfo] = useState({
        first_name: "",
        last_name: "",
        job_title: "",
        address: "",
        phone: "",
        email: "",
        thumbnail: "",
    });
    const [errors, setErrors] = useState({});
    const { t } = useTranslation();
    const { put, post, data, setData, processing } = useForm({
        title: document.title,
        status: document.status,
        first_name: personalInfo.first_name,
        last_name: personalInfo.last_name,
        job_title: personalInfo.job_title,
        address: personalInfo.address,
        phone: personalInfo.phone,
        email: personalInfo.email,
        thumbnail: personalInfo.thumbnail,
    });

    const personalInfoSchema = Yup.object().shape({
        first_name: Yup.string()
            .required(t("First Name is required"))
            .min(2, t("First Name must be at least 2 characters")),
        last_name: Yup.string()
            .required(t("Last Name is required"))
            .min(2, t("Last Name must be at least 2 characters")),
        job_title: Yup.string()
            .required(t("Job Title is required"))
            .min(2, t("Job Title must be at least 2 characters")),
        address: Yup.string()
            .required(t("Address is required"))
            .min(2, t("Address must be at least 2 characters")),
        phone: Yup.string()
            .required(t("Phone Number is required"))
            .matches(
                /^(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}$/,
                t("Invalid Moroccan phone number")
            ),
        email: Yup.string()
            .required(t("Email is required"))
            .email(t("Invalid email format")),
    });

    const debouncedValidation = useMemo(
        () =>
            debounce(async () => {
                if (Object.values(personalInfo).every((value) => value === "")) {
                    setErrors({});
                    return;
                }
                try {
                    const thumbnail = await generateThumbnail();
                    setPersonalInfo((prev) => ({
                        ...prev,
                        thumbnail,
                    }));
                    await personalInfoSchema.validate(personalInfo, { abortEarly: false });
                    setErrors({});
                } catch (err) {
                    setErrors(
                        err.inner.reduce((acc, curr) => {
                            acc[curr.path] = curr.message;
                            return acc;
                        }, {})
                    );
                }
            }, 500),
        [personalInfo]
    );

    useEffect(() => {
        debouncedValidation();
        return () => debouncedValidation.cancel();
    }, [personalInfo, debouncedValidation]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setPersonalInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const onSave = async (data) => {
        try {
            if (document.personal_info) {
                await put(route("personals.update", document.document_id), data);
            } else {
                await post(route("personals.store", document.document_id), data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(data);
        setPersonalInfo({
            first_name: "",
            last_name: "",
            job_title: "",
            address: "",
            phone: "",
            email: "",
            thumbnail: "",
        });
        setErrors({});
        if (handleNext) handleNext();
    };

    useEffect(() => {
        if (document?.personal_info) {
            setPersonalInfo(document.personal_info);
        }
    }, [document]);

    useEffect(() => {
        setData({
            title: document.title,
            status: document.status,
            ...personalInfo,
        });
    }, [personalInfo, setData, document]);

    const renderField = ({ name, label, icon, placeholder }) => (
        <div key={name} className="col-span-1">
            <Label className="text-xs sm:text-sm font-black uppercase text-zinc-700 flex items-center gap-1.5 mb-1.5">
                {icon}
                {label}
            </Label>
            <Input
                name={name}
                required
                className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                autoComplete="off"
                placeholder={placeholder}
                value={personalInfo[name] || ""}
                onChange={handleChange}
            />
            {errors[name] && personalInfo[name] !== "" && (
                <div className="bg-red-100 border-[2px] border-zinc-800 rounded-lg mt-2 p-2 flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                    <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-700 flex-shrink-0" />
                    <p className="text-red-700 font-bold text-xs uppercase">
                        {errors[name]}
                    </p>
                </div>
            )}
        </div>
    );

    const fields = [
        {
            name: "first_name",
            label: t("First_Name"),
            icon: <UserCircle size={16} className="inline-flex" />,
            placeholder: t("Enter_Your_FirstName"),
        },
        {
            name: "last_name",
            label: t("Last_Name"),
            icon: <UserCircle size={16} className="inline-flex" />,
            placeholder: t("Enter_Your_LastName"),
        },
        {
            name: "job_title",
            label: t("Job_Title"),
            icon: <Briefcase size={16} className="inline-flex" />,
            placeholder: t("Enter_Your_JobTitle"),
        },
        {
            name: "address",
            label: t("Address"),
            icon: <LocateIcon size={16} className="inline-flex" />,
            placeholder: t("Enter_Your_Address"),
        },
        {
            name: "phone",
            label: t("Phone_Number"),
            icon: <PhoneIcon size={16} className="inline-flex" />,
            placeholder: t("Enter_Your_PhoneNumber"),
        },
        {
            name: "email",
            label: t("Email"),
            icon: <Mail size={16} className="inline-flex" />,
            placeholder: t("Enter_Your_Email"),
        },
    ];

    return (
        <div className="w-full max-w-full mx-auto">
            {/* Header Section */}
            {/* <div className="bg-gradient-to-br from-orange-400 to-orange-500 border-[3px] border-zinc-800 rounded-xl sm:rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] p-4 sm:p-5 md:p-6 mb-4 sm:mb-5">
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
                    <UserCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    <h2 className="font-black text-lg sm:text-xl md:text-2xl uppercase text-white tracking-tight">
                        {t("Personal_Information")}
                    </h2>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-wide">
                    {t("Get_Started_with_the_personal_information")}
                </p>
            </div> */}

            <form onSubmit={handleSubmit}>
                {/* Form Container */}
                <div className="bg-white border-[3px] border-zinc-800 rounded-xl sm:rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden">
                    {/* Section 1: Name Fields */}
                    <div className="border-b-[3px] border-zinc-800 p-4 sm:p-5 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            {fields.slice(0, 2).map(renderField)}
                        </div>
                    </div>

                    {/* Section 2: Job & Address */}
                    <div className="border-b-[3px] border-zinc-800 p-4 sm:p-5 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            {fields.slice(2, 4).map(renderField)}
                        </div>
                    </div>

                    {/* Section 3: Contact Info */}
                    <div className="p-4 sm:p-5 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            {fields.slice(4).map(renderField)}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-4 sm:mt-5">
                    <Button
                        type="submit"
                        disabled={processing}
                        className={`w-full sm:w-auto bg-gradient-to-br from-orange-400 to-orange-500 text-white border-[2px] border-zinc-800 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] px-6 sm:px-8 py-2.5 sm:py-3 flex items-center justify-center gap-2 font-black uppercase text-sm sm:text-base tracking-wide transition-all duration-200 ${
                            processing
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-[3px] active:translate-y-[3px]'
                        }`}
                    >
                        {processing ? (
                            <>
                                <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                <span className="hidden sm:inline">Saving...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>{t("Save_Changes")}</span>
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PersonalInfoForm;
