import { useQuery } from '@tanstack/react-query';
import { getDanhSachHuongDan } from '../../../api/hoTroApi';
import { DANH_SACH_HUONG_DAN } from '../constants/supportData';

const ICON_MAP = {
  'tai-khoan': 'user',
  'lap-hop-dong': 'document',
  'doi-mat-khau': 'lock',
  'giao-dich': 'giao-dich',
};

function parseNoiDungToSteps(noiDung) {
  if (!noiDung) return [];
  return noiDung
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(\d+\.\s*)?([^:]+)(:\s*)(.*)$/);
      if (match) {
        return {
          tieuDeBuoc: match[2].trim(),
          noiDung: match[4].trim(),
        };
      }
      return {
        tieuDeBuoc: 'Hướng dẫn',
        noiDung: line.replace(/^\d+\.\s*/, ''),
      };
    });
}

function mergeWithFallback(serverList) {
  if (!Array.isArray(serverList) || serverList.length === 0) {
    return DANH_SACH_HUONG_DAN;
  }

  return serverList.map((serverItem) => {
    const key = serverItem.maHuongDan;
    const fallback = DANH_SACH_HUONG_DAN.find((item) => item.maHuongDan === key || item.id === key);

    const cacBuoc =
      fallback?.cacBuoc && fallback.cacBuoc.length > 0
        ? fallback.cacBuoc
        : parseNoiDungToSteps(serverItem.noiDung);

    return {
      id: serverItem.maHuongDan || fallback?.id,
      maHuongDan: serverItem.maHuongDan || fallback?.maHuongDan,
      tieuDe: serverItem.tieuDe || fallback?.tieuDe,
      moTa: serverItem.moTa || fallback?.moTa,
      icon: ICON_MAP[key] || fallback?.icon || 'document',
      duongDan: serverItem.duongDan || fallback?.duongDan,
      cacBuoc,
    };
  });
}

export default function useDanhSachHuongDan() {
  const query = useQuery({
    queryKey: ['ho-tro', 'danh-sach'],
    queryFn: async () => {
      const res = await getDanhSachHuongDan();
      return res?.data || [];
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const danhSach =
    query.data && query.data.length > 0 ? mergeWithFallback(query.data) : DANH_SACH_HUONG_DAN;

  return {
    ...query,
    danhSach,
  };
}
