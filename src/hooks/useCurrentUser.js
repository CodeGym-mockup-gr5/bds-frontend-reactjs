import { ROLES } from '../utils/auth';
import useAuth from './useAuth';

export default function useCurrentUser() {
  const { user, isAuthLoading, hasRole } = useAuth();

  return {
    user,
    isLoading: isAuthLoading,
    isAdmin: hasRole([ROLES.ADMIN]),
    isNoiBo: hasRole([ROLES.ADMIN, ROLES.NHAN_VIEN]),
  };
}
