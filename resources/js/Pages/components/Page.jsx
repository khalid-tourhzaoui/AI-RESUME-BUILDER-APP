import React from "react";
import AddResume from "./AddResume";
import ResumeList from "./ResumeList";
import TrashListBox from "./TrashListBox";
import { usePage } from "@inertiajs/react";

function Page(props) {
    const { document } = props;
    return (
        <div className="w-full">
            <div className="w-full mx-auto max-w-7xl py-5 px-5">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Resume Builder</h1>
                        <p className="text-base dark:text-inherit">
                            Create your own custom resume with AI & Subscribe to
                            the channel
                        </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-3">
                        {/* {Trash List} */}
                        <TrashListBox document={document} />
                    </div>
                </div>

                <div className="w-full pt-11">
                    <h5 className="text-xl font-semibold dark:text-inherit mb-3">
                        All Resume
                    </h5>
                    <div className="flex flex-wrap w-full gap-5">
                        <AddResume />
                        <ResumeList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
