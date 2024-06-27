import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';

const Navbar: React.FC = () => {
    const location = useLocation();

    return (
        <div className="flex justify-between items-center w-full p-4 bg-white shadow-md min-h-12">
            <div className="flex">
                <h1 className="text-xl font-bold">RSS Radar</h1>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fb923c"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                >
                    <path d="M4 11a9 9 0 0 1 9 9" />
                    <path d="M4 4a16 16 0 0 1 16 16" />
                    <circle cx="5" cy="19" r="1" />
                </svg>
            </div>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link
                                to="/"
                                className={`${navigationMenuTriggerStyle()} ${location.pathname === '/' ? 'bg-gray-200' : 'text-gray-500 hover:bg-gray-200'}`}
                            >
                                Recherche
                            </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <Link
                                to="/statistics"
                                className={`${navigationMenuTriggerStyle()} ${location.pathname === '/statistics' ? 'bg-gray-200' : 'text-gray-500 hover:bg-gray-200'}`}
                            >
                                Statistiques
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default Navbar;
