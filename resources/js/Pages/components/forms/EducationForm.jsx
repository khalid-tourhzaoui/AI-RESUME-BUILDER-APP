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
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
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
                            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-5 mb-5 pt-4 relative">
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
                                {[
                                    "university_name",
                                    "degree",
                                    "major",
                                    "start_date",
                                    "end_date",
                                    "description",
                                ].map((field, i) => (
                                    <div
                                        className={`col-span-${
                                            field === "description" ||
                                            field === "university_name"
                                                ? 2
                                                : 1
                                        }`}
                                        key={i}
                                    >
                                        <Label className="text-sm">
                                            {`${field.replace("_", " ")} :`}{" "}
                                            <span className="inline-flex">
                                                {field ===
                                                    "university_name" && (
                                                    ( <GraduationCap size={20} className="inline-flex" /> )
                                                )}
                                                {field === "degree" && (
                                                    <Medal size={20} className="inline-flex" />
                                                )}
                                                {field === "major" && (
                                                    <FlaskConical size={20} className="inline-flex" />
                                                )}
                                                {field === "start_date" && (
                                                    <Calendar size={20} className="inline-flex" />
                                                )}
                                                {field === "end_date" && (
                                                    <Calendar size={20} className="inline-flex" />
                                                )}
                                                {field === "description" && (
                                                    <AlignLeft size={20} className="inline-flex" />
                                                )}
                                            </span>
                                        </Label>
                                        {field === "description" ? (
                                            <Textarea
                                                name={field}
                                                placeholder={`Enter ${field.replace(
                                                    "_",
                                                    " "
                                                )}`}
                                                className="w-full mt-2"
                                                value={item[field]}
                                                onChange={(e) =>
                                                    handleChange(
                                                        index,
                                                        field,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            <Input
                                                name={field}
                                                placeholder={`Enter ${field.replace(
                                                    "_",
                                                    " "
                                                )}`}
                                                className="w-full mt-2"
                                                value={item[field]}
                                                onChange={(e) =>
                                                    handleChange(
                                                        index,
                                                        field,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        )}
                                        {errors[index]?.[field] && (
                                            <p className="text-red-500 text-sm mt-2">
                                                <AlertCircle
                                                    size={20}
                                                    className="inline-flex"
                                                />{" "}
                                                : {errors[index][field]}
                                            </p>
                                        )}
                                    </div>
                                ))}
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
