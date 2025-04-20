'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const SidebarToggle = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(searchParams.get('sidebar') === 'true');

    const toggleSidebar = () => {
        const newState = !isOpen;
        setIsOpen(newState);

        // Update the query parameter
        const newQuery = new URLSearchParams(searchParams.toString());
        newQuery.set('sidebar', newState.toString());
        router.push(`?${newQuery.toString()}`, { scroll: false });
    };

    useEffect(() => {
        // Apply a class to the document body to shift the layout
        if (isOpen) {
            document.body.classList.add('sidebar-open');
        } else {
            document.body.classList.remove('sidebar-open');
        }

        return () => {
            document.body.classList.remove('sidebar-open');
        };
    }, [isOpen]);

    return (
        <button
            onClick={toggleSidebar}
            className="fixed top-24 left-4 z-50 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none transition-transform duration-300"
        >
            {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
    );
};

export default SidebarToggle;
