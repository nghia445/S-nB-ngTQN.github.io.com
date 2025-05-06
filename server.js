const express = require("express"); // thư viện tạo server
const app = express(); // khởi tạo ứng dụng express
const PORT = 3000; // cỗng
const path = require("path"); // đường dẫn tệp
const fs = require("fs"); // đọc và ghi file

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // giúp express hiểu các file html,...

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "datsan.html")); // gửi file khi ngta truy cập
});

app.post("/api/dat-san", (req, res) => {
  const { ten, loaiSan, soGio, ngay, gioBatDau } = req.body; // nhận thog6 tin từ ngta
  const donGia = bangGia[loaiSan];
  const { tongTien, thongBao } = tinhTienThue(soGio, donGia);
  const ca = xacDinhCa(soGio);
  const thoiGianBatDau = tinhThoiGianBatDau(ngay, gioBatDau);
  const thoiGianKetThuc = tinhThoiGianKetThuc(thoiGianBatDau, soGio);
  // tạo chỗ lưu trữ thông tin
  const thongTinLuuTru = {
    ten,
    loaiSan: `Sân ${loaiSan} người`,
    donGia: donGia + "k/h",
    soGio,
    tongTien: tongTien + "k",
    thongBao,
    ca,
    gioBatDau: thoiGianBatDau.toLocaleString(),
    gioKetThuc: thoiGianKetThuc.toLocaleString(),
    ngayDat: new Date().toLocaleString(),
  };
  // đọc file và ghi đè nếu có
  const filePath = path.join(__dirname, "danh_sach_dat_san.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    let danhSach = [];
    if (!err && data) {
      try {
        danhSach = JSON.parse(data);
      } catch (parseError) {
        console.error("Lỗi khi parse file JSON:", parseError);
      }
    }
    danhSach.push(thongTinLuuTru);
    fs.writeFile(
      filePath,
      JSON.stringify(danhSach, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error("Lỗi khi ghi vào file JSON:", writeErr);
        }
      }
    );
  });

  res.json({
    message: "Đặt sân thành công! Thông tin đã được gửi đến quản lý.",
  }); // Thông báo đơn giản cho người dùng
});

// API endpoint để lấy danh sách đặt sân cho trang quản lý
app.get("/admin/danh-sach", (req, res) => {
  const filePath = path.join(__dirname, "danh_sach_dat_san.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Lỗi khi đọc file JSON:", err);
      return res.status(500).json({ error: "Lỗi khi tải danh sách đặt sân." });
    }
    try {
      const danhSach = JSON.parse(data);
      res.json(danhSach);
    } catch (parseError) {
      console.error("Lỗi khi parse file JSON:", parseError);
      return res.status(500).json({ error: "Lỗi khi xử lý dữ liệu đặt sân." });
    }
  });
});

function tinhTienThue(soGio, donGia) {
  let tongTien = soGio * donGia;
  let thongBao = "";
  if (soGio >= 3) {
    tongTien *= 0.9;
    thongBao = "Bạn được giảm giá 10%";
  } else {
    thongBao = "Thuê dưới 3 giờ không được giảm giá.";
  }
  return { tongTien, thongBao };
}

function xacDinhCa(soGio) {
  let ca = "";
  switch (true) {
    case soGio <= 1:
      ca = "Ca sáng";
      break;
    case soGio <= 3:
      ca = "Ca chiều";
      break;
    default:
      ca = "Ca tối";
  }
  return ca;
}

function tinhThoiGianBatDau(ngay, gioBatDau) {
  const [year, month, day] = ngay.split("-").map(Number);
  const [gio, phut] = gioBatDau.split(":").map(Number);
  return new Date(year, month - 1, day, gio, phut);
}

function tinhThoiGianKetThuc(thoiGianBatDau, soGio) {
  return new Date(thoiGianBatDau.getTime() + soGio * 60 * 60 * 1000);
}

const bangGia = {
  5: 100,
  7: 150,
  9: 200,
  12: 250,
};

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
