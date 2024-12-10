"use client";
import { ProtectedRoutes, UnprotectedRoutes } from "@/utils/Protectedpage";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
const ProtectedRouting = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const role = session?.user?.role;
  const protecte = ProtectedRoutes[role];

  useEffect(() => {
    if (status === "Loading...") return;
    if (session) {
      if (protecte !== undefined) {
        if (!protecte?.includes(pathname)) {
          router?.replace(UnprotectedRoutes[1]);
        }
      }
    } else {
      if (!UnprotectedRoutes?.includes(pathname)) {
        router?.replace(UnprotectedRoutes[1]);
      }
    }
  },[protecte,pathname,router]);
};

export default ProtectedRouting;
