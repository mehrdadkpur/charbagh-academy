'use client';

type StatusBadgeProps = {
  status: string;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let bgColor = '';
  let statusText = '';

  switch (status) {
    case 'ACTIVE':
      bgColor = 'bg-green-500';
      statusText = 'فعال';
      break;
    case 'DEACTIVE':
      bgColor = 'bg-red-500';
      statusText = 'غیرفعال';
      break;
    case 'SUSPENDED':
      bgColor = 'bg-yellow-500';
      statusText = 'معلق';
      break;
    case 'PENDING':
      bgColor = 'bg-blue-500';
      statusText = 'در انتظار تایید';
      break;
    default:
      bgColor = 'bg-gray-500';
      statusText = 'نامشخص';
  }

  return (
    <div className="flex items-center">
      <div className={`h-2.5 w-2.5 rounded-full ${bgColor} ml-2`}></div>
      <span>{statusText}</span>
    </div>
  );
};

export default StatusBadge;
