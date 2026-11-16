import { useQuery } from '@tanstack/react-query';
import { getChiTietBatDongSan } from '../../../api/batDongSanApi';
import useCurrentUser from '../../../hooks/useCurrentUser';

const ID_PATTERN = /^\d+$/;
const NOT_FOUND_STATUSES = [400, 404];
const MAX_RETRIES = 2;
const GUEST_KEY = 'guest';

function isNotFoundError(error) {
  return NOT_FOUND_STATUSES.includes(error?.response?.status);
}

export default function useBatDongSanDetail(id) {
  const { user, isLoading: isUserLoading } = useCurrentUser();
  const isValidId = ID_PATTERN.test(id || '');

  const query = useQuery({
    queryKey: ['batDongSan', 'detail', id, user?.id ?? GUEST_KEY],
    queryFn: () => getChiTietBatDongSan(id),
    enabled: isValidId && !isUserLoading,
    retry: (failureCount, error) => !isNotFoundError(error) && failureCount < MAX_RETRIES,
  });

  return {
    batDongSan: query.data?.data || null,
    isLoading: isValidId && (isUserLoading || query.isLoading),
    isNotFound: !isValidId || isNotFoundError(query.error),
    refetch: query.refetch,
  };
}
