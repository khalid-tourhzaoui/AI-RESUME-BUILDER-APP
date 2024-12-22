import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { generateThumbnail } from "@/lib/helper";
import { useForm } from "@inertiajs/react";
import { Loader } from "lucide-react";
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
        thumbnail:"",
    });
    const [errors, setErrors] = useState({});

    // Initialize form with personal info data
    const { put, post, data, setData } = useForm({
        title: document.title,
        status: document.status,
        first_name: personalInfo.first_name,
        last_name: personalInfo.last_name,
        job_title: personalInfo.job_title,
        address: personalInfo.address,
        phone: personalInfo.phone,
        email: personalInfo.email,
        thumbnail:personalInfo.thumbnail
    });

    const [isSaving, setIsSaving] = useState(false);

    // Update form values when personalInfo is updated
    useEffect(() => {
        const fetchThumbnail = async () => {
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
                thumbnail:thumbnail
            });
            };
            fetchThumbnail();

    }, [personalInfo, document]);

    // Handle input changes
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setPersonalInfo((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Déclenche une validation après un délai (par exemple, 500 ms)
        clearTimeout(typingTimeout);
        const typingTimeout = setTimeout(() => {
            validateField(name, value);
        }, 500);
    }, []);

    //---------------------------------------------------

    const personalInfoSchema = Yup.object().shape({
        first_name: Yup.string()
            .required("First Name is required")
            .min(2, "First Name must be at least 2 characters"),
        last_name: Yup.string()
            .required("Last Name is required")
            .min(2, "Last Name must be at least 2 characters"),
        job_title: Yup.string()
            .required("Job Title is required"),
        address: Yup.string()
            .required("Address is required"),
        phone: Yup.string()
            .required("Phone Number is required")
            .matches(/^(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}$/, "Invalid Moroccan phone number"),
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email format"),
    });
    // Validate field
    const validateField = async (name, value) => {
        try {
            await personalInfoSchema.validateAt(name, { [name]: value });
            setErrors((prev) => ({ ...prev, [name]: undefined })); // Efface l'erreur si valide
        } catch (err) {
            setErrors((prev) => ({ ...prev, [name]: err.message })); // Ajoute l'erreur si invalide
        }
    };
    // Handle blur event
    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };




    // Save function
    const onSave = async (data) => {
        try {
            if (document.personal_info) {
                await put(route("personals.update", document.document_id), data);
                console.log("put");
            } else {
                await post(route("personals.store", document.document_id), data);
                console.log("post");
            }
        } catch (error) {
            console.log(error)
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        await onSave(data); // Send the form data to the backend
        setIsSaving(false);
        if (handleNext) handleNext();
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
                <p className="text-sm">
                    Get Started with the personal information
                </p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 mt-5 gap-3">
                        <div>
                            <Label className="text-sm">First Name</Label>
                            <Input
                                name="first_name"
                                required
                                autoComplete="off"
                                placeholder="First Name"
                                value={personalInfo.first_name || document.personal_info?.first_name || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.first_name && (
                                <p className="text-red-500 text-sm">{errors.first_name}</p>
                            )}

                        </div>
                        <div>
                            <Label className="text-sm">Last Name</Label>
                            <Input
                                name="last_name"
                                required
                                autoComplete="off"
                                placeholder="Last Name"
                                value={personalInfo.last_name || document.personal_info?.last_name || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.last_name && (
                                <p className="text-red-500 text-sm">{errors.last_name}</p>
                            )}
                        </div>
                        <div className="col-span-2">
                            <Label className="text-sm">Job Title</Label>
                            <Input
                                name="job_title"
                                required
                                autoComplete="off"
                                placeholder="Job Title"
                                value={personalInfo.job_title || document.personal_info?.job_title || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.job_title && (
                                <p className="text-red-500 text-sm">{errors.job_title}</p>
                            )}
                        </div>
                        <div className="col-span-2">
                            <Label className="text-sm">Address</Label>
                            <Input
                                name="address"
                                required
                                autoComplete="off"
                                placeholder="Address"
                                value={personalInfo.address || document.personal_info?.address || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm">{errors.address}</p>
                            )}
                        </div>
                        <div className="col-span-2">
                            <Label className="text-sm">Phone Number</Label>
                            <Input
                                name="phone"
                                required
                                autoComplete="off"
                                placeholder="Phone Number"
                                value={personalInfo.phone || document.personal_info?.phone || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm">{errors.phone}</p>
                            )}
                        </div>
                        <div className="col-span-2">
                            <Label className="text-sm">Email</Label>
                            <Input
                                name="email"
                                required
                                autoComplete="off"
                                placeholder="Email"
                                value={personalInfo.email || document.personal_info?.email || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    <Button
                        className="mt-4"
                        type="submit"
                        disabled={isSaving || document?.status === "archived"}
                    >
                        {isSaving ? (
                            <><Loader size="15px" className="animate-spin" />Save Changes</>
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
