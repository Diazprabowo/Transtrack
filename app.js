// TransTrack Monitoring System - Basic JavaScript
class TransTrackApp {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'dashboard';
        this.initializeData();
        this.initializeEventListeners();
        this.checkSession();
    }

    initializeData() {
        // Initialize dummy data if not exists
        if (!localStorage.getItem('transtrack_data')) {
            const initialData = {
                users: [
                    {"id": 1, "name": "Admin TransTrack", "email": "admin@transtrack.com", "phone": "081234567890", "role": "admin", "password": "admin123"},
                    {"id": 2, "name": "Support Manager", "email": "support@transtrack.com", "phone": "081234567891", "role": "support", "password": "support123"},
                    {"id": 3, "name": "Teknisi Ahmad", "email": "ahmad@transtrack.com", "phone": "081234567892", "role": "teknisi", "password": "teknisi123"},
                    {"id": 4, "name": "Teknisi Budi", "email": "budi@transtrack.com", "phone": "081234567893", "role": "teknisi", "password": "teknisi123"},
                    {"id": 5, "name": "Support Staff", "email": "staff@transtrack.com", "phone": "081234567894", "role": "support", "password": "support123"}
                ],
                customers: [
                    {"id": 1, "name": "PT Logistik Prima", "contact": "Manager Operasional", "phone": "021-12345678", "address": "Jl. Raya Jakarta No. 123", "sla": "24 jam", "contract_status": "Active"},
                    {"id": 2, "name": "CV Transport Jaya", "contact": "Kepala Bengkel", "phone": "021-87654321", "address": "Jl. Industri Bekasi No. 45", "sla": "12 jam", "contract_status": "Active"},
                    {"id": 3, "name": "PT Angkutan Nasional", "contact": "GM Fleet", "phone": "021-11223344", "address": "Jl. Gatot Subroto No. 67", "sla": "48 jam", "contract_status": "Expired"},
                    {"id": 4, "name": "Koperasi Truck Jakarta", "contact": "Ketua Koperasi", "phone": "021-99887766", "address": "Jl. Cakung Raya No. 89", "sla": "24 jam", "contract_status": "Active"}
                ],
                units: [
                    {"id": 1, "plate_number": "B 1234 AB", "type": "Truck", "specs": "Hino Dutro 130 HD", "customer_id": 1, "year": 2022},
                    {"id": 2, "plate_number": "B 5678 CD", "type": "Bus", "specs": "Mercedes OH 1626", "customer_id": 1, "year": 2021},
                    {"id": 3, "plate_number": "B 9012 EF", "type": "Truck", "specs": "Mitsubishi Canter FE 74", "customer_id": 2, "year": 2023},
                    {"id": 4, "plate_number": "B 3456 GH", "type": "Truck", "specs": "Isuzu NMR 71", "customer_id": 2, "year": 2022},
                    {"id": 5, "plate_number": "B 7890 IJ", "type": "Bus", "specs": "Hino RN 285", "customer_id": 3, "year": 2020}
                ],
                tickets: [
                    {"id": 1, "customer_id": 1, "unit_id": 1, "type": "Maintenance", "priority": "Medium", "status": "In Progress", "technician_id": 3, "description": "Ganti oli mesin dan filter udara", "created_at": "2025-10-01", "sla_deadline": "2025-10-02"},
                    {"id": 2, "customer_id": 2, "unit_id": 3, "type": "Repair", "priority": "High", "status": "Open", "technician_id": null, "description": "Perbaikan sistem rem ABS yang error", "created_at": "2025-10-02", "sla_deadline": "2025-10-03"},
                    {"id": 3, "customer_id": 1, "unit_id": 2, "type": "Inspection", "priority": "Low", "status": "Done", "technician_id": 4, "description": "Inspeksi rutin tahunan", "created_at": "2025-09-28", "sla_deadline": "2025-10-05"},
                    {"id": 4, "customer_id": 3, "unit_id": 5, "type": "Installation", "priority": "Critical", "status": "Overdue", "technician_id": 3, "description": "Instalasi GPS tracker baru", "created_at": "2025-09-30", "sla_deadline": "2025-10-01"}
                ],
                spare_parts: [
                    {"id": 1, "name": "Filter Oli", "code": "FO-001", "stock": 25, "min_stock": 10, "price": 150000, "unit": "pcs"},
                    {"id": 2, "name": "Kampas Rem", "code": "KR-002", "stock": 8, "min_stock": 15, "price": 350000, "unit": "set"},
                    {"id": 3, "name": "Belt Fan", "code": "BF-003", "stock": 12, "min_stock": 5, "price": 85000, "unit": "pcs"},
                    {"id": 4, "name": "Busi", "code": "BS-004", "stock": 30, "min_stock": 20, "price": 75000, "unit": "pcs"}
                ],
                activity_logs: [
                    {"id": 1, "user": "Teknisi Ahmad", "action": "Update status tiket #1 ke In Progress", "timestamp": "2025-10-05 10:30"},
                    {"id": 2, "user": "Support Manager", "action": "Assign tiket #2 ke Teknisi Budi", "timestamp": "2025-10-05 09:15"},
                    {"id": 3, "user": "Admin TransTrack", "action": "Tambah spare part Filter Oli", "timestamp": "2025-10-05 08:45"}
                ]
            };
            localStorage.setItem('transtrack_data', JSON.stringify(initialData));
        }
    }

    initializeEventListeners() {
        // Authentication forms
        document.getElementById('login-form')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('register-form')?.addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('forgot-form')?.addEventListener('submit', (e) => this.handleForgotPassword(e));

        // Navigation
        document.getElementById('show-register')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showPage('register');
        });
        document.getElementById('show-login')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showPage('login');
        });
        document.getElementById('show-forgot')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showPage('forgot');
        });
        document.getElementById('back-to-login')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showPage('login');
        });

        // Main app navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                this.navigateToPage(page);
            });
        });

        // Logout
        document.getElementById('logout-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
        });

        // Sidebar toggle for mobile
        document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('open');
        });

        // User menu toggle
        document.querySelector('.user-menu-toggle')?.addEventListener('click', () => {
            document.querySelector('.user-menu').classList.toggle('active');
        });
    }

    checkSession() {
        const savedUser = localStorage.getItem('transtrack_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showMainApp();
        } else {
            this.showPage('login');
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const role = document.getElementById('login-role').value;

        const data = JSON.parse(localStorage.getItem('transtrack_data'));
        const user = data.users.find(u => u.email === email && u.password === password && u.role === role);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('transtrack_user', JSON.stringify(user));
            this.showMainApp();
            this.showNotification('Login berhasil!', 'success');
        } else {
            this.showNotification('Email, password, atau role tidak valid!', 'error');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const phone = document.getElementById('register-phone').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;

        if (password !== confirmPassword) {
            this.showNotification('Password tidak cocok!', 'error');
            return;
        }

        const data = JSON.parse(localStorage.getItem('transtrack_data'));
        const existingUser = data.users.find(u => u.email === email);

        if (existingUser) {
            this.showNotification('Email sudah terdaftar!', 'error');
            return;
        }

        const newUser = {
            id: Math.max(...data.users.map(u => u.id)) + 1,
            name: name,
            email: email,
            phone: phone,
            role: 'teknisi', // Default role for self-registration
            password: password
        };

        data.users.push(newUser);
        localStorage.setItem('transtrack_data', JSON.stringify(data));

        this.showNotification('Registrasi berhasil! Silakan login.', 'success');
        this.showPage('login');
    }

    handleForgotPassword(e) {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;
        
        const data = JSON.parse(localStorage.getItem('transtrack_data'));
        const user = data.users.find(u => u.email === email);

        if (user) {
            this.showNotification('Link reset password telah dikirim ke email Anda!', 'success');
        } else {
            this.showNotification('Email tidak ditemukan!', 'error');
        }
    }

    showPage(pageName) {
        document.getElementById('login-page').style.display = pageName === 'login' ? 'flex' : 'none';
        document.getElementById('register-page').style.display = pageName === 'register' ? 'flex' : 'none';
        document.getElementById('forgot-page').style.display = pageName === 'forgot' ? 'flex' : 'none';
        document.getElementById('main-app').style.display = 'none';
    }

    showMainApp() {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('register-page').style.display = 'none';
        document.getElementById('forgot-page').style.display = 'none';
        document.getElementById('main-app').style.display = 'grid';
        
        // Update user info
        document.getElementById('current-user-name').textContent = this.currentUser.name;
        
        // Show/hide admin-only elements
        document.querySelectorAll('.admin-only').forEach(el => {
            el.style.display = this.currentUser.role === 'admin' ? 'flex' : 'none';
        });

        this.loadDashboard();
    }

    navigateToPage(page) {
        // Hide all page contents
        document.querySelectorAll('.page-content').forEach(content => {
            content.style.display = 'none';
        });

        // Show selected page
        document.getElementById(`${page}-content`).style.display = 'block';

        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        this.currentPage = page;

        // Load page-specific content
        switch(page) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'tickets':
                this.loadTickets();
                break;
            case 'customers':
                this.loadCustomers();
                break;
            // Add other cases as needed
        }
    }

    loadDashboard() {
        const data = JSON.parse(localStorage.getItem('transtrack_data'));
        
        // Generate KPI cards based on user role
        let kpiHTML = '';
        
        if (this.currentUser.role === 'teknisi') {
            const userTickets = data.tickets.filter(t => t.technician_id === this.currentUser.id);
            const activeTickets = userTickets.filter(t => t.status === 'In Progress');
            const completedTickets = userTickets.filter(t => t.status === 'Done');
            
            kpiHTML = `
                <div class="kpi-card kpi-card--primary">
                    <div class="kpi-header">
                        <div class="kpi-title">Total Tiket Saya</div>
                        <div class="kpi-icon kpi-icon--primary"><i class="fas fa-ticket-alt"></i></div>
                    </div>
                    <div class="kpi-value">${userTickets.length}</div>
                    <div class="kpi-change kpi-change--up"><i class="fas fa-arrow-up"></i> Aktif</div>
                </div>
                <div class="kpi-card kpi-card--warning">
                    <div class="kpi-header">
                        <div class="kpi-title">Tiket Aktif</div>
                        <div class="kpi-icon kpi-icon--warning"><i class="fas fa-clock"></i></div>
                    </div>
                    <div class="kpi-value">${activeTickets.length}</div>
                    <div class="kpi-change kpi-change--up"><i class="fas fa-arrow-up"></i> Sedang Dikerjakan</div>
                </div>
                <div class="kpi-card kpi-card--success">
                    <div class="kpi-header">
                        <div class="kpi-title">Tiket Selesai</div>
                        <div class="kpi-icon kpi-icon--success"><i class="fas fa-check"></i></div>
                    </div>
                    <div class="kpi-value">${completedTickets.length}</div>
                    <div class="kpi-change kpi-change--up"><i class="fas fa-arrow-up"></i> Bulan Ini</div>
                </div>
            `;
        } else {
            const totalTickets = data.tickets.length;
            const openTickets = data.tickets.filter(t => t.status === 'Open').length;
            const overdueTickets = data.tickets.filter(t => t.status === 'Overdue').length;
            const totalTechnicians = data.users.filter(u => u.role === 'teknisi').length;
            
            kpiHTML = `
                <div class="kpi-card kpi-card--primary">
                    <div class="kpi-header">
                        <div class="kpi-title">Total Teknisi</div>
                        <div class="kpi-icon kpi-icon--primary"><i class="fas fa-users"></i></div>
                    </div>
                    <div class="kpi-value">${totalTechnicians}</div>
                    <div class="kpi-change kpi-change--up"><i class="fas fa-arrow-up"></i> Aktif</div>
                </div>
                <div class="kpi-card kpi-card--warning">
                    <div class="kpi-header">
                        <div class="kpi-title">Tiket Open</div>
                        <div class="kpi-icon kpi-icon--warning"><i class="fas fa-exclamation-triangle"></i></div>
                    </div>
                    <div class="kpi-value">${openTickets}</div>
                    <div class="kpi-change kpi-change--up"><i class="fas fa-arrow-up"></i> Perlu Assign</div>
                </div>
                <div class="kpi-card kpi-card--danger">
                    <div class="kpi-header">
                        <div class="kpi-title">Tiket Overdue</div>
                        <div class="kpi-icon kpi-icon--danger"><i class="fas fa-exclamation-circle"></i></div>
                    </div>
                    <div class="kpi-value">${overdueTickets}</div>
                    <div class="kpi-change kpi-change--down"><i class="fas fa-arrow-down"></i> Urgent</div>
                </div>
                <div class="kpi-card kpi-card--primary">
                    <div class="kpi-header">
                        <div class="kpi-title">Total Tiket</div>
                        <div class="kpi-icon kpi-icon--primary"><i class="fas fa-ticket-alt"></i></div>
                    </div>
                    <div class="kpi-value">${totalTickets}</div>
                    <div class="kpi-change kpi-change--up"><i class="fas fa-arrow-up"></i> Semua</div>
                </div>
            `;
        }
        
        document.getElementById('kpi-cards').innerHTML = kpiHTML;
        
        // Load activity feed
        const activityHTML = data.activity_logs.map(activity => `
            <div class="activity-item">
                <div class="activity-icon"><i class="fas fa-bell"></i></div>
                <div class="activity-content">
                    <div class="activity-title">${activity.action}</div>
                    <div class="activity-time">oleh ${activity.user} - ${activity.timestamp}</div>
                </div>
            </div>
        `).join('');
        
        document.getElementById('activity-feed').innerHTML = activityHTML;
    }

    loadTickets() {
        const data = JSON.parse(localStorage.getItem('transtrack_data'));
        let tickets = data.tickets;
        
        // Filter tickets based on user role
        if (this.currentUser.role === 'teknisi') {
            tickets = tickets.filter(t => t.technician_id === this.currentUser.id);
        }
        
        const ticketsHTML = tickets.map(ticket => {
            const customer = data.customers.find(c => c.id === ticket.customer_id);
            const unit = data.units.find(u => u.id === ticket.unit_id);
            const technician = data.users.find(u => u.id === ticket.technician_id);
            
            let statusBadge = '';
            switch(ticket.status) {
                case 'Open':
                    statusBadge = '<span class="badge badge--warning">Open</span>';
                    break;
                case 'In Progress':
                    statusBadge = '<span class="badge badge--info">In Progress</span>';
                    break;
                case 'Done':
                    statusBadge = '<span class="badge badge--success">Done</span>';
                    break;
                case 'Overdue':
                    statusBadge = '<span class="badge badge--danger">Overdue</span>';
                    break;
            }
            
            let priorityBadge = '';
            switch(ticket.priority) {
                case 'Low':
                    priorityBadge = '<span class="badge badge--secondary">Low</span>';
                    break;
                case 'Medium':
                    priorityBadge = '<span class="badge badge--warning">Medium</span>';
                    break;
                case 'High':
                    priorityBadge = '<span class="badge badge--danger">High</span>';
                    break;
                case 'Critical':
                    priorityBadge = '<span class="badge badge--danger">Critical</span>';
                    break;
            }
            
            return `
                <tr>
                    <td>#${ticket.id}</td>
                    <td>${customer ? customer.name : 'Unknown'}</td>
                    <td>${unit ? unit.plate_number : 'Unknown'}</td>
                    <td>${ticket.type}</td>
                    <td>${priorityBadge}</td>
                    <td>${statusBadge}</td>
                    <td>${technician ? technician.name : 'Belum Assign'}</td>
                    <td>${ticket.sla_deadline}</td>
                    <td>
                        <button class="btn btn--small btn--secondary" onclick="app.viewTicket(${ticket.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn--small btn--primary" onclick="app.editTicket(${ticket.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
        
        document.getElementById('tickets-table-body').innerHTML = ticketsHTML;
    }

    loadCustomers() {
        const data = JSON.parse(localStorage.getItem('transtrack_data'));
        
        const customersHTML = data.customers.map(customer => {
            let statusBadge = customer.contract_status === 'Active' ? 
                '<span class="badge badge--success">Active</span>' : 
                '<span class="badge badge--danger">Expired</span>';
                
            return `
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.contact}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.sla}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn btn--small btn--secondary" onclick="app.viewCustomer(${customer.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn--small btn--primary" onclick="app.editCustomer(${customer.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
        
        document.getElementById('customers-table-body').innerHTML = customersHTML;
    }

    viewTicket(ticketId) {
        this.showNotification(`Melihat detail tiket #${ticketId}`, 'info');
    }

    editTicket(ticketId) {
        this.showNotification(`Edit tiket #${ticketId}`, 'info');
    }

    viewCustomer(customerId) {
        this.showNotification(`Melihat detail customer #${customerId}`, 'info');
    }

    editCustomer(customerId) {
        this.showNotification(`Edit customer #${customerId}`, 'info');
    }

    logout() {
        localStorage.removeItem('transtrack_user');
        this.currentUser = null;
        this.showPage('login');
        this.showNotification('Berhasil logout!', 'success');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#2563eb'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TransTrackApp();
});