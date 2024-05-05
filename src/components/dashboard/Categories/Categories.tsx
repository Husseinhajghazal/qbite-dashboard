"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";
import * as XLSX from "xlsx";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { Category } from "@/types/Category";
import { AnimatePresence } from "framer-motion";
import CategoryEditior from "./CategoryEditior";
import Background from "./Background";
import { changeTextLanguage } from "@/utils/helpers";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { TranslatedProp } from "@/types/Store";
import deleteCategory from "@/services/deleteCategory";
import { signOut, useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import usePending from "@/hooks/usePending";
import getCategoryById from "@/services/getCategoryById";
import { useTranslation } from "react-i18next";

const Categories = ({ categoriesData }: { categoriesData: Category[] }) => {
  const [myCategoriesData, setMyCategoriesData] = useState(categoriesData);
  const session = useSession();
  const languageState = useSelector(
    (state: RootState) => state.language.language
  ) as "en" | "ar";
  const [editiorState, setEditiorState] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [t, i18n] = useTranslation("global");

  const { isPending, mutate } = useMutation({
    mutationFn: (id: string) => deleteCategory(session.data?.user.token!, id),
    onError: (error: any) => {
      if (error.response.status === 401) {
        signOut();
      }
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      let temp = myCategoriesData;
      const id = data.data.data.category.id;
      temp = temp.filter((e) => e.id !== id);
      setMyCategoriesData(temp);
    },
  });

  usePending({ isPending, message: "Trying to perform the operation..." });

  const EditCategory = async (id: string) => {
    let categoryData: Category = await getCategoryById(
      id,
      session.data?.user.token!
    );

    categoryData = {
      id: categoryData.id,
      name: categoryData.name,
      icon: categoryData.icon,
    };

    setCategoryToEdit(categoryData);

    setEditiorState(true);
  };

  const searchInTable = (e: string) => {
    setGlobalFilter(e);
  };

  const columnHelper = createColumnHelper<Category>();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: t("dashboard.categories.table.headers.1"),
    }),
    columnHelper.accessor("icon", {
      cell: (info) => <div className="text-[50px]">{info.getValue()}</div>,
      header: t("dashboard.categories.table.headers.2"),
    }),
    columnHelper.accessor("name", {
      cell: (info) => (
        <span>
          {changeTextLanguage(
            info.getValue() as TranslatedProp,
            languageState,
            info.getValue()?.fallback
          )}
        </span>
      ),
      header: t("dashboard.categories.table.headers.3"),
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <button
          className="duration-300 hover:bg-green-200 p-2 rounded-full"
          type="button"
          onClick={() => EditCategory(info.getValue()!)}
        >
          <MdModeEdit size={22} color="#2f834f" />
        </button>
      ),
      header: t("dashboard.categories.table.headers.4"),
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <button
          className="duration-300 hover:bg-rose-200 p-2 rounded-full"
          type="button"
          onClick={() => mutate(info.getValue()!)}
        >
          <MdDelete size={22} color="red" />
        </button>
      ),
      header: t("dashboard.categories.table.headers.5"),
    }),
  ];

  const table = useReactTable({
    data: myCategoriesData,
    columns,
    state: {
      sorting: sorting,
      globalFilter: globalFilter,
    },
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div
      dir={i18n.language == "ar" ? "rtl" : "ltr"}
      className={`${
        i18n.language == "ar" ? "pr-[84px] pl-4" : "pl-[84px] pr-4"
      } pt-4 bg-[#f9faf5] min-h-screen pb-2 lg:pb-4`}
    >
      <div className="w-full flex justify-between items-center">
        <h1 className="text-5xl w-fit font-semibold text-green-600 bg-green-200 px-4 pt-2 pb-3 rounded-lg">
          {t("dashboard.categories.head")}
        </h1>
        <div className="flex items-center gap-2">
          <div
            className={`p-3 text-green-600 transition-all duration-500 rounded-lg overflow-hidden flex items-center gap-3 ${
              searchMode ? "w-[300px] bg-white" : "w-[50px] bg-transparent"
            }`}
          >
            <GoSearch size={25} onClick={() => setSearchMode(!searchMode)} />
            <input
              type="text"
              className={`border-b w-full transition-all duration-500 bg-transparent outline-none hover:border-green-600 focus:border-green-600 ${
                searchMode ? "block" : "hidden"
              }`}
              onChange={(e) => searchInTable(e.target.value)}
            />
          </div>
          <button
            onClick={() => setEditiorState(!editiorState)}
            className="p-4 bg-green-600 text-white rounded-lg duration-300 hover:bg-green-200 hover:text-green-800"
          >
            <FaPlus size={18} />
          </button>
          <button
            type="button"
            onClick={() => {
              let datas: any = categoriesData?.length ? categoriesData : [];
              datas = datas.map((e: Category) => ({
                id: e.id,
                icon: e.icon,
                name: changeTextLanguage(
                  e.name,
                  languageState,
                  e.name.fallback
                ),
              }));
              const worksheet = XLSX.utils.json_to_sheet(datas);
              const workbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
              XLSX.writeFile(workbook, "allcategories.xlsx");
            }}
            className="bg-white py-3 px-5 border-2 rounded-lg flex gap-2 items-center duration-300 hover:bg-white/60"
          >
            <IoCloudDownloadOutline /> {t("dashboard.categories.button")}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {editiorState && (
          <CategoryEditior
            categoryToEdit={categoryToEdit}
            onClick={() => setEditiorState(!editiorState)}
            setCategoryToEdit={() => setCategoryToEdit(null)}
            myCategoriesData={myCategoriesData}
            setMyCategoriesData={setMyCategoriesData}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {editiorState && (
          <Background
            onClick={() => setEditiorState(!editiorState)}
            setCategoryToEdit={() => setCategoryToEdit(null)}
          />
        )}
      </AnimatePresence>
      <table className="w-full text-start mt-5 cursor-pointer">
        <thead className="border-t border-b border-green-600">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-3 pl-2">
                  <div
                    className="flex items-center transition-all duration-300"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      { asc: <IoMdArrowDropup />, desc: <IoMdArrowDropdown /> }[
                        (header.column.getIsSorted() as string) ?? null
                      ]
                    }
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="border-b border-green-600">
          {table.getRowModel().rows.length
            ? table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-3 pl-2 capitalize">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <div className="flex items-center justify-end mt-2 gap-2 px-2">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="bg-green-600 p-1 text-white rounded-md px-2 disabled:opacity-30"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="bg-green-600 p-1 text-white rounded-md px-2 disabled:opacity-30"
        >
          {">"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 bg-white rounded-md outline-none"
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Categories;
