import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface SidebarItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<div class="sidebar bg-dark text-white">
  <div class="sidebar-header p-4">
    <h5 class="mb-0">
      <i class="bi bi-speedometer2 me-2"></i>
      {{ title }}
    </h5>
  </div>
  
  <nav class="sidebar-nav">
    <ul class="nav flex-column">
      @for (item of items; track item.route) {
        <li class="nav-item">
          <a 
            class="nav-link" 
            [routerLink]="item.route" 
            routerLinkActive="active"
            [routerLinkActiveOptions]="{exact: item.route.endsWith('dashboard')}">
            <i [class]="'bi bi-' + item.icon + ' me-2'"></i>
            {{ item.label }}
            @if (item.badge) {
              <span class="badge bg-primary ms-auto">{{ item.badge }}</span>
            }
          </a>
        </li>
      }
    </ul>
  </nav>
</div>
  `,
  styles: [`
.sidebar {
  min-height: 100vh;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  position: sticky;
  top: 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h5 {
  font-weight: 600;
  color: var(--bs-primary);
}

.sidebar-nav {
  padding: 1rem 0;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  padding: 1rem 1.5rem;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  display: flex;
  align-items: center;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  border-left-color: var(--bs-primary);
  padding-left: 2rem;
}

.nav-link.active {
  background-color: rgba(13, 110, 253, 0.1);
  color: var(--bs-primary);
  border-left-color: var(--bs-primary);
  font-weight: 600;
}

.nav-link i {
  font-size: 1.1rem;
}

.badge {
  border-radius: 20px;
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
}
  `]
})
export class SidebarComponent {
  @Input() items: SidebarItem[] = [];
  @Input() title: string = 'Dashboard';
}
