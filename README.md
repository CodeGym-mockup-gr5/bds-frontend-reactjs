# BĐS Frontend (ReactJS)

Frontend hệ thống quản lý trung tâm môi giới bất động sản REALIA (Vite + React).

## Yêu cầu

- Node.js 20.19+ hoặc 22.12+ (theo yêu cầu của Vite 8)
- npm

## Cài đặt

```bash
npm install
cp .env.example .env
```

Sửa `VITE_API_BASE_URL` trong `.env` theo địa chỉ backend.

## Lệnh

| Lệnh | Mô tả |
| --- | --- |
| `npm run dev` | Chạy môi trường dev tại `http://localhost:5173` |
| `npm run lint` | Kiểm tra code bằng ESLint (Airbnb) |
| `npm run format` | Định dạng code bằng Prettier |
| `npm run build` | Build production vào thư mục `dist` |
| `npm run preview` | Xem thử bản build |
