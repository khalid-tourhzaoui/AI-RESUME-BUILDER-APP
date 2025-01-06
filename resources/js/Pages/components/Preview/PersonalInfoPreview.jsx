import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { Mail, MapPin, Phone, Save, Trash2, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { languages } from "@/constant/languages";
import { socialMediaListData } from "@/constant/socialMedia";
import { useForm } from '@inertiajs/react';

function PersonalInfoPreview({ document }) {
    const themeColor = document?.theme_color || INITIAL_THEME_COLOR;
    const [imageSrc, setImageSrc] = useState(document?.personal_info?.img || null);
    const [isDragging, setIsDragging] = useState(false);
    const { data, setData, patch } = useForm({
        profile_image_name: "",
    });

    // Handle Image Upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const imageURL = URL.createObjectURL(file);
            setImageSrc(imageURL);
            setData("profile_image_name", file.name); // Just store the name of the file
        } else {
            alert("Please upload a valid image file.");
        }
    };

    // Handle Drag and Drop
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            const imageURL = URL.createObjectURL(file);
            setImageSrc(imageURL);
            setData("profile_image_name", file.name); // Just store the name of the file
        } else {
            alert("Please drop a valid image file.");
        }
    };

    // Handle Image Deletion
    const handleDeleteImage = () => {
        setImageSrc(null);
        setData("profile_image_name", ""); // Clear the image name from state
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.profile_image_name) {
            alert("Please upload an image first!");
            return;
        }

        try {
            await patch(route("profile-details.upload", { document_id: document.id }), {
                profile_image_name: data.profile_image_name,

            });
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while uploading the image");
        }
    };
    return (
        <div className="w-full lg:w-1/3 space-y-2">
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
                <div className="space-y-4">
                    <div className="max-w-[240px] mx-auto lg:mx-0 aspect-square overflow-hidden rounded-2xl bg-gray-100 group relative">
                        {imageSrc ? (
                            <>
                                <img
                                    src={imageSrc}
                                    alt="Uploaded Preview"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-around">
                                    <button
                                        type="button"
                                        onClick={handleDeleteImage}
                                        className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-200"
                                        title="Delete Image"
                                    >
                                        <Trash2 className="w-5 h-5 text-white" />
                                    </button>
                                    <button
                                        type="submit"
                                        className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-200"
                                        title="Delete Image"
                                    >
                                        <Save className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <label
                                htmlFor="upload"
                                className={`w-full h-full flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 ${
                                    isDragging ? "bg-gray-200" : "bg-gray-50"
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <div className="text-center px-4">
                                    <p className="text-sm font-medium text-gray-800">
                                        Upload file
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Drag or drop your files here or click to
                                        upload
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    id="upload"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                    {/* <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition"
                        >
                            Upload Image
                        </button>
                    </div> */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-xl font-medium text-gray-800">
                            {document?.personal_info?.first_name &&
                            document?.personal_info?.last_name
                                ? `${document.personal_info.first_name} ${document.personal_info.last_name}`
                                : "John Doe"}
                        </h1>
                        <h2 className="text-lg text-purple-500">
                            {document?.personal_info?.job_title ||
                                "Full-Stack Designer"}
                        </h2>
                    </div>
                </div>
            </form>
            <hr
                className="border-[1.5px]"
                style={{ borderColor: themeColor }}
            />
            <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                    Personal Details
                </h3>
                <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-gray-600">
                        <Mail className="w-5 h-5 shrink-0" />
                        <span className="break-all">
                            {document?.personal_info?.email ||
                                "john.doe@gmail.com"}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                        <Phone className="w-5 h-5 shrink-0" />
                        <span>
                            {document?.personal_info?.phone ||
                                "(+39) 333 0123 765"}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                        <MapPin className="w-5 h-5 shrink-0" />
                        <span>
                            {document?.personal_info?.address ||
                                "Los Angeles, California"}
                        </span>
                    </div>
                </div>
            </div>
            <hr
                className="border-[1.5px]"
                style={{ borderColor: themeColor }}
            />
            <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                    Social Medias
                </h3>
                <div className="space-y-3">
                    {(document.social_medias &&
                    document.social_medias.length > 0
                        ? document.social_medias
                        : socialMediaListData.slice(0, 3)
                    ).map((social, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <SocialIcon
                                className="w-6 h-6 rounded-full"
                                url={social.link || social.url}
                                style={{ height: 30, width: 30 }}
                                title={social.name}
                            />
                            <div>
                                <div className="text-gray-800">
                                    {social.name}
                                </div>
                                <a
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-500"
                                >
                                    {document?.personal_info?.first_name ||
                                        "User"}
                                    's {social.name}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <hr
                className="border-[1.5px]"
                style={{ borderColor: themeColor }}
            />
            <div>
                <h3 className="font-semibold text-gray-800 mb-2">Languages</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {(document.languages && document.languages.length > 0
                        ? document.languages
                        : languages.slice(0, 3)
                    ).map((language, index) => {
                        const languageData = languages.find(
                            (l) => l.name === language.name
                        );
                        const flagClass = languageData
                            ? languageData.flagClass
                            : "fi fi-un";
                        console.log(languageData);
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-3"
                            >
                                <div className="rounded-md overflow-hidden">
                                    <span
                                        className={`w-full h-full ${flagClass}`}
                                    ></span>
                                </div>
                                <div>
                                    <div className="text-gray-800">
                                        {language.name || "English"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {language.level || "Native"}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PersonalInfoPreview;
