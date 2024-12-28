import { generateThumbnail } from "@/lib/helper";
import { useForm } from "@inertiajs/react";
import {
    AlertCircle,
    AlignLeft,
    Calendar,
    FlaskConical,
    GraduationCap,
    Medal,
    Plus,
    X,
} from "lucide-react";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";

const initialState = {
    university_name: "",
    degree: "",
    major: "",
    description: "",
    start_date: "",
    end_date: "",
};

function EducationForm({ handleNext, document }) {
    const [educationList, setEducationList] = useState(() =>
        document?.education?.length ? document.education : [initialState]
    );
    const [errors, setErrors] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const {
        put,
        post,
        delete: destroy,
        data,
        setData,
        isPending,
    } = useForm({ education: educationList });

    const educationSchema = Yup.object().shape({
        university_name: Yup.string()
            .required("University name is required")
            .min(3),
        degree: Yup.string().required("Degree is required").min(3),
        major: Yup.string().required("Major is required"),
        description: Yup.string().max(1000),
        start_date: Yup.date().required("Start date is required"),
        end_date: Yup.date().required("End date is required"),
    });

    useEffect(() => {
        const processEducationList = async () => {
            try {
                const thumbnail = await generateThumbnail();
                setData({ education: educationList, thumbnail });
                await Promise.all(
                    educationList.map((exp) => educationSchema.validate(exp))
                );
                setIsFormValid(true);
            } catch (err) {
                setIsFormValid(false);
            }
        };
        processEducationList();
    }, [educationList]);

    const validateField = async (index, field, value) => {
        try {
            await educationSchema.validateAt(field, { [field]: value });
            setErrors((prev) => {
                const newErrors = [...prev];
                if (newErrors[index]) delete newErrors[index][field];
                return newErrors;
            });
        } catch (err) {
            setErrors((prev) => {
                const newErrors = [...prev];
                if (!newErrors[index]) newErrors[index] = {};
                newErrors[index][field] = err.message;
                return newErrors;
            });
        }
    };

    const handleChange = (index, field, value) => {
        setEducationList((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
        validateField(index, field, value);
    };

    const addNewEducation = () =>
        setEducationList((prev) => [...prev, { ...initialState }]);

    const removeEducation = (index, id) => {
        setEducationList((prev) => prev.filter((_, i) => i !== index));
        destroy(route("education.delete", id), {
            data: { education: [{ id }] },
        }).catch(console.error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const existingEducation = document.education || [];
        const toUpdate = [],
            toAdd = [],
            toDelete = [];

        educationList.forEach((item) => {
            const existingItem = existingEducation.find(
                (edu) => edu.id === item.id
            );
            existingItem
                ? Object.keys(item).some(
                      (key) => item[key] !== existingItem[key]
                  ) && toUpdate.push(item)
                : toAdd.push(item);
        });

        existingEducation.forEach((existingItem) => {
            if (!educationList.some((item) => item.id === existingItem.id))
                toDelete.push(existingItem);
        });

        try {
            if (toUpdate.length)
                await put(route("education.update", document.id), {
                    education: toUpdate,
                });
            if (toAdd.length)
                await post(route("education.store", document.id), {
                    education: toAdd,
                });
            await Promise.all(
                educationList.map((item) => educationSchema.validate(item))
            );
            handleNext?.();
        } catch (error) {
            console.error("Failed to save education details", error);
            setErrors(
                error.inner.reduce(
                    (acc, curr) => ({ ...acc, [curr.path]: curr.message }),
                    []
                )
            );
        }
    };

    return (
        <div>
            <div className="w-full">
                <h2 className="font-bold text-lg">Education</h2>
                <p className="text-sm">Add your education details</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="border-2 w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
                    {educationList.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 mb-5 pt-4 relative">
                                {educationList.length > 1 && (
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        disabled={isPending}
                                        className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white"
                                        size="icon"
                                        onClick={() =>
                                            removeEducation(index, item.id)
                                        }
                                    >
                                        <X size="13px" />
                                    </Button>
                                )}
                                {/* University Name in the one row */}
                                <div className="col-span-2 sm:col-span-2 md:col-span-2">
                                    <Label className="text-sm">
                                        University Name ({" "}
                                        {
                                            <GraduationCap
                                                size={20}
                                                className="inline-flex"
                                            />
                                        }{" "}
                                        ) :
                                    </Label>
                                    <Input
                                        name="university_name"
                                        placeholder="Enter University Name"
                                        required
                                        className="mt-2 w-full"
                                        value={item.university_name || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors[index]?.university_name && (
                                        <p className="text-red-500 text-sm mt-3">
                                            (
                                            <AlertCircle
                                                size={20}
                                                className="inline-flex"
                                            />
                                            ): {errors[index]?.university_name}
                                        </p>
                                    )}
                                </div>
                                {/* degree and major in the same row */}
                                <div className="col-span-2 sm:col-span-2 md:col-span-1">
                                    <Label className="text-sm">
                                        Degree ({" "}
                                        {
                                            <Medal
                                                size={20}
                                                className="inline-flex"
                                            />
                                        }{" "}
                                        ) :
                                    </Label>
                                    <Input
                                        name="degree"
                                        placeholder="Enter the Degree"
                                        required
                                        className="mt-2 w-full"
                                        value={item.degree || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors[index]?.degree && (
                                        <p className="text-red-500 text-sm mt-3">
                                            (
                                            <AlertCircle
                                                size={20}
                                                className="inline-flex"
                                            />
                                            ): {errors[index]?.degree}
                                        </p>
                                    )}
                                </div>
                                <div className="col-span-2 sm:col-span-2 md:col-span-1">
                                    <Label className="text-sm">
                                        Major ({" "}
                                        {
                                            <FlaskConical
                                                size={20}
                                                className="inline-flex"
                                            />
                                        }{" "}
                                        ) :
                                    </Label>
                                    <Input
                                        name="major"
                                        placeholder="Enter the Major"
                                        required
                                        className="mt-2 w-full"
                                        value={item.major || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors[index]?.major && (
                                        <p className="text-red-500 text-sm mt-3">
                                            (
                                            <AlertCircle
                                                size={20}
                                                className="inline-flex"
                                            />
                                            ): {errors[index]?.major}
                                        </p>
                                    )}
                                </div>
                                {/* degree and major in the same row */}
                                <div className="col-span-2 sm:col-span-2 md:col-span-1">
                                    <Label className="text-sm">
                                        Start Date ({" "}
                                        {
                                            <Calendar
                                                size={20}
                                                className="inline-flex"
                                            />
                                        }{" "}
                                        ) :
                                    </Label>
                                    <Input
                                        name="start_date"
                                        required
                                        type="date"
                                        className="mt-2 w-full"
                                        value={item.start_date || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors[index]?.start_date && (
                                        <p className="text-red-500 text-sm mt-3">
                                            (
                                            <AlertCircle
                                                size={20}
                                                className="inline-flex"
                                            />
                                            ): {errors[index]?.start_date}
                                        </p>
                                    )}
                                </div>
                                <div className="col-span-2 sm:col-span-2 md:col-span-1">
                                    <Label className="text-sm">
                                        End Date ({" "}
                                        {
                                            <Calendar
                                                size={20}
                                                className="inline-flex"
                                            />
                                        }{" "}
                                        ) :
                                    </Label>
                                    <Input
                                        name="end_date"
                                        required
                                        type="date"
                                        className="mt-2 w-full"
                                        value={item.end_date || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors[index]?.end_date && (
                                        <p className="text-red-500 text-sm mt-3">
                                            (
                                            <AlertCircle
                                                size={20}
                                                className="inline-flex"
                                            />
                                            ): {errors[index]?.end_date}
                                        </p>
                                    )}
                                </div>
                                {/* description in the one row */}
                                <div className="col-span-2 sm:col-span-2 md:col-span-2">
                                    <Label className="text-sm">
                                        Description ({" "}
                                        {
                                            <AlignLeft
                                                size={20}
                                                className="inline-flex"
                                            />
                                        }{" "}
                                        ) :
                                    </Label>
                                    <Textarea
                                        name="description"
                                        className="w-full mt-2"
                                        placeholder="Enter the Description"
                                        value={item.description || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors[index]?.description && (
                                        <p className="text-red-500 text-sm mt-3">
                                            (
                                            <AlertCircle
                                                size={20}
                                                className="inline-flex"
                                            />
                                            ): {errors[index]?.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {index === educationList.length - 1 &&
                                educationList.length < 5 && (
                                    <Button
                                        className="gap-1 mt-1 text-primary border-primary/50"
                                        variant="outline"
                                        type="button"
                                        disabled={isPending}
                                        onClick={addNewEducation}
                                    >
                                        <Plus size="15px" /> Add More Education
                                    </Button>
                                )}
                        </div>
                    ))}
                </div>
                <Button
                    className="mt-4 w-full"
                    type="submit"
                    disabled={!isFormValid || isPending}
                >
                    {isPending && (
                        <Loader size="15px" className="animate-spin" />
                    )}{" "}
                    Save Changes
                </Button>
            </form>
        </div>
    );
}

export default EducationForm;
