import "@smastrom/react-rating/style.css";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { Rating } from "@smastrom/react-rating";
import { Loader, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { generateThumbnail } from "@/lib/helper";
import * as Yup from "yup";

const initialState = {
    name: "",
    rating: 0,
};

function SkillsForm({ document,handelNext }) {
    const [skillList, setSkillList] = useState(() =>
        document?.skills?.length ? document.skills : [initialState]
    );
    const [errors, setErrors] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const {put,post,delete: destroy,data,setData,processing,} = useForm({ skills: skillList });
    //-------------------------------------------------------------------------------------------------------------------------
    const skillSchema = Yup.object().shape({
        name: Yup.string()
            .required("Skill name is required")
            .min(3, "Skill name must be at least 3 characters long"),
        rating: Yup.number()
            .min(1, "Rating must be at least 1")
            .max(5, "Rating must not exceed 5")
            .required("Rating is required"),
    });
    //-------------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        const processSkillList = async () => {
            try {
                // Fetch thumbnail
                const thumbnail = await generateThumbnail();
                setData({ skills: skillList, thumbnail });

                // Validate the form
                await Promise.all(
                    skillList.map((exp) => skillSchema.validate(exp))
                );
                setIsFormValid(true);
            } catch (err) {
                setIsFormValid(false);
            }
        };
        processSkillList();
    }, [skillList]);
    //-------------------------------------------------------------------------------------------------------------------------
    const validateSkill = async (index, field, value) => {
        try {
            await skillSchema.validateAt(field, { [field]: value });
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
    //-------------------------------------------------------------------------------------------------------------------------
    const handleChange = (index, field, value) => {
        setSkillList((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
        validateSkill(index, field, value);
    };
    //-------------------------------------------------------------------------------------------------------------------------
    const addNewSkill = () => {
        setSkillList((prev) => [...prev, { ...initialState }]);
    };
    //-------------------------------------------------------------------------------------------------------------------------
    const removeSkill = (index, id) => {
        setSkillList((prev) => prev.filter((_, i) => i !== index));
        removeSkillBack(id);
    };
    //-------------------------------------------------------------------------------------------------------------------------

    const removeSkillBack = async (id) => {
        try {
            await destroy(route("skill.delete", id), {
                data: { skill: [{ id }] },
            });
        } catch (error) {
            console.error("Failed to delete education", error);
        }
    };
    //-------------------------------------------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const existingSkill = document.skills || [];
            const toUpdate = [];
            const toAdd = [];

            // Identify items to update, add, or delete
            skillList.forEach((item) => {
                const existingItem = existingSkill.find(
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

            existingSkill.forEach((existingItem) => {
                const isDeleted = !skillList.some(
                    (item) => item.id === existingItem.id
                );
                if (isDeleted) {
                    toDelete.push(existingItem);
                }
            });

            // Update modified records
            if (toUpdate.length > 0) {
                await put(route("skill.update", document.id), {
                    skills: toUpdate,
                });
            }

            // Add new records
            if (toAdd.length > 0) {
                await post(route("skill.store", document.id), {
                    skills: toAdd,
                });
            }
        } catch (error) {
            console.error("Failed to save skills details", error);
            setErrors(
                error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, [])
            );
        }
    };

    //-------------------------------------------------------------------------------------------------------------------------

    return (
        <div>
            <div className="w-full">
                <h2 className="font-bold text-lg">Skills</h2>
                <p className="text-sm">Add your skills information</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
                    {skillList.map((item, index) => (
                        <div key={index}>
                            <div className="relative flex items-center justify-between mb-5 pt-4 gap-3">
                                {skillList?.length > 1 && (
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black
                                         dark:!bg-gray-600 text-white"
                                        size="icon"
                                        disabled={processing}
                                        onClick={() =>
                                            removeSkill(index, item.id)
                                        }
                                    >
                                        <X size="13px" />
                                    </Button>
                                )}

                                <div className="flex-1">
                                    <Label className="text-sm">Name</Label>
                                    <Input
                                        name="name"
                                        placeholder=""
                                        required
                                        autoComplete="off"
                                        value={item.name || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors[index]?.name && (
                                        <p className="text-red-500 text-sm">
                                            {errors[index].name}
                                        </p>
                                    )}
                                </div>

                                <div className="shrink-0 pt-5">
                                    <Rating
                                        style={{ maxWidth: 120 }}
                                        isDisabled={!item.name}
                                        value={item?.rating || 0}
                                        onChange={(value) =>
                                            handleChange(index, "rating", value)
                                        }
                                    />
                                    {errors[index]?.rating && (
                                        <p className="text-red-500 text-sm">
                                            {errors[index].rating}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {index === skillList.length - 1 &&
                                skillList.length < 15 && (
                                    <Button
                                        className="gap-1 mt-1 text-primary border-primary/50"
                                        variant="outline"
                                        type="button"
                                        disabled={processing}
                                        onClick={addNewSkill}
                                    >
                                        <Plus size="15px" />
                                        Add More Skills
                                    </Button>
                                )}
                        </div>
                    ))}
                </div>
                <Button
                    className="mt-4"
                    type="submit"
                    disabled={!isFormValid || processing}
                >
                    {processing && (
                        <Loader size="15px" className="animate-spin" />
                    )}
                    Save Changes
                </Button>
            </form>
        </div>
    );
}

export default SkillsForm;
