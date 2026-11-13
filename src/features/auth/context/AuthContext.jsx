import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe, login as loginApi, logout as logoutApi } from '../../../api/authApi';
import {
  ROLES,
  extractUserFromMeResponse,
  getToken,
  hasAnyRole,
  normalizeAuthPayload,
  removeToken,
  setToken,
} from '../../../utils/auth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [token, setTokenState] = useState(() => getToken());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [postLoginRedirect, setPostLoginRedirect] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });

  const meQuery = useQuery({
    queryKey: ['authMe', token],
    queryFn: getMe,
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    if (token && meQuery.isError) {
      removeToken();
      setTokenState(null);
      queryClient.removeQueries({ queryKey: ['authMe'] });
    }
  }, [token, meQuery.isError, queryClient]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ isOpen: true, message, type });
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const loginMutation = useMutation({
    mutationFn: loginApi,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
  });

  const openLoginModal = useCallback(
    (redirectPath = null) => {
      if (location.pathname === '/dang-nhap') {
        return;
      }
      setPostLoginRedirect(typeof redirectPath === 'string' ? redirectPath : null);
      setIsLoginModalOpen(true);
    },
    [location.pathname],
  );

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
    setPostLoginRedirect(null);
  }, []);

  const openLogoutModal = useCallback(() => {
    setIsLogoutModalOpen(true);
  }, []);

  const closeLogoutModal = useCallback(() => {
    if (logoutMutation.isPending) {
      return;
    }
    setIsLogoutModalOpen(false);
  }, [logoutMutation.isPending]);

  const handleLoginSuccess = useCallback(
    (apiResponse, explicitRedirect = null) => {
      const { token: newToken, user: normalizedUser, message } = normalizeAuthPayload(apiResponse);

      if (newToken) {
        setToken(newToken);
        setTokenState(newToken);
        if (normalizedUser) {
          queryClient.setQueryData(['authMe', newToken], { success: true, data: normalizedUser });
        }
      }

      const targetRedirect = postLoginRedirect || explicitRedirect;

      setIsLoginModalOpen(false);
      setPostLoginRedirect(null);
      showToast(message || 'Đăng nhập thành công', 'success');

      if (hasAnyRole(normalizedUser, [ROLES.ADMIN])) {
        navigate('/admin', { replace: true });
      } else if (hasAnyRole(normalizedUser, [ROLES.NHAN_VIEN])) {
        navigate('/nhan-vien', { replace: true });
      } else if (targetRedirect) {
        navigate(targetRedirect, { replace: true });
      }
    },
    [navigate, postLoginRedirect, queryClient, showToast],
  );

  const confirmLogout = useCallback(() => {
    logoutMutation.mutate(undefined, {
      onSuccess: (responseData) => {
        removeToken();
        setTokenState(null);
        queryClient.clear();
        setIsLogoutModalOpen(false);
        showToast(responseData?.message || 'Đăng xuất thành công', 'success');
        navigate('/', { replace: true });
      },
      onError: (error) => {
        setIsLogoutModalOpen(false);
        showToast(
          error?.response?.data?.message || 'Không thể đăng xuất lúc này. Vui lòng thử lại.',
          'error',
        );
      },
    });
  }, [logoutMutation, navigate, queryClient, showToast]);

  const user = useMemo(() => extractUserFromMeResponse(meQuery.data), [meQuery.data]);
  const isLoggedIn = Boolean(token && !meQuery.isError);
  const isAuthLoading = Boolean(token && meQuery.isLoading);
  const isSellerStatusLoading = isAuthLoading;
  const isSellerStatusError = Boolean(token && meQuery.isError);

  const hasRole = useCallback((allowedRoles) => hasAnyRole(user, allowedRoles), [user]);
  const isAdmin = hasAnyRole(user, [ROLES.ADMIN]);
  const isNhanVien = hasAnyRole(user, [ROLES.NHAN_VIEN]);
  const isKhachHang = hasAnyRole(user, [ROLES.KHACH_HANG]);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoggedIn,
      isAuthLoading,
      isSellerStatusLoading,
      isSellerStatusError,
      refetchMe: meQuery.refetch,
      isAdmin,
      isNhanVien,
      isKhachHang,
      hasRole,
      loginMutation,
      logoutMutation,
      handleLoginSuccess,
      isLoginModalOpen,
      openLoginModal,
      closeLoginModal,
      isLogoutModalOpen,
      openLogoutModal,
      closeLogoutModal,
      confirmLogout,
      toast,
      closeToast,
      showAuthToast: showToast,
    }),
    [
      user,
      token,
      isLoggedIn,
      isAuthLoading,
      isSellerStatusLoading,
      isSellerStatusError,
      meQuery.refetch,
      isAdmin,
      isNhanVien,
      isKhachHang,
      hasRole,
      loginMutation,
      logoutMutation,
      handleLoginSuccess,
      isLoginModalOpen,
      openLoginModal,
      closeLoginModal,
      isLogoutModalOpen,
      openLogoutModal,
      closeLogoutModal,
      confirmLogout,
      toast,
      closeToast,
      showToast,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
