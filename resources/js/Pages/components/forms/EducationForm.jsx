import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { generateThumbnail } from "@/lib/helper";
import { useForm } from "@inertiajs/react";
import { Loader, Plus, X } from "lucide-react";
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
    const [isSaving, setIsSaving] = useState(false);

    const {
        put,
        post,
        delete: destroy,
        data,
        setData,
    } = useForm({
        education: educationList,
    });

    // Synchronize educationList with data
    useEffect(() => {
        const fetchThumbnail = async () => {
            const thumbnail = await generateThumbnail();
            setData({ education: educationList, thumbnail });
        };
        fetchThumbnail();
    }, [educationList]);

    const handleChange = (index, field, value) => {
        setEducationList((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    const addNewEducation = () => {
        setEducationList((prev) => [...prev, { ...initialState }]);
    };

    // Only delete the specific item by its ID
    const removeEducation = (index, id) => {
        setEducationList((prev) => prev.filter((_, i) => i !== index));
        removeEducationBack(id);
    };

    // Function to handle the deletion on the server
    const removeEducationBack = async (id) => {
        try {
            await destroy(route("education.delete", id), {
                data: { education: [{ id }] }, // Only pass the education ID
            });
        } catch (error) {
            console.error("Failed to delete education", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const existingEducation = document.education || [];
            const toUpdate = [];
            const toAdd = [];
            const toDelete = [];

            // Identify items to update, add, or delete
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

            // Move to the next step
            if (handleNext) handleNext();
        } catch (error) {
            console.error("Failed to save education details", error);
        } finally {
            setIsSaving(false);
        }
    };

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
                                        disabled={isSaving}
                                        className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white"
                                        size="icon"
                                        onClick={() =>
                                            removeEducation(index, item.id)
                                        } // Correctly pass the index for deletion
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
                                </div>
                            </div>

                            {index === educationList.length - 1 &&
                                educationList.length < 5 && (
                                    <Button
                                        className="gap-1 mt-1 text-primary border-primary/50"
                                        variant="outline"
                                        type="button"
                                        disabled={isSaving}
                                        onClick={addNewEducation}
                                    >
                                        <Plus size="15px" />
                                        Add More Education
                                    </Button>
                                )}
                        </div>
                    ))}
                </div>
                <Button className="mt-4" type="submit" disabled={isSaving}>
                    {isSaving && (
                        <Loader size="15px" className="animate-spin" />
                    )}
                    Save Changes
                </Button>
            </form>
        </div>
    );
}

export default EducationForm;
