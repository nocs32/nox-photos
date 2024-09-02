"use client";

import { Activity, Bookmark, ChevronLeft, LogOut, Menu, Moon, Settings, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

export function MoreDropdown() {
    const [open, setOpen] = useState(false);
    const [showModeToggle, setShowModeToggle] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (!event.target) return;

            if (ref.current && !ref.current.contains(event.target as Node)) {
                setShowModeToggle(false);
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [ref]);

    return (
        <DropdownMenu open={open}>
            <DropdownMenuTrigger asChild>
                <Button
                    className="md:w-full justify-start space-x-2 px-3"
                    variant="ghost"
                    size="lg"
                    onClick={() => setOpen(!open)}
                >
                    <Menu />
                    <div className="hidden lg:block">More</div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className={cn("dark:bg-neutral-800 w-64 rounded-xl p-0 transition-opacity", !open && "opacity-0")}
                ref={ref}
                align="end"
                alignOffset={-40}
            >
                {!showModeToggle && (
                    <>
                        <DropdownMenuItem className="menuItem">
                            <Settings size={20} />
                            <p>Settings</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="menuItem">
                            <Activity size={20} />
                            <p>Your activity</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="menuItem">
                            <Bookmark size={20} />
                            <p>Saved</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="menuItem" onClick={() => setShowModeToggle(true)}>
                            <Moon size={20} />
                            <p>Switch Appearance</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="menuItem" onClick={() => signOut()}>
                            <LogOut size={20} />
                            <p>Log Out</p>
                        </DropdownMenuItem>
                    </>
                )}
                {showModeToggle && (
                    <>
                        <div className="flex items-center border-b border-gray-200 dark:border-neutral-700 py-3.5 px-2.5">
                            <ChevronLeft
                                className="mr-1"
                                size={22}
                                onClick={() => setShowModeToggle(false)}
                            />
                            <p className="font-bold ml-1">Switch appearance</p>
                            {theme === "dark" ? <Moon size={20} className="ml-auto" /> : <Sun size={20} className="ml-auto" />}
                        </div>
                        <Label htmlFor="dark-mode" className="menuItem">
                            Dark Mode
                            <DropdownMenuItem className="ml-auto !p-0">
                                <Switch
                                    id="dark-mode"
                                    className="ml-auto"
                                    checked={theme === "dark"}
                                    onCheckedChange={(checked) => {
                                        setTheme(checked ? "dark" : "light");
                                    }}
                                />
                            </DropdownMenuItem>
                        </Label>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
