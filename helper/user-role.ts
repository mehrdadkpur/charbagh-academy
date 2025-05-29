import { Role } from "@prisma/client";

export const getStatusDisplayText = (role: Role): string => {
    switch (role) {
      case Role.ADMIN:
        return 'مدیر سایت';
      case Role.TEACHER:
        return 'مدرس';
        case Role.STUDENT:
            return 'هنرآموز';
        case Role.GUEST:
            return 'مهمان'
      default:
        return role;
    }
  };