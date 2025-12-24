import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { logout, user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className='w-full min-h-screen flex flex-col gap-6 justify-center items-center'>
      <h1 className='font-bold text-5xl'>
        {`${t("welcome")} ${user?.username}`}
      </h1>
      <button
        onClick={logout}
        className='bg-red-600 text-white py-3 px-4 cursor-pointer rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
      >
        {t("logout")}
      </button>
    </div>
  );
}
