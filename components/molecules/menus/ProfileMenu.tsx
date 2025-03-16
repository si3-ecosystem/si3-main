"use client";

import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { Copy, LogOut, SendHorizonal } from "lucide-react";

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

import { WalletAddressWithProfile } from "../WalletProfile";

{
  /* <script defer>(function ({ ...args }) {
    var p = document.createElement('script');
    p.src = 'https://cdn-email.ethermail.io/sdk/v2/ethermail.js';
    document.body.appendChild(p);
    p.setAttribute('a', args.afid);
    p.setAttribute('b', args.communityAlias);
    p.setAttribute('c', args.features);
  })({
    afid: '67353ab1f14dc512c8f225ef',
    communityAlias: 'si3',
    features: ['subscribe']
  });
  </script>
  <ethermail-subscribe widget="677f0f8f690e56d4d9800180" theme='light' input='auto' wallet-connect-project-id="[YOUR_WALLET_CONNECT_PROJECT_ID]" rpc='{"http": "[YOUR_RPC_URL]"}'></ethermail-subscribe> */
}

const ProfileMenu = () => {
  const router = useRouter();

  const { status } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Menubar className="w-fit rounded-full p-2">
      <MenubarMenu>
        <MenubarTrigger className="rounded-full p-0">
          <Profile />
        </MenubarTrigger>

        {status === "connected" ? (
          <MenubarContent>
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

            <MenubarItem
              onClick={() => disconnect()}
              className="cursor-pointer"
            >
              Disconnect{" "}
              <MenubarShortcut>
                <LogOut size={16} />
              </MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        ) : (
          <MenubarContent>
            <MenubarItem
              onClick={() => router.push("/login")}
              className="cursor-pointer"
            >
              Login
              <MenubarShortcut>
                <SendHorizonal size={16} />
              </MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  );
};

export default ProfileMenu;
