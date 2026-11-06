# Việc cần làm trước khi đưa portfolio lên online

Ghi ngày 06/11/2026. Làm **một lượt khi đã bỏ đủ ảnh Visual Design**, trước khi deploy.

## Vì sao

Ảnh landing của Visual Design rất dài. Một ảnh 2400 × 20977 (FSEL) là khoảng 50 triệu điểm ảnh:

- trình duyệt phải giải nén ra khoảng 200 MB RAM, máy yếu và điện thoại sẽ khựng khi mở, cuộn, zoom;
- Safari trên iPhone giới hạn khoảng 16 triệu điểm ảnh, ảnh lớn hơn bị hạ nét hoặc không hiện;
- 6,9 MB một ảnh, qua 4G mất 2–5 giây.

Hiện trạng (06/11): ảnh xuất JPG rộng 2400px, chất lượng 88, từ PNG gốc trong `image/visual design/`.

| Dự án | File | Cỡ | Dung lượng |
|---|---|---|---|
| FSEL | `assets/work/visual/fsel/1.jpg` | 2400×20977 | 6,9 MB |
| Gốm và mình | `assets/work/visual/gom-va-minh/1.jpg` | 2400×9555 | 2,7 MB |
| Koolkutela | `assets/work/visual/kkla/1.jpg` | 2400×12019 | 3,8 MB |
| Cystack | `assets/work/visual/cystack/1.jpg` | 2400×1927 | 0,6 MB |

## Cần làm

1. **Cắt ảnh dài thành lát** khoảng 2400 × 2400, xếp liền nhau trong cùng một ô (người xem vẫn thấy một ảnh liền). Trình duyệt chỉ tải và giải nén lát đang hiện; zoom chỉ phóng một lát.
   Sửa `js/work.js`: dự án landing nhận danh sách lát thay cho một `file`; zoom (`zoomIn` / `runZoom`) áp lên từng lát.
2. **Đổi sang WebP** (nhẹ hơn JPG khoảng 30–40%, cùng độ nét). README cũng dặn dùng WebP.
3. **Hai cỡ theo màn hình** bằng `srcset`: khoảng 1200px cho điện thoại, 2400px cho máy tính.
4. Làm cho **mọi ảnh Visual Design** đã có lúc đó (cả các dự án còn đang dùng ảnh demo khi đã thay ảnh thật), rồi xoá `DEMO_LANDING` và thư mục `assets/work/visual/_demo/` nếu không còn dự án nào dùng.
5. Thử trên điện thoại thật (iPhone Safari + Android Chrome) và máy yếu: mở, cuộn, zoom.

Mục tiêu: FSEL trên điện thoại còn khoảng 1–1,5 MB, chia nhiều lát nhỏ.

## Ghi chú liên quan

- Zoom tại chỗ (06/11): `ZOOM = 1.6`, `EASE = 0.14` ở đầu phần zoom trong `js/work.js`. `will-change` chỉ bật khi ảnh đang chuyển động để ảnh dừng là nét.
- Branding dùng chung khung bento của Percept (`BRAND_BOARD` trong `js/work.js`), ảnh `01.jpg` … `19.jpg` theo đúng thứ tự ô của Percept. Ảnh Percept rộng 1600px là đủ, không cần cắt.
- Mô tả, thời gian, vai trò của FSEL, Gốm và mình, Cystack, Koolkutela (Visual Design) vẫn là chữ demo.
