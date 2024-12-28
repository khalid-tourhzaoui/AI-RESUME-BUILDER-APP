import {
    AlertCircle,
    Briefcase,
    Building,
    Calendar,
    Globe,
    Loader,
    MapPin,
    Plus,
    X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { useForm } from "@inertiajs/react";
import RichTextEditor from "../editor";
import { generateThumbnail } from "@/lib/helper";
import * as Yup from "yup";
import { Button } from '@/Components/ui/button';

const initialState = {
    id: undefined, docId: undefined, title: "", company_name: "", city: "", country: "", start_date: "", end_date: "", work_summary: "", currentlyWorking: false,
};

function ExperienceForm({ handleNext, document }) {
    const [experienceList, setExperienceList] = useState(() => document?.experience?.length ? document.experience : [initialState]);
    const [errors, setErrors] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const { put, post, delete: destroy, data, setData } = useForm({ experience: experienceList });
    const [loading, setLoading] = useState(false);

    const experienceSchema = Yup.object().shape({
        title: Yup.string().required("Position title is required").min(3, "Must be at least 3 characters"),
        company_name: Yup.string().required("Company name is required").min(3, "Must be at least 3 characters"),
        city: Yup.string().required("City is required").min(3, "Must be at least 3 characters"),
        country: Yup.string().required("Country is required").min(3, "Must be at least 3 characters"),
        start_date: Yup.date().required("Start date is required").typeError("Invalid start date"),
        end_date: Yup.date().required("End date is required").min(Yup.ref("start_date"), "End date must be after start date"),
    });

    useEffect(() => {
        const processExperienceList = async () => {
            try {
                const thumbnail = await generateThumbnail();
                setData({ experience: experienceList, thumbnail });
                await Promise.all(experienceList.map((exp) => experienceSchema.validate(exp)));
                setIsFormValid(true);
            } catch (err) {
                setIsFormValid(false);
            }
        };
        processExperienceList();
    }, [experienceList]);

    const validateField = async (index, field, value) => {
        try {
            await experienceSchema.validateAt(field, { [field]: value });
            setErrors((prev) => {
                const newErrors = [...prev];
                if (newErrors[index]) delete newErrors[index][field];
                return newErrors;
            });
        } catch (err) {
            setErrors((prev) => {
                const newErrors = [...prev];
                newErrors[index] = { ...(newErrors[index] || {}), [field]: err.message };
                return newErrors;
            });
        }
    };

    const handleChange = (index, field, value) => {
        setExperienceList((prev) => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
        validateField(index, field, value);
    };

    const addNewExperience = () => setExperienceList((prev) => [...prev, { ...initialState }]);
    const removeExperience = (index, id) => {
        setExperienceList((prev) => prev.filter((_, i) => i !== index));
        if (id) removeEperienceBack(id);
    };

    const removeEperienceBack = async (id) => {
        try {
            await destroy(route("experience.delete", id), { data: { experience: [{ id }] } });
        } catch (error) {
            console.error("Failed to delete experience", error);
        }
    };

    const handleEditorChange = (value, name, index) => {
        setExperienceList((prevState) => {
            const newExperienceList = [...prevState];
            newExperienceList[index] = { ...newExperienceList[index], [name]: value };
            return newExperienceList;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const existingExperience = document.experience || [];
        const toUpdate = [], toAdd = [], toDelete = [];

        experienceList.forEach((item) => {
            const existingItem = existingExperience.find((exp) => exp.id === item.id);
            if (existingItem) {
                const hasChanged = Object.keys(item).some((key) => item[key] !== existingItem[key]);
                if (hasChanged) toUpdate.push(item);
            } else {
                toAdd.push(item);
            }
        });

        existingExperience.forEach((existingItem) => {
            if (!experienceList.some((item) => item.id === existingItem.id)) toDelete.push(existingItem);
        });

        try {
            if (toUpdate.length) await put(route("experience.update", document.id), { experience: toUpdate });
            if (toAdd.length) await post(route("experience.store", document.id), { experience: toAdd });
            setLoading(true);
            if (handleNext) handleNext();
        } catch (error) {
            console.error("Failed to save experience details", error);
            setErrors(error.inner.reduce((acc, curr) => { acc[curr.path] = curr.message; return acc; }, []));
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="w-full">
                <h2 className="font-bold text-lg">Professional Experience</h2>
                <p className="text-sm">Add previous job experience</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="border-2 w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
                    {experienceList.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 mb-5 pt-4 relative">
                                {experienceList.length > 1 && (
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white"
                                        size="icon"
                                        onClick={() => removeExperience(index, item.id)}
                                    >
                                        <X size="13px" />
                                    </Button>
                                )}
                                {/* Position Title and Company Name in the same row */}
                                <div className="col-span-1 sm:col-span-1 md:col-span-1">
                                    <Label className="text-sm">Position title ({<Briefcase size={20} className="inline-flex" />}) :</Label>
                                    <Input
                                        name="title"
                                        placeholder="Enter"
                                        required
                                        className="mt-2 w-full"
                                        value={item.title || ""}
                                        onChange={(e) => handleChange(index, e.target.name, e.target.value)}
                                    />
                                    {errors[index]?.title && (
                                        <p className="text-red-500 text-sm mt-3">
                                            (<AlertCircle size={20} className="inline-flex" />): {errors[index]?.title}
                                        </p>
                                    )}
                                </div>

                                <div className="col-span-1 sm:col-span-1 md:col-span-1">
                                    <Label className="text-sm">Company Name ({<Building size={20} className="inline-flex" />}) :</Label>
                                    <Input
                                        name="company_name"
                                        placeholder="Enter"
                                        required
                                        className="mt-2 w-full"
                                        value={item.company_name || ""}
                                        onChange={(e) => handleChange(index, e.target.name, e.target.value)}
                                    />
                                    {errors[index]?.company_name && (
                                        <p className="text-red-500 text-sm mt-3">
                                            (<AlertCircle size={20} className="inline-flex" />): {errors[index]?.company_name}
                                        </p>
                                    )}
                                </div>

                                {/* City and Country in the same row */}
                                <div className="col-span-1 sm:col-span-1 md:col-span-1">
                                    <Label className="text-sm">City ({<MapPin size={20} className="inline-flex" />}) :</Label>
                                    <Input
                                        name="city"
                                        placeholder="Enter"
                                        required
                                        className="mt-2 w-full"
                                        value={item.city || ""}
                                        onChange={(e) => handleChange(index, e.target.name, e.target.value)}
                                    />
                                    {errors[index]?.city && (
                                        <p className="text-red-500 text-sm mt-3">
                                            (<AlertCircle size={20} className="inline-flex" />): {errors[index]?.city}
                                        </p>
                                    )}
                                </div>

                                <div className="col-span-1 sm:col-span-1 md:col-span-1">
                                    <Label className="text-sm">Country ({<Globe size={20} className="inline-flex" />}) :</Label>
                                    <Input
                                        name="country"
                                        placeholder="Enter"
                                        required
                                        className="mt-2 w-full"
                                        value={item.country || ""}
                                        onChange={(e) => handleChange(index, e.target.name, e.target.value)}
                                    />
                                    {errors[index]?.country && (
                                        <p className="text-red-500 text-sm mt-3">
                                            (<AlertCircle size={20} className="inline-flex" />): {errors[index]?.country}
                                        </p>
                                    )}
                                </div>

                                {/* Start Date and End Date in the same row */}
                                <div className="col-span-1 sm:col-span-1 md:col-span-1">
                                    <Label className="text-sm">
                                        Start Date ({<Calendar size={20} className="inline-flex" />}) :
                                    </Label>
                                    <Input
                                        name="start_date"
                                        type="date"
                                        required
                                        className="mt-2 w-full"
                                        value={item.start_date || ""}
                                        onChange={(e) => handleChange(index, e.target.name, e.target.value)}
                                    />
                                    {errors[index]?.start_date && (
                                        <p className="text-red-500 text-sm mt-3">
                                            (<AlertCircle size={20} className="inline-flex" />): {errors[index]?.start_date}
                                        </p>
                                    )}
                                </div>

                                <div className="col-span-1 sm:col-span-1 md:col-span-1">
                                    <Label className="text-sm">
                                        End Date ({<Calendar size={20} className="inline-flex" />}) :
                                    </Label>
                                    <Input
                                        name="end_date"
                                        type="date"
                                        required
                                        className="mt-2 w-full"
                                        value={item.end_date || ""}
                                        onChange={(e) => handleChange(index, e.target.name, e.target.value)}
                                    />
                                    {errors[index]?.end_date && (
                                        <p className="text-red-500 text-sm mt-3">
                                            (<AlertCircle size={20} className="inline-flex" />): {errors[index]?.end_date}
                                        </p>
                                    )}
                                </div>

                                {/* Work Summary */}
                                <div className="col-span-1 sm:col-span-2 mt-1">
                                    <RichTextEditor
                                        jobTitle={item.title || ""}
                                        initialValue={item?.work_summary || ""}
                                        onEditorChange={(value) => handleEditorChange(value, "work_summary", index)}
                                    />
                                </div>
                            </div>
                            {index === experienceList.length - 1 && experienceList.length < 5 && (
                                <Button className="gap-1 mt-1 text-primary border-primary/50" variant="outline" type="button" onClick={addNewExperience}>
                                    <Plus size="15px" /> Add More Experience
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
                <Button className="mt-4 w-full" type="submit" disabled={!isFormValid || loading}>
                    {loading && <Loader size="15px" className="animate-spin" />} Save Changes
                </Button>
            </form>
        </div>
    );
}

export default ExperienceForm;
