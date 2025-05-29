interface StatCardProps {
    title: string
    count: number
    icon: React.ReactNode
  }
  
  const StatCard = ({ title, count, icon }: StatCardProps) => {
    return(
    <div className="w-60 h-36 flex gap-x-5 justify-center items-center rounded-[20px] bg-white dark:bg-gray-700 bg-clip-border shadow-xl p-3">
      <div className="flex justify-between items-center flex-col gap-y-1 ">
        <span className="text-slate-500 font-DanaMedium text-sm dark:text-gray-50">{title}</span>
        <span className="text-slate-500 font-DanaDemiBold text-3xl dark:text-gray-50">{count}</span>
      </div>
      <span className="bg-slate-200 dark:bg-gray-700 rounded-full p-2">
        {icon}
      </span>
    </div>
  )}
  export default StatCard;
  