import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { generateThumbnail } from "@/lib/helper";
import { useForm } from "@inertiajs/react";
import { Loader } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

function PersonalInfoForm({ handleNext, document }) {
    const [personalInfo, setPersonalInfo] = useState({
        first_name: "",
        last_name: "",
        job_title: "",
        address: "",
        phone: "",
        email: "",
    });

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
            },thumbnail);
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
    }, []);

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
                            />
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
                            />
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
                            />
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
                            />
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
                            />
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
                            />
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
