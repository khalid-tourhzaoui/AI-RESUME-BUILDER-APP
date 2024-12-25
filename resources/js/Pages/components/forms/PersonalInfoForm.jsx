import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { generateThumbnail } from "@/lib/helper";
import { useForm } from "@inertiajs/react";
import { AlertCircle, Briefcase, Loader, LocateIcon, Mail, PersonStanding, PersonStandingIcon, PhoneIcon, User, UserCircle } from "lucide-react";
import * as Yup from "yup";
import React, { useCallback, useEffect, useState } from "react";

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
    const [isFormValid, setIsFormValid] = useState(false); // Track form validity
    const { put, post, data, setData } = useForm({
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

    const personalInfoSchema = Yup.object().shape({
        first_name: Yup.string().required("First Name is required").min(2, "First Name must be at least 2 characters"),
        last_name: Yup.string().required("Last Name is required").min(2, "Last Name must be at least 2 characters"),
        job_title: Yup.string().required("Job Title is required").min(2, "Job Title must be at least 2 characters"),
        address: Yup.string().required("Address is required").min(2, "Address must be at least 2 characters"),
        phone: Yup.string().required("Phone Number is required")
        .matches(/^(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}$/,"Invalid Moroccan phone number"),
        email: Yup.string().required("Email is required").email("Invalid email format"),
    });

    useEffect(() => {
        const processPersonalInfoList = async () => {
            try {
                const thumbnail = await generateThumbnail();
                setData({
                    title: document.title,
                    status: document.status,
                    first_name: personalInfo.first_name,
                    last_name: personalInfo.last_name,
                    job_title: personalInfo.job_title,
                    address: personalInfo.address,
                    phone: personalInfo.phone,
                    email: personalInfo.email,
                    thumbnail: thumbnail,
                });
                checkFormValidity();
            } catch (err) {
                setIsFormValid(false);
            }
        };
        processPersonalInfoList();
    }, [personalInfo, document]);

    const validateField  = async (name, value) => {
        try {
            await personalInfoSchema.validateAt(name, { [name]: value });
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        } catch (err) {
            setErrors((prev) => ({ ...prev, [name]: err.message }));
        }
    };

    const checkFormValidity = async () => {
        try {
            await personalInfoSchema.validate(personalInfo, { abortEarly: false });
            setIsFormValid(true);
        } catch (err) {
            setIsFormValid(false);
        }
    };

    const handleChange = useCallback(async (e) => {
        const { name, value } = e.target;
        setPersonalInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
        await validateField(name, value);

    }, [personalInfo]);


    const onSave = async (data) => {
        try {
            if (document.personal_info) {
                await put(
                    route("personals.update", document.document_id),
                    data
                );
            } else {
                await post(
                    route("personals.store", document.document_id),
                    data
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsSaving(true);
            await onSave(data);
            setIsSaving(false);
            if (handleNext) handleNext();
        } catch (error) {
            setErrors(
                error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {})
            );
        }
    };

    useEffect(() => {
        if (document?.personal_info) {
            setPersonalInfo(document.personal_info);
        }
    }, [document]);

    return (
        <div>
            <div className="w-full">
                <h2 className="font-bold text-lg">Personal Information</h2>
                <p className="text-sm">Get Started with the personal information</p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 mt-5 gap-2">
                        <div>
                            <Label className="text-sm">First Name ( <UserCircle size={20} className="inline-flex"/> ) : </Label>
                            <Input
                                name="first_name"
                                required
                                className="mt-2"
                                autoComplete="off"
                                placeholder="First Name"
                                value={personalInfo.first_name || ""}
                                onChange={handleChange}

                            />
                            {errors.first_name && (
                                <p className="text-red-500 text-sm mt-3">
                                    ( <AlertCircle size={20} className="inline-flex"/> ) : {errors.first_name}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label className="text-sm">Last Name ( <UserCircle size={20} className="inline-flex"/> ) : </Label>
                            <Input
                                name="last_name"
                                required
                                className="mt-2"
                                autoComplete="off"
                                placeholder="Last Name"
                                value={personalInfo.last_name || ""}
                                onChange={handleChange}

                            />
                            {errors.last_name && (
                                <p className="text-red-500 text-sm mt-3">
                                    ( <AlertCircle size={20} className="inline-flex"/> ) : {errors.last_name}
                                </p>
                            )}
                        </div>
                        <div className="col-span-2">
                            <Label className="text-sm">Job Title ( <Briefcase size={20} className="inline-flex"/> ) : </Label>
                            <Input
                                name="job_title"
                                required
                                className="mt-2"
                                autoComplete="off"
                                placeholder="Job Title"
                                value={personalInfo.job_title || ""}
                                onChange={handleChange}

                            />
                            {errors.job_title && (
                                <p className="text-red-500 text-sm mt-3">
                                    ( <AlertCircle size={20} className="inline-flex"/> ) : {errors.job_title}
                                </p>
                            )}
                        </div>
                        <div className="col-span-2">
                            <Label className="text-sm">Address ( <LocateIcon size={20} className="inline-flex"/> ) : </Label>
                            <Input
                                name="address"
                                required
                                className="mt-2"
                                autoComplete="off"
                                placeholder="Address"
                                value={personalInfo.address || ""}
                                onChange={handleChange}

                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm mt-3">
                                    ( <AlertCircle size={20} className="inline-flex"/> ) : {errors.address}
                                </p>
                            )}
                        </div>
                        <div className="col-span-2">
                            <Label className="text-sm">Phone Number ( <PhoneIcon size={20} className="inline-flex"/> ) :</Label>
                            <Input
                                name="phone"
                                required
                                className="mt-2"
                                autoComplete="off"
                                placeholder="Phone Number"
                                value={personalInfo.phone || ""}
                                onChange={handleChange}

                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-3">
                                    ( <AlertCircle size={20} className="inline-flex"/> ) : {errors.phone}
                                </p>
                            )}
                        </div>
                        <div className="col-span-2">
                            <Label className="text-sm">Email ( <Mail size={20} className="inline-flex"/> ) : </Label>
                            <Input
                                name="email"
                                required
                                className="mt-2"
                                autoComplete="off"
                                placeholder="Email"
                                value={personalInfo.email || ""}
                                onChange={handleChange}

                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-3">
                                    ( <AlertCircle size={20} className="inline-flex"/> ) : {errors.email}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button
                        className="mt-4"
                        type="submit"
                        disabled={!isFormValid || document?.status === "archived"}
                    >
                        {isSaving ? (
                            <>
                                <Loader size="15px" className="animate-spin" />
                                Save Changes
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default PersonalInfoForm;
