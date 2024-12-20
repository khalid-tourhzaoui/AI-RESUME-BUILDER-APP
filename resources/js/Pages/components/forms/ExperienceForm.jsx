import { Loader, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from '@/Components/ui/button';
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { useForm } from "@inertiajs/react";
import RichTextEditor from "../editor";

const initialState = {
    id: undefined,
    docId: undefined,
    title: "",
    company_name: "",
    city: "",
    country: "",
    start_date: "",
    end_date: "",
    work_summary: "",
    currentlyWorking: false,
  };

function ExperienceForm({ handleNext, document }) {
    //--------------------------------------------------------------------------------------
    const [experienceList, setExperienceList] = useState(() =>
            document?.experience?.length ? document.experience : [initialState]
        );
    //--------------------------------------------------------------------------------------
     const [isSaving, setIsSaving] = useState(false);
     const {put,post,delete: destroy,data,setData,isPending} = useForm({experience: experienceList});
    //--------------------------------------------------------------------------------------
    useEffect(() => {
        setData({ experience: experienceList });
    }, [experienceList]);

    const handleChange = (index, field, value) => {
        setExperienceList((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };
    //--------------------------------------------------------------------------------------
    const addNewExperience = () => {
        setExperienceList((prev) => [...prev, { ...initialState }]);
    };
    //--------------------------------------------------------------------------------------
    const removeExperience = (index, id) => {
        setExperienceList((prev) => prev.filter((_, i) => i !== index));
        removeEperienceBack(id);
    };
    //--------------------------------------------------------------------------------------
    const removeEperienceBack = async (id) => {
        try {
            await destroy(route("experience.delete", id), {
                data: { experience: [{ id }] },
            });
        } catch (error) {
            console.error("Failed to delete experience", error);
        }
    };
    //--------------------------------------------------------------------------------------
    const handEditor = (value,name,index) => {
        setExperienceList((prevState) => {
          const newExperienceList = [...prevState];
          newExperienceList[index] = {
            ...newExperienceList[index],
            [name]: value,
          };
          return newExperienceList;
        });
      };
    //--------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const existingEperience = document.experience || [];
        const toUpdate = [];
        const toAdd = [];
        const toDelete = [];

        experienceList.forEach((item) => {
            const existingItem = existingEperience.find((exp) => exp.id === item.id);

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

        existingEperience.forEach((existingItem) => {
            const isDeleted = !experienceList.some(
                (item) => item.id === existingItem.id
            );
            if (isDeleted) {
                toDelete.push(existingItem);
            }
        });

        try {
            if (toUpdate.length > 0) {
                await put(route("experience.update", document.id), {
                    experience: toUpdate,
                });
            }
            if (toAdd.length > 0) {
                await post(route("experience.store", document.id), {
                    experience: toAdd,
                });
            }
            if (handleNext) handleNext();
        } catch (error) {
            console.error("Failed to save experience details", error);
        } finally {
            setIsSaving(false);
        }
    };

    //--------------------------------------------------------------------------------------
    return (
        <div>
            <div className="w-full">
                <h2 className="font-bold text-lg">Professional Experience</h2>
                <p className="text-sm">Add previous job experience</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div
                    className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
                    {experienceList?.map((item, index) => (
                        <div key={index}>
                            <div
                                className="relative grid grid-cols-2 mb-5 pt-4 gap-3">
                                {experienceList?.length > 1 && (
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        className="size-[20px] text-center rounded-full absolute -top-3 -right-5
                                      !bg-black dark:!bg-gray-600 text-white"
                                        size="icon"
                                        onClick={() => removeExperience(index,item.id)}
                                    >
                                        <X size="13px" />
                                    </Button>
                                )}

                                <div>
                                    <Label className="text-sm">
                                        Position title
                                    </Label>
                                    <Input
                                        name="title"
                                        placeholder=""
                                        required
                                        value={item?.title || ""}
                                        onChange={(e) => handleChange(index, e.target.name, e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm">
                                        Company Name
                                    </Label>
                                    <Input
                                        name="company_name"
                                        placeholder=""
                                        required
                                        value={item?.company_name || ""}
                                        onChange={(e) => handleChange(index, e.target.name, e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm">City</Label>
                                    <Input
                                        name="city"
                                        placeholder=""
                                        required
                                        value={item?.city || ""}
                                        onChange={(e) => handleChange(index, e.target.name, e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm">Country</Label>
                                    <Input
                                        name="country"
                                        placeholder=""
                                        required
                                        value={item?.country || ""}
                                        onChange={(e) => handleChange(index, e.target.name, e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm">
                                        Start Date
                                    </Label>
                                    <Input
                                        name="start_date"
                                        type="date"
                                        placeholder=""
                                        required
                                        value={item?.start_date || ""}
                                        onChange={(e) => handleChange(index, e.target.name, e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm">End Date</Label>
                                    <Input
                                        name="end_date"
                                        type="date"
                                        placeholder=""
                                        required
                                        value={item?.end_date || ""}
                                        onChange={(e) => handleChange(index, e.target.name, e.target.value)}
                                    />
                                </div>

                                <div className="col-span-2 mt-1">
                                    {/* {Work Summary} */}
                                    {/* <RichTextEditor
                                        jobTitle={item.title}
                                        initialValue={item.work_summary || ""}
                                        onEditorChange={(value) =>
                                            handEditor(
                                                value,
                                                "work_summary",
                                                index
                                            )
                                        }
                                    /> */}
                                    <RichTextEditor
                                        jobTitle={item.title || ""}
                                        initialValue={item?.work_summary || ""}
                                        onEditorChange={(value) =>
                                            handEditor(value, "work_summary", index)
                                        }
                                    />

                                </div>
                            </div>

                            {index === experienceList.length - 1 &&
                                experienceList.length < 5 && (
                                    <Button
                                        className="gap-1 mt-1 text-primary border-primary/50"
                                        variant="outline"
                                        type="button"
                                        onClick={addNewExperience}
                                    >
                                        <Plus size="15px" />
                                        Add More Experience
                                    </Button>
                                )}
                        </div>
                    ))}
                </div>
                <Button className="mt-4" type="submit" disabled={isPending}>
                    {isPending && (
                        <Loader size="15px" className="animate-spin" />
                    )}
                    Save Changes
                </Button>
            </form>
        </div>
    );
}

export default ExperienceForm;
