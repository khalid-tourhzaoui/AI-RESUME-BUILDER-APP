import React, { useMemo } from "react";
import { format } from "date-fns";
import { Archive, FileText, Globe, Lock, Trash } from "lucide-react";
import { Link } from "@inertiajs/react";
import styled from "styled-components";

function Card({
    title,
    status,
    thumbnail,
    updatedAt,
    documentId,
    id,
}) {
    const docDate = useMemo(() => {
        if (!updatedAt) return null;
        const formattedDate = format(new Date(updatedAt), "MMM dd, yyyy");
        return formattedDate;
    }, [updatedAt]);

    return (
        <StyledWrapper>
            <div className="card">
                <button className="mail">
                    {status === "private" ? (
                        <>
                            <Lock size="20px" className="inline-flex" /> Private
                        </>
                    ) : status === "public" ? (
                        <>
                            <Globe size="20px" className="inline-flex" /> Public
                        </>
                    ) : (
                        <>
                            <Archive size="20px" className="inline-flex" /> Archive
                        </>
                    )}
                </button>
                <div className="profile-pic">
                    {thumbnail ? (
                        <img
                            src={thumbnail}
                            alt={title}
                            className="w-full h-full object-cover rounded-t-lg"
                        />
                    ) : (
                        <FileText size="15px" />
                    )}
                </div>
                <div className="bottom">
                    <div className="content">
                        <span className="name">{title}</span>
                        <span className="about-me">Last Update: {docDate}</span>
                    </div>
                    <div className="bottom-bottom">
                        <div className="social-links-container">
                            {status === "private" ? (
                                <>
                                    <Link method="delete" href={route("documents.delete", id)}>
                                        <Trash size="20px" className="inline-flex" />
                                    </Link>
                                    <Link method="get" href={route("documents.updateStatus", { id, status: 'public' })}>
                                        <Globe size="20px" className="inline-flex" />
                                    </Link>
                                    <Link method="get" href={route("documents.updateStatus", { id, status: 'archived' })}>
                                        <Archive size="20px" className="inline-flex" />
                                    </Link>
                                </>
                            ) : status === "public" ? (
                                <>
                                    <Link method="delete" href={route("documents.delete", id)}>
                                        <Trash size="20px" className="inline-flex" />
                                    </Link>
                                    <Link method="get">
                                        <Lock size="20px" className="inline-flex" />
                                    </Link>
                                    <Link method="get" href={route("documents.updateStatus", { id, status: 'archived' })}>
                                        <Archive size="20px" className="inline-flex" />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link method="delete" href={route("documents.delete", id)}>
                                        <Trash size="20px" className="inline-flex" />
                                    </Link>
                                    <Link method="get" href={route("documents.updateStatus", { id, status: 'public' })}>
                                        <Globe size="20px" className="inline-flex" />
                                    </Link>
                                    <Link method="get" href={route("documents.updateStatus", { id, status: 'private' })}>
                                        <Lock size="20px" className="inline-flex" />
                                    </Link>
                                </>
                            )}
                        </div>
                        <Link href={route("documents.edit", documentId)} className="button">
                            Edit Me
                        </Link>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    .card {
        width: 280px;
        height: 230px;
        background: white;
        border-radius: 32px;
        padding: 3px;
        position: relative;
        left: -0.5rem;
        margin: 0 1.2rem;
        box-shadow: #604b4a30 0px 70px 30px -50px;
        transition: all 0.5s ease-in-out;
    }

    .card .mail {
        position: absolute;
        right: 2rem;
        top: 1.4rem;
        background: transparent;
        border: none;
    }

    .card .mail svg {
        stroke: #fbb9b6;
        stroke-width: 3px;
    }

    .card .mail svg:hover {
        stroke: #f55d56;
    }

    .card .profile-pic {
        position: absolute;
        width: calc(100% - 6px);
        height: calc(100% - 6px);
        top: 3px;
        left: 3px;
        border-radius: 29px;
        z-index: 1;
        border: 0px solid;
        overflow: hidden;
        transition: all 0.5s ease-in-out 0.2s, z-index 0.5s ease-in-out 0.2s;
    }

    .card .profile-pic img {
        -o-object-fit: cover;
        object-fit: cover;
        width: 100%;
        height: 100%;
        -o-object-position: 0px 0px;
        object-position: 0px 0px;
        transition: all 0.5s ease-in-out 0s;
    }

    .card .profile-pic svg {
        width: 60%;
        height: 80%;
        -o-object-fit: cover;
        object-fit: cover;
        -o-object-position: 0px 0px;
        object-position: 0px 0px;
        transform-origin: 45% 20%;
        transition: all 0.5s ease-in-out 0s;
    }

    .card .bottom {
        position: absolute;
        bottom: -3px;
        left: 3px;
        right: 3px;
        background: #fbb9b6;
        top: 80%;
        border-radius: 29px;
        z-index: 2;
        box-shadow: rgba(96, 75, 74, 0.1882352941) 0px 5px 5px 0px inset;
        overflow: hidden;
        transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
    }

    .card .bottom .content {
        position: absolute;
        bottom: 0;
        left: 1.5rem;
        right: 1.5rem;
        height: 160px;
    }

    .card .bottom .content .name {
        display: block;
        font-size: 1.2rem;
        color: white;
        margin-top: 2.7rem;
        font-weight: bold;
    }

    .card .bottom .content .about-me {
        display: block;
        font-size: 0.9rem;
        color: white;
    }

    .card .bottom .bottom-bottom {
        position: absolute;
        bottom: 0.5rem;
        left: 1.5rem;
        right: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .card .bottom .bottom-bottom .social-links-container {
        display: flex;
        gap: 1rem;
    }

    .card .bottom .bottom-bottom .social-links-container svg {
        height: 20px;
        fill: white;
        filter: drop-shadow(0 5px 5px rgba(165, 132, 130, 0.1333333333));
    }

    .card .bottom .bottom-bottom .social-links-container svg:hover {
        fill: #f55d56;
        transform: scale(1.2);
    }

    .card .bottom .bottom-bottom .button {
        background: white;
        color: #fbb9b6;
        border: none;
        border-radius: 20px;
        font-size: 1rem;
        padding: 0.4rem 0.6rem;
        box-shadow: rgba(165, 132, 130, 0.1333333333) 0px 5px 5px 0px;
    }

    .card .bottom .bottom-bottom .button:hover {
        background: #f55d56;
        color: white;
    }

    .card:hover {
        border-top-left-radius: 55px;
    }

    .card:hover .bottom {
        top: 20%;
        border-radius: 80px 29px 29px 29px;
        transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
    }

    .card:hover .profile-pic {
        width: 100px;
        height: 100px;
        aspect-ratio: 1;
        top: 10px;
        left: 10px;
        border-radius: 50%;
        z-index: 3;
        border: 7px solid #fbb9b6;
        box-shadow: rgba(96, 75, 74, 0.1882352941) 0px 5px 5px 0px;
        transition: all 0.5s ease-in-out, z-index 0.5s ease-in-out 0.1s;
    }

    .card:hover .profile-pic:hover {
        transform: scale(1.3);
        border-radius: 0px;
    }

    .card:hover .profile-pic img {
        transform: scale(2.5);
        -o-object-position: 0px 25px;
        object-position: 0px 25px;
        transition: all 0.5s ease-in-out 0.5s;
    }

    .card:hover .profile-pic svg {
        transform: scale(2.5);
        transition: all 0.5s ease-in-out 0.5s;
    }
`;

export default Card;
