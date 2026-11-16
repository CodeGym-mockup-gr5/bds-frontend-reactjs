export const THONG_TIN_TRANG = {
  tieuDe: 'Trung tâm hỗ trợ',
  moTa: 'Tìm hiểu cách sử dụng hệ thống.',
};

export const DANH_SACH_HUONG_DAN = [
  {
    id: 'tai-khoan',
    maHuongDan: 'tai-khoan',
    tieuDe: 'Hướng dẫn sử dụng tài khoản',
    moTa: 'Tìm hiểu cách đăng nhập và quản lý thông tin tài khoản.',
    icon: 'user',
    cacBuoc: [
      {
        tieuDeBuoc: 'Đăng nhập vào hệ thống',
        noiDung:
          'Nhập tên đăng nhập hoặc email và mật khẩu được cấp trên form Đăng nhập tại Header hoặc đường dẫn /dang-nhap.',
      },
      {
        tieuDeBuoc: 'Quản lý thông tin cá nhân',
        noiDung:
          'Bấm vào khung đại diện tài khoản ở góc trên bên phải để vào trang Thông tin cá nhân, kiểm tra và chỉnh sửa hồ sơ.',
      },
      {
        tieuDeBuoc: 'Yêu cầu quyền đăng tin bán',
        noiDung:
          'Khách hàng có nhu cầu đăng bán bất động sản có thể gửi yêu cầu xác thực tài khoản để được Quản trị viên duyệt quyền đăng tin.',
      },
      {
        tieuDeBuoc: 'Đăng xuất an toàn',
        noiDung:
          'Sau khi hoàn tất phiên làm việc, mở Menu tài khoản và chọn "Đăng xuất" để bảo vệ an toàn cho tài khoản.',
      },
    ],
  },
  {
    id: 'lap-hop-dong',
    maHuongDan: 'lap-hop-dong',
    tieuDe: 'Hướng dẫn lập hợp đồng',
    moTa: 'Các bước chuẩn bị thông tin và lập hợp đồng trên hệ thống.',
    icon: 'document',
    cacBuoc: [
      {
        tieuDeBuoc: 'Chuẩn bị hồ sơ pháp lý',
        noiDung:
          'Kiểm tra giấy chứng nhận quyền sử dụng đất, căn cước công dân của các bên và các chứng từ liên quan trước khi lập hợp đồng.',
      },
      {
        tieuDeBuoc: 'Khởi tạo giao dịch mới',
        noiDung:
          'Nhân viên phụ trách vào phân hệ Giao dịch, chọn bất động sản giao dịch và thông tin khách hàng mua/bán tương ứng.',
      },
      {
        tieuDeBuoc: 'Điền thông tin và điều khoản',
        noiDung:
          'Nhập giá trị chuyển nhượng, phương thức thanh toán, tiến độ bàn giao và các cam kết ràng buộc giữa các bên.',
      },
      {
        tieuDeBuoc: 'Rà soát và xuất biểu mẫu',
        noiDung:
          'Kiểm tra kỹ các điều khoản hợp đồng trên bản xem trước, sau đó xuất file biểu mẫu in ấn để các bên tiến hành ký kết.',
      },
    ],
  },
  {
    id: 'doi-mat-khau',
    maHuongDan: 'doi-mat-khau',
    tieuDe: 'Hướng dẫn đổi mật khẩu',
    moTa: 'Thay đổi mật khẩu để bảo vệ tài khoản của bạn.',
    icon: 'lock',
    cacBuoc: [
      {
        tieuDeBuoc: 'Truy cập trang Đổi mật khẩu',
        noiDung:
          'Mở Menu tài khoản ở Header và chọn mục "Đổi mật khẩu" (hoặc điều hướng đến đường dẫn /doi-mat-khau).',
      },
      {
        tieuDeBuoc: 'Xác thực mật khẩu hiện tại',
        noiDung:
          'Nhập chính xác mật khẩu bạn đang sử dụng vào ô "Mật khẩu hiện tại" để xác thực chủ tài khoản.',
      },
      {
        tieuDeBuoc: 'Thiết lập mật khẩu mới',
        noiDung:
          'Mật khẩu mới từ 6 đến 32 ký tự, không được chứa khoảng trắng và không trùng mật khẩu cũ.',
      },
      {
        tieuDeBuoc: 'Xác nhận và lưu thay đổi',
        noiDung:
          'Nhập lại mật khẩu mới vào ô "Xác nhận mật khẩu mới", sau đó bấm nút "Lưu thay đổi" để cập nhật mật khẩu.',
      },
    ],
  },
  {
    id: 'giao-dich',
    maHuongDan: 'giao-dich',
    tieuDe: 'Hướng dẫn giao dịch với khách hàng',
    moTa: 'Tìm hiểu quy trình trao đổi và giao dịch với khách hàng.',
    icon: 'giao-dich',
    cacBuoc: [
      {
        tieuDeBuoc: 'Tiếp nhận và phân tích nhu cầu',
        noiDung:
          'Lắng nghe tiêu chí của khách hàng về vị trí, khoảng giá, diện tích và loại hình bất động sản để tư vấn sản phẩm thích hợp.',
      },
      {
        tieuDeBuoc: 'Tổ chức xem bất động sản thực tế',
        noiDung:
          'Đặt lịch hẹn dẫn khách xem thực địa nhà đất, giới thiệu chi tiết pháp lý, tiện ích khu vực và hiện trạng tài sản.',
      },
      {
        tieuDeBuoc: 'Hỗ trợ đàm phán và thương lượng',
        noiDung:
          'Làm cầu nối minh bạch giúp bên mua và bên bán thống nhất mức giá, thời hạn thanh toán và điều kiện bàn giao.',
      },
      {
        tieuDeBuoc: 'Hỗ trợ đặt cọc và công chứng',
        noiDung:
          'Hướng dẫn lập biên bản đặt cọc, chuẩn bị hồ sơ tại văn phòng công chứng và thực hiện thủ tục sang tên sổ đỏ an toàn.',
      },
    ],
  },
];
