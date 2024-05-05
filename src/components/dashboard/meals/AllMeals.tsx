"use client";

import { FaPlus } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { MdDelete, MdModeEdit } from "react-icons/md";
import Image from "next/image";
import { useState } from "react";
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
import { Meals } from "@/types/Meals";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import usePending from "@/hooks/usePending";
import { signOut, useSession } from "next-auth/react";
import deleteMeal from "@/services/deleteMeal";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { changeTextLanguage, mergeCurrency } from "@/utils/helpers";
import { TranslatedProp } from "@/types/Store";
import { Currency } from "@/types/Currency";
import { useTranslation } from "react-i18next";

const AllMeals = ({
  MealsData,
  Currencies,
}: {
  MealsData: Meals[];
  Currencies: Currency[];
}) => {
  const session = useSession();

  const router = useRouter();
  const [myMealsData, setMyMealsData] = useState(MealsData);
  const languageState = useSelector(
    (state: RootState) => state.language.language
  ) as "en" | "ar";
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [t, i18n] = useTranslation("global");

  const { isPending, mutate } = useMutation({
    mutationFn: (id: string) => deleteMeal(session.data?.user.token!, id),
    onError: (error: any) => {
      if (error.response.status === 401) {
        signOut();
      }
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      let temp = myMealsData;
      const id = data.data.data.product.id;
      temp = temp.filter((e) => e.id !== id);
      setMyMealsData(temp);
    },
  });

  usePending({ isPending, message: "Trying to perform the operation..." });

  const EditMeal = (id: string) => {
    router.push(`/dashboard/meals/edit/${id}`);
  };

  const searchInTable = (e: string) => {
    setGlobalFilter(e);
  };

  const [searchMode, setSearchMode] = useState(false);

  const columnHelper = createColumnHelper<Meals>();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: t("dashboard.meals.table.headers.1"),
    }),
    columnHelper.accessor("images", {
      cell: (info) => (
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_URL + info.getValue()[0].imageURL}
          alt="..."
          width={200}
          height={200}
          className="rounded-full object-cover w-[50px] h-[50px]"
        />
      ),
      header: t("dashboard.meals.table.headers.2"),
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
      header: t("dashboard.meals.table.headers.3"),
    }),
    columnHelper.accessor("category", {
      cell: (info) => (
        <span>
          {changeTextLanguage(
            info.getValue().name as TranslatedProp,
            languageState,
            info.getValue().name.fallback
          )}
        </span>
      ),
      header: t("dashboard.meals.table.headers.4"),
    }),
    columnHelper.accessor("prices", {
      cell: (info) => (
        <span className="bg-green-200 w-fit px-3 py-[2px] text-green-900 rounded-md">
          {mergeCurrency(info.getValue()[0], Currencies)}
        </span>
      ),
      header: t("dashboard.meals.table.headers.5"),
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <span className="flex items-center gap-3 pl-3">
          <button
            className="duration-300 hover:bg-rose-200 p-2 rounded-full"
            type="button"
            onClick={() => mutate(info.getValue())}
          >
            <MdDelete size={22} color="red" />
          </button>
          <button
            className="duration-300 hover:bg-green-200 p-2 rounded-full"
            type="button"
            onClick={() => EditMeal(info.getValue())}
          >
            <MdModeEdit size={22} color="#2f834f" />
          </button>
        </span>
      ),
      header: t("dashboard.meals.table.headers.6"),
    }),
  ];

  const table = useReactTable({
    data: myMealsData,
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
        i18n.language == "ar" ? "pr-[104px] pl-[36px]" : "pl-[104px] pr-[36px]"
      } pt-4 bg-[#f9faf5] min-h-screen pb-2 lg:pb-4 overflow-scroll`}
    >
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xl md:text-3xl lg:text-5xl w-fit font-semibold text-green-600 bg-green-200 px-4 py-2 rounded-lg">
          {t("dashboard.meals.head")}
        </h1>
        <div className="flex items-center gap-2">
          <div
            className={`p-3 text-green-600 transition-all duration-500 rounded-lg overflow-hidden hidden md:flex items-center gap-3 ${
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
            onClick={() => router.push("/dashboard/meals/create")}
            className="p-4 bg-green-600 text-white rounded-lg duration-300 hover:bg-green-200 hover:text-green-800"
          >
            <FaPlus size={18} />
          </button>
          <button
            type="button"
            onClick={() => {
              let data: any = MealsData?.length ? MealsData : [];
              data = data.map((e: any) => ({
                id: e.id,
                images: e.images[0].imageURL,
                prices: e.prices[0].price + " ₺",
                name: changeTextLanguage(
                  e.name,
                  languageState,
                  e.name.fallback
                ),
                category: changeTextLanguage(
                  e.category.name,
                  languageState,
                  e.category.name.fallback
                ),
              }));
              const worksheet = XLSX.utils.json_to_sheet(data);
              const workbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
              XLSX.writeFile(workbook, "allmeals.xlsx");
            }}
            className="bg-white py-3 px-5 border-2 rounded-lg hidden md:flex gap-2 items-center duration-300 hover:bg-white/60"
          >
            <IoCloudDownloadOutline /> {t("dashboard.meals.button")}
          </button>
        </div>
      </div>
      <table className="min-w-[500px] w-full text-start mt-5 cursor-pointer">
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
      <div className="min-w-[500px] w-full flex items-center justify-end mt-2 gap-2 px-2">
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

export default AllMeals;
