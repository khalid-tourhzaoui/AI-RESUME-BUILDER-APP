import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { Link, Loader, Network, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { generateThumbnail } from "@/lib/helper";
import * as Yup from "yup";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { socialMediaListData } from "@/constant/socialMedia";
import { SocialIcon } from "react-social-icons";

const initialState = {
    name: "",
    link: "",
    thumbnail:""
};

function SocialMedia({ document, handleNext }) {
    const [SocialMediaList, setSocialMediaList] = useState(() =>
        document?.social_medias?.length
            ? document.social_medias
            : [initialState]
    );
    const [search, setSearch] = useState("");

    // Filter the languages based on the search query
    const filteredSocialMedias = socialMediaListData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );
    const [errors, setErrors] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const {
        put,
        post,
        delete: destroy,
        data,
        setData,
        processing,
    } = useForm({ social_medias: SocialMediaList });
    //-------------------------------------------------------------------------------------------------------------------------

    const socialMediaSchema = Yup.object().shape({
        name: Yup.string().required("Social Media name is required"),
        link: Yup.string().required("Social media link is required").matches(
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            "Invalid URL"
        ),
    });

    //-------------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        const processSocialMediaList = async () => {
            try {
                // Fetch thumbnail
                const thumbnail = await generateThumbnail();
                setData({ social_medias: SocialMediaList, thumbnail:thumbnail });

                // Validate the form
                await Promise.all(
                    SocialMediaList.map((exp) =>
                        socialMediaSchema.validate(exp)
                    )
                );
                setIsFormValid(true);
            } catch (err) {
                setIsFormValid(false);
            }
        };
        processSocialMediaList();
    }, [SocialMediaList]);
    //-------------------------------------------------------------------------------------------------------------------------
    const validateSocialMedia = async (index, field, value) => {
        try {
            await socialMediaSchema.validateAt(field, { [field]: value });
            setErrors((prev) => {
                const newErrors = [...prev];
                if (newErrors[index]) {
                    delete newErrors[index][field];
                }
                return newErrors;
            });
            setIsFormValid(true);
        } catch (err) {
            setErrors((prev) => {
                const newErrors = [...prev];
                if (!newErrors[index]) {
                    newErrors[index] = {};
                }
                newErrors[index][field] = err.message;
                return newErrors;
            });
            setIsFormValid(false);
        }
    };
    //-------------------------------------------------------------------------------------------------------------------------
    const handleChange = (index, field, value) => {
        setSocialMediaList((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
        validateSocialMedia(index, field, value);
    };
    //-------------------------------------------------------------------------------------------------------------------------
    const addNewLanguage = () => {
        setSocialMediaList((prev) => [...prev, { ...initialState }]);
    };
    //-------------------------------------------------------------------------------------------------------------------------
    const removeSocialMedia = (index, id) => {
        setSocialMediaList((prev) => prev.filter((_, i) => i !== index));
        removeSocialMediaBack(id);
    };
    //-------------------------------------------------------------------------------------------------------------------------

    const removeSocialMediaBack = async (id) => {
        try {
            await destroy(route("profile-details.delete", id), {
                data: { social_media: [{ id }] },
            });
        } catch (error) {
            console.error("Failed to delete social media", error);
        }
    };
    //-------------------------------------------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const existingSocialMedia = document.social_medias || [];
            const toUpdate = [];
            const toAdd = [];

            // Identify items to update, add, or delete
            SocialMediaList.forEach((item) => {
                const existingItem = existingSocialMedia.find(
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

            existingSocialMedia.forEach((existingItem) => {
                const isDeleted = !SocialMediaList.some(
                    (item) => item.id === existingItem.id
                );
                if (isDeleted) {
                    toDelete.push(existingItem);
                }
            });

            // Update modified records
            if (toUpdate.length > 0) {
                await put(route("profile-details.update", document.id), {
                    social_medias: toUpdate,
                });
            }

            // Add new records
            if (toAdd.length > 0) {
                await post(route("profile-details.store", document.id), {
                    social_medias: toAdd,
                });
            }
            // Move to the next step
            if (handleNext) handleNext();
        } catch (error) {
            console.error("Failed to save social media details", error);
            setErrors(
                error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, [])
            );
        }
    };
    console.log(isFormValid);

    //-------------------------------------------------------------------------------------------------------------------------

    return (
        <div>
            <div className="w-full">
                <h2 className="font-bold text-lg">Social Medias</h2>
                <p className="text-sm">Add your social medias information</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
                    {SocialMediaList.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 mb-5 pt-4 relative">
                                {SocialMediaList?.length > 1 && (
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black
                                         dark:!bg-gray-600 text-white"
                                        size="icon"
                                        disabled={processing}
                                        onClick={() =>
                                            removeSocialMedia(index, item.id)
                                        }
                                    >
                                        <X size="13px" />
                                    </Button>
                                )}

                                <div className="col-span-1 sm:col-span-1 md:col-span-1">
                                    <Label className="text-sm">Name ( <Network size="20px" className="inline-flex"/> ) :</Label>

                                    <Select
                                        name={item.name || ""}
                                        onValueChange={(value) =>
                                            handleChange(index, "name", value)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue
                                                placeholder={item.name}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <div className="px-2 py-1">
                                                <Input
                                                    type="text"
                                                    placeholder="Search Social medias..."
                                                    className="w-full p-2 border rounded"
                                                    value={search}
                                                    onChange={(e) =>
                                                        setSearch(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            {filteredSocialMedias.map(
                                                (social) => {
                                                    const isDisabled =
                                                        SocialMediaList.some(
                                                            (item) =>
                                                                item.name ===
                                                                social.name
                                                        );
                                                    return (
                                                        <SelectItem
                                                            key={social.id}
                                                            value={social.name}
                                                            name={
                                                                social.name ||
                                                                ""
                                                            }
                                                            disabled={
                                                                isDisabled
                                                            }
                                                        >
                                                            <div className="flex items-center">
                                                                <SocialIcon
                                                                    className="mr-2"
                                                                    url={
                                                                        social.url
                                                                    }
                                                                    style={{
                                                                        height: 30,
                                                                        width: 30,
                                                                    }}
                                                                />
                                                                {social.name}
                                                            </div>
                                                        </SelectItem>
                                                    );
                                                }
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {errors[index]?.name && (
                                        <p className="text-red-500 text-sm">
                                            {errors[index].name}
                                        </p>
                                    )}
                                </div>

                                <div className="col-span-1 sm:col-span-1 md:col-span-1">
                                    <Label className="text-sm">
                                        Link ( <Link size="20px" className="inline-flex"/> ) :
                                    </Label>
                                    <Input
                                        name="link"
                                        placeholder="www.example.com"
                                        required
                                        className="mt-3"
                                        autoComplete="off"
                                        value={item.link || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "link",
                                                e.target.value
                                            )
                                        }
                                    />

                                    {errors[index]?.link && (
                                        <p className="text-red-500 text-sm">
                                            {errors[index].link}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {index === SocialMediaList.length - 1 &&
                                SocialMediaList.length < 15 && (
                                    <Button
                                        className="gap-1 mt-1 text-primary border-primary/50"
                                        variant="outline"
                                        type="button"
                                        disabled={processing}
                                        onClick={addNewLanguage}
                                    >
                                        <Plus size="15px" />
                                        Add More Social Media
                                    </Button>
                                )}
                        </div>
                    ))}
                </div>
                <Button
                    className="mt-4 w-full"
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

export default SocialMedia;
