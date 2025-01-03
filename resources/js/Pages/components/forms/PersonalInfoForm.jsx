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
    UserCircle,
} from "lucide-react";
import { useForm } from "@inertiajs/react";
import { useState, useEffect, useMemo, useCallback } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";

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
    const [isFormValid, setIsFormValid] = useState(false);
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
                    setIsFormValid(false);
                    return;
                }
                try {
                    await personalInfoSchema.validate(personalInfo, { abortEarly: false });
                    setErrors({});
                    setIsFormValid(true);
                } catch (err) {
                    setIsFormValid(false);
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
            <Label className="text-md font-semibold">
                {label} <span className="text-[#f68c09]">({icon})</span> :
            </Label>
            <Input
                name={name}
                required
                className="mt-2 w-full"
                autoComplete="off"
                placeholder={placeholder}
                value={personalInfo[name] || ""}
                onChange={handleChange}
            />
            {errors[name] && personalInfo[name] !== "" && (
                <p className="text-red-500 font-semibold text-sm mt-3">
                    (<AlertCircle size={20} className="inline-flex" />) : {errors[name]}
                </p>
            )}
        </div>
    );

    const fields = [
        {
            name: "first_name",
            label: t("First_Name"),
            icon: <UserCircle size={20} className="inline-flex font-bold" />,
            placeholder: t("Enter_Your_FirstName"),
        },
        {
            name: "last_name",
            label: t("Last_Name"),
            icon: <UserCircle size={20} className="inline-flex font-bold" />,
            placeholder: t("Enter_Your_LastName"),
        },
        {
            name: "job_title",
            label: t("Job_Title"),
            icon: <Briefcase size={20} className="inline-flex font-bold" />,
            placeholder: t("Enter_Your_JobTitle"),
        },
        {
            name: "address",
            label: t("Address"),
            icon: <LocateIcon size={20} className="inline-flex" />,
            placeholder: t("Enter_Your_Address"),
        },
        {
            name: "phone",
            label: t("Phone_Number"),
            icon: <PhoneIcon size={20} className="inline-flex" />,
            placeholder: t("Enter_Your_PhoneNumber"),
        },
        {
            name: "email",
            label: t("Email"),
            icon: <Mail size={20} className="inline-flex" />,
            placeholder: t("Enter_Your_Email"),
        },
    ];

    return (
        <div className="text-white">
            <div className="w-full">
                <h2 className="font-bold text-lg">
                    {t("Personal_Information")} :
                    <p className="text-lg font-bold text-[#f68c09]">
                        {t("Get_Started_with_the_personal_information")}
                    </p>
                </h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="border-2 border-white w-full h-auto divide-white divide-y-[2px] rounded-md px-3 pb-4 my-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 pt-4">
                        {fields.slice(0, 2).map(renderField)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 pt-4">
                        {fields.slice(2, 4).map(renderField)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 pt-4">
                        {fields.slice(4).map(renderField)}
                    </div>
                </div>
                <Button
                    variant="default"
                    type="submit"
                    disabled={!isFormValid || processing}
                    className="w-full"
                >
                    {processing ? (
                        <Loader className="animate-spin" size={20} />
                    ) : (
                        t("Save_Changes")
                    )}
                </Button>
            </form>
        </div>
    );
}

export default PersonalInfoForm;
