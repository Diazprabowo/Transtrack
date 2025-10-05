# 🚛 TransTrack - Sistem Monitoring Pekerjaan Teknisi

**Sistem Informasi Monitoring Pekerjaan Teknisi Berbasis Web untuk PT. TransTrack**

Aplikasi web modern untuk mengelola dan memonitor pekerjaan teknisi lapangan dengan fitur lengkap multi-role dashboard, manajemen tiket, inventory tracking, dan pelaporan komprehensif.

![TransTrack Dashboard](https://img.shields.io/badge/Status-Production%20Ready-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 🌟 Fitur Utama

### 🔐 Sistem Autentikasi Multi-Role
- **Admin**: Full access ke semua modul dan user management
- **Support**: Manajemen tiket dan assignment teknisi
- **Teknisi**: Dashboard personal dan update status pekerjaan
- Register mandiri, forgot password, dan session management
- Remember me dan audit log aktivitas

### 📊 Dashboard Terintegrasi
- **Dashboard Teknisi**: Ringkasan tiket personal, quick actions
- **Dashboard Admin/Support**: KPI overview, analytics, grafik performa
- Real-time notifications dan alerts
- Activity feed dan status monitoring

### 🎫 Manajemen Tiket Lengkap
- Form pembuatan tiket dengan upload foto
- Assignment teknisi dan tracking progress
- Status workflow: Open → In Progress → Done/Overdue
- Priority levels: Low, Medium, High, Critical
- Chat internal dan comment system
- Template tiket untuk pekerjaan berulang

### 👥 Customer & Unit Management
- CRUD data customer dengan SLA tracking
- Manajemen unit kendaraan (Truck, Bus, dll)
- Link customer ke multiple units
- Status kontrak dan monitoring garansi

### 📦 Inventory & Spare Parts
- Real-time stock tracking
- Minimum stock alerts
- Usage tracking per tiket
- Cost analysis dan reporting

### 📈 Sistem Pelaporan
- Export ke Excel dan PDF
- Filter dinamis (tanggal, customer, teknisi, status)
- Grafik performa bulanan
- Dashboard analytics untuk management

## 🚀 Demo & Login

**Live Demo**: [https://diazprabowo.github.io/transtrack/](https://diazprabowo.github.io/transtrack/)

### Akun Demo:

| Role | Email | Password | Akses |
|------|-------|----------|-------|
| Admin | admin@transtrack.com | admin123 | Full access semua modul |
| Support | support@transtrack.com | support123 | Manajemen tiket & customer |
| Teknisi | ahmad@transtrack.com | teknisi123 | Dashboard personal |
| Teknisi | budi@transtrack.com | teknisi123 | Dashboard personal |

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS dengan design system modern
- **Storage**: LocalStorage untuk data persistence
- **Icons**: Font Awesome 6.4.0
- **Charts**: Chart.js (ready untuk implementasi)
- **Responsive**: Mobile-first design approach

## 📱 Fitur Responsive

- ✅ Mobile-friendly sidebar navigation
- ✅ Adaptive grid layouts
- ✅ Touch-optimized buttons dan forms
- ✅ Responsive tables dengan horizontal scroll
- ✅ Print-friendly styling untuk laporan

## 🔧 Instalasi & Setup

### 1. Clone Repository
```bash
git clone https://github.com/Diazprabowo/transtrack.git
cd transtrack
```

### 2. Setup GitHub Pages (Hosting)
1. Masuk ke repository settings
2. Pilih "Pages" di sidebar
3. Source: "Deploy from a branch"
4. Branch: "main" / (root)
5. Save

### 3. Akses Aplikasi
Buka browser dan akses: `https://[username].github.io/transtrack/`

## 📋 Struktur File

```
transtrack/
├── index.html          # Main application file
├── style.css           # Complete CSS styling
├── app.js             # JavaScript application logic
├── README.md          # Documentation
└── assets/            # Future assets (images, icons)
```

## 🎯 Roadmap Pengembangan

### Phase 1: ✅ Completed
- [x] Authentication system dengan multi-role
- [x] Dashboard design dan KPI cards
- [x] Basic ticket management
- [x] Customer dan unit CRUD
- [x] Responsive design

### Phase 2: 🚧 Laravel Backend
- [ ] Migration ke Laravel 12
- [ ] MySQL database implementation
- [ ] API endpoints untuk mobile app
- [ ] Real-time notifications
- [ ] File upload untuk foto tiket

### Phase 3: 📊 Advanced Features
- [ ] Google Maps integration
- [ ] WhatsApp notifications
- [ ] Advanced reporting dengan Chart.js
- [ ] GPS tracking untuk teknisi
- [ ] Mobile app companion

## 🤝 Kontribusi

Kontribusi selalu welcome! Silakan:

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Project ini menggunakan lisensi MIT. Lihat file `LICENSE` untuk detail lengkap.

## 🙋‍♂️ Support

Jika ada pertanyaan atau butuh bantuan:

- **GitHub Issues**: [Create an issue](https://github.com/Diazprabowo/transtrack/issues)
- **Email**: didipenyet12@gmail.com
- **Dokumentasi**: [Wiki](https://github.com/Diazprabowo/transtrack/wiki)

## 📸 Screenshots

### Login Page
![Login Page](https://via.placeholder.com/800x400/2563eb/ffffff?text=TransTrack+Login+Page)

### Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/800x400/059669/ffffff?text=Admin+Dashboard+with+KPI)

### Ticket Management
![Ticket Management](https://via.placeholder.com/800x400/dc2626/ffffff?text=Ticket+Management+System)

---

<div align="center">
  <p><strong>🚛 TransTrack - Solusi Monitoring Teknisi Terpadu</strong></p>
  <p>Developed with ❤️ for PT. TransTrack</p>
  <p>© 2025 TransTrack System. All rights reserved.</p>
</div>