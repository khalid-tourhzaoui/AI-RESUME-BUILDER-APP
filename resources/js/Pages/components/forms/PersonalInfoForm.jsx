import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { AlertCircle, Briefcase, Loader, LocateIcon, Mail, PhoneIcon, UserCircle } from "lucide-react";
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
    const { put, post, data, setData,processing } = useForm({
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

    const [isSaving, setIsSaving] = useState(false);

    // Validation schema for all fields
    const personalInfoSchema = Yup.object().shape({
        first_name: Yup.string().required("First Name is required").min(2, "First Name must be at least 2 characters"),
        last_name: Yup.string().required("Last Name is required").min(2, "Last Name must be at least 2 characters"),
        job_title: Yup.string().required("Job Title is required").min(2, "Job Title must be at least 2 characters"),
        address: Yup.string().required("Address is required").min(2, "Address must be at least 2 characters"),
        phone: Yup.string().required("Phone Number is required").matches(/^(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}$/, "Invalid Moroccan phone number"),
        email: Yup.string().required("Email is required").email("Invalid email format"),
    });

    // Debounced validation function
    const debouncedValidation = useMemo(
        () => debounce(async () => {
            try {
                await personalInfoSchema.validate(personalInfo, { abortEarly: false });
                setIsFormValid(true);
            } catch (err) {
                setIsFormValid(false);
                setErrors(err.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {}));
            }
        }, 500),
        [personalInfo]
    );

    // Call debounced validation on each personalInfo change
    useEffect(() => {
        debouncedValidation();
        return () => debouncedValidation.cancel(); // Cancel debounce on component unmount
    }, [personalInfo, debouncedValidation]);

    // Handle input changes and update the state
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setPersonalInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    // Update data with setData function and submit the form
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
        setIsSaving(true);
        await onSave(data);
        setIsSaving(false);
        if (handleNext) handleNext();
    };

    // When document changes, update personal info state
    useEffect(() => {
        if (document?.personal_info) {
            setPersonalInfo(document.personal_info);
        }
    }, [document]);

    // Update form data when personalInfo state changes
    useEffect(() => {
        const updateFormData = async () => {
            try {
                setData({
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
            } catch (err) {
                console.log(err);
            }
        };
        updateFormData();
    }, [personalInfo, setData, document]);
    return (
        <div className="text-black">
            <div className="w-full">
                <h2 className="font-bold text-lg">
                    {t("Personal_Information")} : <p className="text-lg font-bold text-[#f68c09]">{t("Get_Started_with_the_personal_information")}</p>
                </h2>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="border-2 border-black w-full h-auto divide-black divide-y-[2px] rounded-md px-3 pb-4 my-5">
                        {/* First Name and Last Name in the same row */}
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 mb-5 pt-4 relative">
                            {[
                                {
                                    name: "first_name",
                                    label: t("First_Name"),
                                    icon: (
                                        <UserCircle size={20} className="inline-flex font-bold" />
                                    ),
                                    placeholder: t("Enter_Your_FirstName"),
                                },
                                {
                                    name: "last_name",
                                    label: t("Last_Name"),
                                    icon: (
                                        <UserCircle size={20} className="inline-flex font-bold" />
                                    ),
                                    placeholder: t("Enter_Your_LastName"),
                                },
                            ].map(({ name, label, icon,placeholder }) => (
                                <div key={name} className="col-span-1">
                                    <Label className="text-md font-semibold">
                                        {label} <span className="text-[#f68c09]">({icon})</span> :
                                    </Label>
                                    <Input
                                        name={name}
                                        required
                                        className="mt-2 w-ful"
                                        autoComplete="off"
                                        placeholder={placeholder}
                                        value={personalInfo[name] || ""}
                                        onChange={handleChange}
                                    />
                                    {errors[name] && (
                                        <p className="text-red-500 text-sm mt-3">
                                            (
                                            <AlertCircle
                                                size={20}
                                                className="inline-flex"
                                            />
                                            ) : {errors[name]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Job Title and Address in the same row */}
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 mb-5 pt-4 relative">
                            {[
                                {
                                    name: "job_title",
                                    label: t("Job_Title"),
                                    icon: <Briefcase size={20} className="inline-flex font-bold" />,
                                    placeholder: t("Enter_Your_JobTitle"),
                                },
                                {
                                    name: "address",
                                    label: t("Address"),
                                    icon: <LocateIcon size={20} className="inline-flex " />,
                                    placeholder: t("Enter_Your_Address"),
                                },
                            ].map(({ name, label, icon ,placeholder}) => (
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
                                    {errors[name] && (
                                        <p className="text-red-500 text-sm mt-3">
                                            (
                                            <AlertCircle
                                                size={20}
                                                className="inline-flex"
                                            />
                                            ) : {errors[name]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Phone Number and Email in the same row */}
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 mb-5 pt-4 relative">
                            {[
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
                            ].map(({ name, label, icon,placeholder }) => (
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
                                    {errors[name] && (
                                        <p className="text-red-500 text-sm mt-3">
                                            (
                                            <AlertCircle
                                                size={20}
                                                className="inline-flex"
                                            />
                                            ) : {errors[name]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full flex justify-between mt-5">
                        <Button
                            type="submit"
                            disabled={!isFormValid || isSaving}
                            className="w-full"
                        >
                            {processing ? (
                                <Loader className="animate-spin" size={20} />
                            ) : (
                                t("Save_Changes")
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PersonalInfoForm;
