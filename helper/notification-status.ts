import { Status } from "@prisma/client";

export const getStatusDisplayText = (status: Status): string => {
    switch (status) {
      case Status.DEACTIVE:
        return 'مشاوره شد';
      case Status.PENDING:
        return 'در انتظار';
      default:
        return status;
    }
  };