import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import authService from "../appwrite/auth";
import service from "../appwrite/config";

export default function History() {
  const location = useLocation();
  const pathname = location.pathname;
  const current_slug = pathname.substring(pathname.lastIndexOf("/") + 1);
  const addHistory = async () => {
    const current_user = await authService.getCurrentUser();
    await service.createUserHistory(current_user.$id, { slug: current_slug });
  };
  useEffect(() => {
    addHistory();
  }, [current_slug]);

  return <></>;
}
