import React from 'react';

type Role = 'TEACHER' | 'STUDENT' | 'ADMIN' | 'GUEST';

interface UserRoleProps {
  role: Role | string;
  className?: string;
}

const UserRole: React.FC<UserRoleProps> = ({ role, className = '' }) => {
  const getRoleName = (role: string): string => {
    switch (role) {
      case 'TEACHER':
        return 'مدرس';
      case 'STUDENT':
        return 'هنرآموز';
      case 'ADMIN':
        return 'مدیر';
        case 'GUESR':
          return 'مهمان'
      default:
        return 'کاربر';
    }
  };

  const getRoleColor = (role: string): string => {
    switch (role) {
      case 'TEACHER':
        return 'text-blue-600 bg-blue-100';
      case 'STUDENT':
        return 'text-green-600 bg-green-100';
      case 'ADMIN':
        return 'text-purple-600 bg-purple-100';
        case 'GUEST':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(role)} ${className}`}>
      {getRoleName(role)}
    </span>
  );
};

export default UserRole;
