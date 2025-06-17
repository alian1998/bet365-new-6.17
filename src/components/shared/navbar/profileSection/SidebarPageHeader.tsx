import React from 'react';
import { RxCross1 } from 'react-icons/rx';

const SidebarPageHeader = ({ title,
    handleClose }: any) => {
    return (
        < >
            <div className="relative mainBgColor p-3 flex flex-col justify-center gap-5">
                <div className="flex justify-center items-center px-3 md:px-5">
                    <h6 className="text-white1 font-bold text-sm md:text-base">{title}</h6>
                    <div onClick={() => handleClose("")} className="size-8 p-2 rounded bg-[#ff1515] absolute right-3 md:right-5 cursor-pointer">
                        <RxCross1 className="size-full" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidebarPageHeader;