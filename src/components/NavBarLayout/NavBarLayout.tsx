import { Button, Navbar, Typography } from "@material-tailwind/react";
import { logout } from "@multiversx/sdk-dapp/utils/logout";
import { PropsWithChildren, useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Icons for mobile menu
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account/useGetAccountInfo";
import { routeNames } from "../../routes";
import { useNavigate } from "react-router-dom";
export const NavBarLayout = ({ children }: PropsWithChildren) => {
    const [openNav, setOpenNav] = useState(false);
    const navigate = useNavigate();
    const userAddress = useGetAccountInfo().address;

    const logoutHandler = () => {
        logout(routeNames.unlock);
    };

    // Effect to close the mobile navigation menu on window resize if width is >= 960px
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setOpenNav(false);
            }
        };
        window.addEventListener("resize", handleResize);
        // Cleanup the event listener on component unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        // Use flex column layout to make content area scrollable below sticky navbar
        <div className="flex flex-col min-h-screen bg-gray-50">
            {" "}
            {/* Added min-h-screen and bg */}
            <Navbar
                placeholder=""
                // Navbar styling: sticky, full width, background, shadow/border
                className="sticky top-0 z-50 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 border-b border-blue-gray-100 bg-white shadow-sm"
            >
                <div className="flex items-center justify-between text-blue-gray-900">
                    {/* Brand/Title Section */}
                    <Typography
                        placeholder=""
                        as="a"
                        href="#" // Consider linking to dashboard or home page
                        className="mr-4 cursor-pointer py-1.5 font-semibold" // Increased font weight
                    >
                        <strong>Escrow Tutorial</strong>{" "}
                        <small className="font-normal">{userAddress}</small>
                    </Typography>

                    {/* Desktop Navigation & Actions */}
                    <div className="hidden lg:flex items-center gap-x-4">
                        {" "}
                        {/* Added gap */}
                        {/* {navList} Uncomment if navList is defined */}
                        <Button
                            onClick={logoutHandler}
                            placeholder=""
                            variant="gradient" // Or choose another variant like 'outlined' or 'text'
                            color="blue-gray" // Match theme
                            size="sm"
                        >
                            <span>Logout</span>
                        </Button>
                    </div>
                </div>
            </Navbar>
            <main className="flex-grow overflow-y-auto p-4 md:p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
};
