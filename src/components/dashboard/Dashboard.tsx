"use client";

import { FaExclamation, FaMoneyBillWave } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import Image from "next/image";
import { useTranslation } from "react-i18next";

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const orders = [
  {
    orderId: "137612",
    mainMealName: "Flafel Extra Shta",
    price: 75,
  },
  {
    orderId: "137612",
    mainMealName: "Flafel Extra Shta",
    price: 110,
  },
  {
    orderId: "137612",
    mainMealName: "Flafel Extra Shta",
    price: 120,
  },
  {
    orderId: "137612",
    mainMealName: "Flafel Extra Shta",
    price: 80,
  },
  {
    orderId: "137612",
    mainMealName: "Flafel Extra Shta",
    price: 150,
  },
  {
    orderId: "137612",
    mainMealName: "Flafel Extra Shta",
    price: 150,
  },
  {
    orderId: "137612",
    mainMealName: "Flafel Extra Shta",
    price: 150,
  },
];

const Dashboard = () => {
  const data = {
    labels: ["Flafel", "Fool", "Hmos", "Fteh", "Msabaha"],
    datasets: [
      {
        label: "Poll",
        data: [10, 23, 13, 18, 7],
        backgroundColor: [
          "#8c78ea",
          "#e5d6fb",
          "#fbd4f5",
          "#fffdc7",
          "#d5e4fa",
        ],
      },
    ],
  };

  const circleData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Poll",
        data: [
          10000, 13500, 8000, 9500, 10000, 13500, 20000, 10000, 13500, 8000,
          9500, 10000,
        ],
        backgroundColor: [
          "#8c78ea",
          "#e5d6fb",
          "#fbd4f5",
          "#fffdc7",
          "#d5e4fa",
          "#8c78ea",
          "#e5d6fb",
          "#fbd4f5",
          "#fffdc7",
          "#d5e4fa",
          "#fffdc7",
          "#d5e4fa",
        ],
      },
    ],
  };

  const barData = {
    labels: ["Mon", "Tue", "Wed", "thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Current Week",
        data: [10000, 13500, 8000, 9500, 10000, 13500, 20000],
        backgroundColor: "#16a34a",
      },
      {
        label: "Last Week",
        data: [10000, 13500, 18000, 1500, 10000, 13500, 10000],
        backgroundColor: "#bbf7d0",
      },
    ],
  };

  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Current Month",
        data: [
          10000, 13500, 8000, 9500, 10000, 13500, 20000, 10000, 13500, 8000,
          9500, 10000,
        ],
        backgroundColor: "#16a34a",
      },
      {
        label: "Last Month",
        data: [
          5000, 2500, 4000, 6500, 3000, 12500, 5000, 10000, 22500, 8000, 4500,
          2000,
        ],
        backgroundColor: "#bbf7d0",
      },
    ],
  };

  const options = {};

  const [t, i18n] = useTranslation("global");

  return (
    <div className="pl-[84px] pt-4 pr-4 bg-[#f9faf5] min-h-screen pb-2 lg:pb-4 flex items-center justify-center md:text-2xl lg:text-3xl">
      {t("dashboard.home.p")}
    </div>
  );

  // return (
  //   <div className="pl-[84px] pt-4 pr-4 bg-[#f9faf5] min-h-screen pb-2 lg:pb-4">
  //     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 mb-2 lg:mb-4">
  //       <div className="bg-white shadow-md rounded-2xl py-3 px-5 h-[40vh] flex flex-col justify-between">
  //         <div className="flex items-center justify-between">
  //           <p className="text-xl font-bold">Summary</p>
  //           <div className="relative rounded-full p-1 bg-gradient-to-tr from-gray-100 to-gray-50 text-gray-400 cursor-pointer group">
  //             <FaExclamation />
  //             <p
  //               className={`absolute w-max right-full rounded-md px-2 py-1 bg-black/40 text-white text-sm invisible opacity-20 translate-x-3 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
  //             >
  //               Summary for main statistics
  //             </p>
  //           </div>
  //         </div>
  //         <div className="flex flex-col gap-2">
  //           <div className="flex items-center justify-between bg-[#d5e4fa] px-3 py-2 rounded-3xl">
  //             <p className="flex items-center gap-2 font-medium text-[#224b93]">
  //               <FaRegCircle size={8} /> Todays Orders
  //             </p>
  //             <span className="text-sm font-medium bg-[#e6effc] text-[#224b93] px-2 py-1 rounded-2xl">
  //               1,552
  //             </span>
  //           </div>
  //           <div className="flex items-center justify-between bg-[#e5d6fb] px-3 py-2 rounded-3xl">
  //             <p className="flex items-center gap-2 font-medium text-[#4d2482]">
  //               <FaRegCircle size={8} /> Todays Visitor
  //             </p>
  //             <span className="text-sm font-medium text-[#4d2482] bg-[#efe6fd] px-2 py-1 rounded-2xl">
  //               320
  //             </span>
  //           </div>
  //           <div className="flex items-center justify-between bg-[#fbd4f5] px-3 py-2 rounded-3xl">
  //             <p className="flex items-center gap-2 font-medium text-[#843886]">
  //               <FaRegCircle size={8} /> Todays Sales
  //             </p>
  //             <span className="text-sm font-medium bg-[#fce4f8] px-2 py-1 rounded-2xl text-[#843886]">
  //               1,552$
  //             </span>
  //           </div>
  //           <div className="flex items-center justify-between bg-[#fffdc7] px-3 py-2 rounded-3xl">
  //             <p className="flex items-center gap-2 font-medium text-[#80723d]">
  //               <FaRegCircle size={8} /> Last Day Sales
  //             </p>
  //             <span className="text-sm font-medium bg-[#fffedb] px-2 py-1 rounded-2xl text-[#80723d]">
  //               2,552$
  //             </span>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="bg-white shadow-md rounded-2xl py-3 px-5 h-[40vh] flex flex-col justify-between">
  //         <div className="flex items-center justify-between">
  //           <p className="text-xl font-bold">Top 5 Meals Sales</p>
  //           <div className="relative rounded-full p-1 bg-gradient-to-tr from-gray-100 to-gray-50 text-gray-400 cursor-pointer group">
  //             <FaExclamation />
  //             <p
  //               className={`absolute w-max right-full rounded-md px-2 py-1 bg-black/40 text-white text-sm invisible opacity-20 translate-x-3 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
  //             >
  //               top 5 meals sales statistics
  //             </p>
  //           </div>
  //         </div>
  //         <div className="w-full max-h-[90%] flex items-center justify-center">
  //           <Doughnut data={data} options={options} />
  //         </div>
  //       </div>
  //       <div className="bg-white shadow-md rounded-2xl py-3 px-5 h-[40vh] col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between">
  //         <div className="flex items-center justify-between">
  //           <p className="text-xl font-bold">Last 7 Orders</p>
  //           <div className="relative rounded-full p-1 bg-gradient-to-tr from-gray-100 to-gray-50 text-gray-400 cursor-pointer group">
  //             <FaExclamation />
  //             <p
  //               className={`absolute w-max right-full rounded-md px-2 py-1 bg-black/40 text-white text-sm invisible opacity-20 translate-x-3 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
  //             >
  //               last orders statistics
  //             </p>
  //           </div>
  //         </div>
  //         <table className="w-full">
  //           <thead>
  //             <tr>
  //               <th className="font-normal text-start text-sm text-gray-300">
  //                 Order Id
  //               </th>
  //               <th className="font-normal text-start text-sm text-gray-300">
  //                 Main Meal Name
  //               </th>
  //               <th className="font-normal text-start text-sm text-gray-300">
  //                 Price
  //               </th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {orders.map((e) => (
  //               <tr key={e.orderId} className="border-t">
  //                 <td className="text-gray-500">{e.orderId.slice(0, 4)}**</td>
  //                 <td className="font-semibold">
  //                   {e.mainMealName.split(" ").slice(0, 2).join(" ")}...
  //                 </td>
  //                 <td
  //                   className={`font-semibold ${
  //                     e.price > 100 ? "text-green-600" : "text-orange-500"
  //                   }`}
  //                 >
  //                   ${e.price}
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //     <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4 mb-2 lg:mb-4">
  //       <div className="bg-[#d5e4fa] shadow-md rounded-2xl py-3 px-5 h-[20vh] flex flex-col justify-between">
  //         <div className="flex justify-between">
  //           <p>Income</p>
  //           <div className="w-12 h-12">
  //             <Image
  //               src="/dashboard-icons/money.png"
  //               alt=""
  //               width={100}
  //               height={100}
  //               className="object-fit"
  //             />
  //           </div>
  //         </div>
  //         <h1 className="text-3xl font-semibold text-[#224b93]">$75,000</h1>
  //         <div>
  //           <p className="mb-1 text-xs">Last Day Income | $139,000</p>
  //           <div className="relative">
  //             <motion.div
  //               initial={{ width: "0%" }}
  //               animate={{
  //                 width: `${Math.round(((139000 - 75000) / 139000) * 100)}%`,
  //               }}
  //               transition={{
  //                 type: "spring",
  //                 damping: 10,
  //                 stiffness: 50,
  //               }}
  //               className={`bg-[#224b93] h-2 rounded-2xl absolute top-0 left-0`}
  //             />
  //             <div className="bg-white w-full h-2 rounded-2xl" />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="bg-[#e5d6fb] shadow-md rounded-2xl py-3 px-5 h-[20vh]">
  //         <div className="flex justify-between">
  //           <p>Orders</p>
  //           <div className="w-12 h-12">
  //             <Image
  //               src="/dashboard-icons/order.png"
  //               alt=""
  //               width={100}
  //               height={100}
  //               className="object-fit"
  //             />
  //           </div>
  //         </div>
  //         <h1 className="text-3xl font-semibold text-[#4d2482]">102</h1>
  //         <div>
  //           <p className="mb-1 text-xs">Last Day Orders | 213</p>
  //           <div className="relative">
  //             <motion.div
  //               initial={{ width: "0%" }}
  //               animate={{
  //                 width: `${Math.round(((213 - 102) / 213) * 100)}%`,
  //               }}
  //               transition={{
  //                 type: "spring",
  //                 damping: 10,
  //                 stiffness: 50,
  //               }}
  //               className={`bg-[#4d2482] h-2 rounded-2xl absolute top-0 left-0`}
  //             />
  //             <div className="bg-white w-full h-2 rounded-2xl" />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="bg-[#fbd4f5] shadow-md rounded-2xl py-3 px-5 h-[20vh]">
  //         <div className="flex justify-between">
  //           <p>Visitors</p>
  //           <div className="w-12 h-12">
  //             <Image
  //               src="/logo/8.png"
  //               alt=""
  //               width={100}
  //               height={100}
  //               className="object-fit"
  //             />
  //           </div>
  //         </div>
  //         <h1 className="text-3xl font-semibold text-[#843886]">2033</h1>
  //         <div>
  //           <p className="mb-1 text-xs">Last Day Visitors | 1903</p>
  //           <div className="relative">
  //             <motion.div
  //               initial={{ width: "0%" }}
  //               animate={{
  //                 width: `${Math.round(((503 - 349) / 503) * 100)}%`,
  //               }}
  //               transition={{
  //                 type: "spring",
  //                 damping: 10,
  //                 stiffness: 50,
  //               }}
  //               className={`bg-[#843886] h-2 rounded-2xl absolute top-0 left-0`}
  //             />
  //             <div className="bg-white w-full h-2 rounded-2xl" />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="bg-[#fffdc7] shadow-md rounded-2xl py-3 px-5 h-[20vh]">
  //         <div className="flex justify-between">
  //           <p>Stars</p>
  //           <div className="w-12 h-12">
  //             <Image
  //               src="/dashboard-icons/star.png"
  //               alt=""
  //               width={100}
  //               height={100}
  //               className="object-fit"
  //             />
  //           </div>
  //         </div>
  //         <h1 className="text-3xl font-semibold text-[#80723d]">503</h1>
  //         <div>
  //           <p className="mb-1 text-xs">Last Day Stars | 1046</p>
  //           <div className="relative">
  //             <motion.div
  //               initial={{ width: "0%" }}
  //               animate={{
  //                 width: `${Math.round(((1046 - 503) / 1046) * 100)}%`,
  //               }}
  //               transition={{
  //                 type: "spring",
  //                 damping: 10,
  //                 stiffness: 50,
  //               }}
  //               className={`bg-[#80723d] h-2 rounded-2xl absolute top-0 left-0`}
  //             />
  //             <div className="bg-white w-full h-2 rounded-2xl" />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="bg-green-200 shadow-md rounded-2xl py-3 px-5 h-[20vh] col-span-1 sm:col-span-2 lg:col-span-1">
  //         <div className="flex justify-between">
  //           <p>Clients</p>
  //           <div className="w-12 h-12">
  //             <Image
  //               src="/dashboard-icons/client.png"
  //               alt=""
  //               width={100}
  //               height={100}
  //               className="object-fit"
  //             />
  //           </div>
  //         </div>
  //         <h1 className="text-3xl font-semibold text-green-600">349</h1>
  //         <div>
  //           <p className="mb-1 text-xs">Last Day Client | 803</p>
  //           <div className="relative">
  //             <motion.div
  //               initial={{ width: "0%" }}
  //               animate={{
  //                 width: `${Math.round(((803 - 349) / 803) * 100)}%`,
  //               }}
  //               transition={{
  //                 type: "spring",
  //                 damping: 10,
  //                 stiffness: 50,
  //               }}
  //               className={`bg-green-600 h-2 rounded-2xl absolute top-0 left-0`}
  //             />
  //             <div className="bg-white w-full h-2 rounded-2xl" />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="md:grid lg:grid-cols-2 gap-2 lg:gap-4 hidden">
  //       <div className="bg-white shadow-md rounded-2xl py-3 px-5 h-[30vh] flex flex-col md:flex-row">
  //         <div className="md:w-7/12">
  //           <Bar data={barData} options={options} />
  //         </div>
  //         <div className="p-2 md:p-5 md:w-5/12 flex flex-col justify-between">
  //           <div className="flex items-center gap-2">
  //             <FaMoneyBillWave color="#16a34a" />
  //             <p>This Week Profit :</p>
  //             <span className="text-lg font-semibold">$75,500</span>
  //           </div>
  //           <div className="flex items-center gap-2">
  //             <FaMoneyBillWave color="#bbf7d0" />
  //             <p>Last Week Profit :</p>
  //             <span className="text-lg font-semibold">$125,500</span>
  //           </div>
  //           <div className="flex items-center gap-2">
  //             <FaMoneyBillWave color="#16a34a" />
  //             <p>This Month Profit :</p>
  //             <span className="text-lg font-semibold">$75,500</span>
  //           </div>
  //           <div className="flex items-center gap-2">
  //             <FaMoneyBillWave color="#bbf7d0" />
  //             <p>Last Month Profit :</p>
  //             <span className="text-lg font-semibold">$125,500</span>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="bg-white shadow-md rounded-2xl py-3 px-5 h-[30vh] flex justify-evenly">
  //         <Line data={lineData} options={options} />
  //         <Doughnut options={options} data={circleData} />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Dashboard;
