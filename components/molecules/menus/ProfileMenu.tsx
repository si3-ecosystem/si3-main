"use client";

import { useDispatch } from "react-redux";
import { useDisconnect } from "wagmi";
import { Copy, LogOut } from "lucide-react";

import {
  Menubar,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarShortcut,
  MenubarSeparator,
} from "@/components/atoms/menubar";
import { Profile } from "@/components/organisms/layout/navbar/Profile";

import { resetPush } from "@/redux/slice/pushSlice";
import { resetUser } from "@/redux/slice/userSlice";

import { WalletAddressWithProfile } from "../WalletProfile";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    dispatch(resetPush());
    dispatch(resetUser());

    disconnect();
  };

  return (
    <Menubar className="w-fit rounded-full p-2">
      <MenubarMenu>
        <MenubarTrigger className="rounded-full p-0">
          <Profile />
        </MenubarTrigger>

        <MenubarContent side="bottom" sideOffset={10} align="end">
          <MenubarItem>
            <WalletAddressWithProfile />{" "}
            <MenubarShortcut>
              <Copy size={16} />
            </MenubarShortcut>
          </MenubarItem>

          {/* <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>

          <MenubarItem disabled>New Incognito Window</MenubarItem>

          <MenubarSeparator />

          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub> */}

          <MenubarSeparator />

          <MenubarItem onClick={handleDisconnect} className="cursor-pointer">
            Disconnect{" "}
            <MenubarShortcut>
              <LogOut size={16} />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ProfileMenu;
