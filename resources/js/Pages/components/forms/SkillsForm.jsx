import '@smastrom/react-rating/style.css';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { Rating } from "@smastrom/react-rating";
import { Loader, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const initialState = {
    name: "",
    rating: 0,
};

function SkillsForm({ document }) {
    const [skillList, setSkillList] = useState(() =>
        document?.skills?.length ? document.skills : [initialState]
    );
    const [isSaving, setIsSaving] = useState(false);
    const { put, post, delete: destroy, data, setData } = useForm({
        skills: skillList,
    });
    //---------------------------------------------------------------------
    useEffect(() => {
        setData({ skills: skillList });
    }, [skillList]);
    //---------------------------------------------------------------------
    const handleChange = (index, field, value) => {
        setSkillList((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };
    //---------------------------------------------------------------------
    const addNewSkill = () => {
        setSkillList((prev) => [...prev, { ...initialState }]);
    };
    //---------------------------------------------------------------------
    const removeSkill = (index, id) => {
        setSkillList((prev) => prev.filter((_, i) => i !== index));
        removeSkillBack(id);
    };

    const removeSkillBack = async (id) => {
        try {
            await destroy(route("skill.delete", id), {
                data: { skill: [{ id }] }, 
            });
        } catch (error) {
            console.error("Failed to delete education", error);
        }
    };
    //---------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

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
        } finally {
            setIsSaving(false);
        }
    };

    //---------------------------------------------------------------------
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
                                        className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white"
                                        size="icon"
                                        disabled={isSaving}
                                        onClick={() => removeSkill(index, item.id)}
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
                                            handleChange(index, "name", e.target.value)
                                        }
                                    />
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
                                </div>
                            </div>

                            {index === skillList.length - 1 &&
                                skillList.length < 15 && (
                                    <Button
                                        className="gap-1 mt-1 text-primary border-primary/50"
                                        variant="outline"
                                        type="button"
                                        disabled={isSaving}
                                        onClick={addNewSkill}
                                    >
                                        <Plus size="15px" />
                                        Add More Skills
                                    </Button>
                                )}
                        </div>
                    ))}
                </div>
                <Button className="mt-4" type="submit" disabled={isSaving}>
                    {isSaving && <Loader size="15px" className="animate-spin" />}
                    Save & Done
                </Button>
            </form>
        </div>
    );
}

export default SkillsForm;
