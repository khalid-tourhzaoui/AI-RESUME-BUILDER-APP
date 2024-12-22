import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { generateThumbnail } from "@/lib/helper";
import { useForm } from "@inertiajs/react";
import { Loader, Plus, X } from "lucide-react";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";

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
    //-------------------------------------------------------------------------------------------
    const educationSchema = Yup.object().shape({
        university_name: Yup.string()
            .required("University name is required")
            .min(3, "University name must be at least 3 characters"),
        degree: Yup.string().required("Degree is required"),
        major: Yup.string().required("Major is required"),
        description: Yup.string().max(
            300,
            "Description must be less than 300 characters"
        ),
        start_date: Yup.date().required("Start date is required"),
        end_date: Yup.date().required("End date is required"),
    });
    //-------------------------------------------------------------------------------------------
    useEffect(() => {
        const processEducationList = async () => {
            try {
                // Fetch thumbnail
                const thumbnail = await generateThumbnail();
                setData({ education: educationList, thumbnail });

                // Validate the form
                await Promise.all(
                    educationList.map((exp) =>
                        educationSchema.validate(exp)
                    )
                );
                setIsFormValid(true);
            } catch (err) {
                setIsFormValid(false);
            }
        };
        processEducationList();
    }, [educationList]);
    //-------------------------------------------------------------------------------------------
    const validateField = async (index, field, value) => {
        try {
            await educationSchema.validateAt(field, { [field]: value });
            setErrors((prev) => {
                const newErrors = [...prev];
                if (newErrors[index]) {
                    delete newErrors[index][field];
                }
                return newErrors;
            });
        } catch (err) {
            setErrors((prev) => {
                const newErrors = [...prev];
                if (!newErrors[index]) {
                    newErrors[index] = {};
                }
                newErrors[index][field] = err.message;
                return newErrors;
            });
        }
    };
    //--------------------------------------------------------------------------------------------------
    const handleChange = (index, field, value) => {
        setEducationList((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
        validateField(index, field, value);
    };
    //-------------------------------------------------------------------------------------------
    const addNewEducation = () => {
        setEducationList((prev) => [...prev, { ...initialState }]);
    };
    //-------------------------------------------------------------------------------------------
    const removeEducation = (index, id) => {
        setEducationList((prev) => prev.filter((_, i) => i !== index));
        removeEducationBack(id);
    };
    //-------------------------------------------------------------------------------------------
    const removeEducationBack = async (id) => {
        try {
            await destroy(route("education.delete", id), {
                data: { education: [{ id }] },
            });
        } catch (error) {
            console.error("Failed to delete education", error);
        }
    };

    //-------------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const existingEducation = document.education || [];
            const toUpdate = [];
            const toAdd = [];
            const toDelete = [];

            educationList.forEach((item) => {
                const existingItem = existingEducation.find(
                    (edu) => edu.id === item.id
                );

                if (existingItem) {
                    const hasChanged = Object.keys(item).some(
                        (key) => item[key] !== existingItem[key]
                    );
                    if (hasChanged) {
                        toUpdate.push(item);
                    }
                } else {
                    toAdd.push(item);
                }
            });

            existingEducation.forEach((existingItem) => {
                const isDeleted = !educationList.some(
                    (item) => item.id === existingItem.id
                );
                if (isDeleted) {
                    toDelete.push(existingItem);
                }
            });

            // Update modified records
            if (toUpdate.length > 0) {
                await put(route("education.update", document.id), {
                    education: toUpdate,
                });
            }

            // Add new records
            if (toAdd.length > 0) {
                await post(route("education.store", document.id), {
                    education: toAdd,
                });
            }
            await Promise.all(
                educationList.map((item) => educationSchema.validate(item))
            );

            // Move to the next step
            if (handleNext) handleNext();
        } catch (error) {
            console.error("Failed to save education details", error);
            setErrors(
                error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, [])
            );
        }
    };

    //-------------------------------------------------------------------------------------------
    return (
        <div>
            <div className="w-full">
                <h2 className="font-bold text-lg">Education</h2>
                <p className="text-sm">Add your education details</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
                    {educationList.map((item, index) => (
                        <div key={index}>
                            <div className="relative grid grid-cols-2 mb-5 pt-4 gap-3">
                                {educationList.length > 1 && (
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        disabled={isPending}
                                        className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black
                                         dark:!bg-gray-600 text-white"
                                        size="icon"
                                        onClick={() =>
                                            removeEducation(index, item.id)
                                        }
                                    >
                                        <X size="13px" />
                                    </Button>
                                )}

                                <div className="col-span-2">
                                    <Label className="text-sm">
                                        University Name
                                    </Label>
                                    <Input
                                        name="university_name"
                                        placeholder="Enter university name"
                                        required
                                        value={item.university_name}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "university_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors[index]?.university_name && (
                                        <p className="text-red-500 text-sm">
                                            {errors[index].university_name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label className="text-sm">Degree</Label>
                                    <Input
                                        name="degree"
                                        placeholder="Enter degree"
                                        required
                                        value={item.degree}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "degree",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors[index]?.degree && (
                                        <p className="text-red-500 text-sm">
                                            {errors[index].degree}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label className="text-sm">Major</Label>
                                    <Input
                                        name="major"
                                        placeholder="Enter major"
                                        required
                                        value={item.major}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "major",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors[index]?.major && (
                                        <p className="text-red-500 text-sm">
                                            {errors[index].major}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label className="text-sm">
                                        Start Date
                                    </Label>
                                    <Input
                                        name="start_date"
                                        type="date"
                                        required
                                        value={item.start_date}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "start_date",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors[index]?.start_date && (
                                        <p className="text-red-500 text-sm">
                                            {errors[index].start_date}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label className="text-sm">End Date</Label>
                                    <Input
                                        name="end_date"
                                        type="date"
                                        required
                                        value={item.end_date}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "end_date",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors[index]?.end_date && (
                                        <p className="text-red-500 text-sm">
                                            {errors[index].end_date}
                                        </p>
                                    )}
                                </div>
                                <div className="col-span-2 mt-1">
                                    <Label className="text-sm">
                                        Description
                                    </Label>
                                    <Textarea
                                        name="description"
                                        placeholder="Enter description"
                                        required
                                        value={item.description}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors[index]?.description && (
                                        <p className="text-red-500 text-sm">
                                            {errors[index].description}
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
                                        <Plus size="15px" />
                                        Add More Education
                                    </Button>
                                )}
                        </div>
                    ))}
                </div>
                <Button
                    className="mt-4"
                    type="submit"
                    disabled={!isFormValid || isPending}
                >
                    {isPending && (
                        <Loader size="15px" className="animate-spin" />
                    )}
                    Save Changes
                </Button>
            </form>
        </div>
    );
}

export default EducationForm;
