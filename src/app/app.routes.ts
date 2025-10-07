import { Routes } from '@angular/router';
import { TableroComponent } from './pages/tablero.component';
import { TableroPublicoComponent } from './publico/tablero-publico.component';
import { Login } from './pages/login/login';
import { RegistroUsuarios } from './pages/registro-usuarios/registro-usuarios';
import { authGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';
import { UsuariosListaComponent } from './pages/usuarios/usuarios.lista.component';
import { RolesListaComponent } from './pages/roles/roles.lista.component';
import { BracketComponent } from './pages/torneos/bracket.component';

export const routes: Routes = [
  // Arrancar en login (como el base que ya te funciona)
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login & Registro (públicos)
  { path: 'login', component: Login, title: 'Iniciar sesión' },
  { path: 'register', component: RegistroUsuarios, title: 'Crear cuenta' },

  // Dashboard (lazy) — requiere sesión
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
    title: 'Panel de Administración',
    canActivate: [authGuard]
  },

  // Tablero de control — requiere sesión
  { path: 'control', component: TableroComponent, canActivate: [authGuard], title: 'Tablero de control' },
  { path: 'control/:id', component: TableroComponent, canActivate: [authGuard], title: 'Tablero de control' },

  // Tablero público (dos variantes) — NO requiere sesión
  {
    path: 'publico',
    loadComponent: () =>
      import('./publico/tablero-publico.component')
        .then(m => m.TableroPublicoComponent),
    title: 'Tablero público'
  },
  {
    path: 'publico/:id',
    loadComponent: () =>
      import('./publico/tablero-publico.component')
        .then(m => m.TableroPublicoComponent),
    title: 'Tablero público'
  },

  // ---- Secciones ADMIN (todas requieren Admin) ----
  {
    path: 'admin/equipos',
    loadComponent: () =>
      import('./pages/equipos/equipos-lista.component')
        .then(m => m.EquiposListaComponent),
    title: 'Gestión de Equipos',
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'admin/jugadores',
    loadComponent: () =>
      import('./pages/jugadores/jugadores-lista.component')
        .then(m => m.JugadoresListaComponent),
    title: 'Gestión de Jugadores',
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'admin/usuarios',
    loadComponent: () =>
      import('./pages/usuarios/usuarios.lista.component')
        .then(m => m.UsuariosListaComponent),
    title: 'Gestión de Usuarios',
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'admin/roles',
    loadComponent: () =>
      import('./pages/roles/roles.lista.component')
        .then(m => m.RolesListaComponent),
    title: 'Gestión de Roles',
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },

  // Admin: Partidos / Torneos adicionales (provenientes del segundo archivo)
  {
    path: 'admin/partidos/historial',
    loadComponent: () =>
      import('./pages/partidos/partidos-historial.component')
        .then(m => m.PartidosHistorialComponent),
    title: 'Historial de Partidos',
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'admin/partidos/nuevo',
    loadComponent: () =>
      import('./pages/partidos/partidos-nuevo.component')
        .then(m => m.PartidosNuevoComponent),
    title: 'Nuevo Partido',
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'admin/partidos/:id/roster',
    loadComponent: () =>
      import('./pages/partidos/partido-roster.component')
        .then(m => m.PartidoRosterComponent),
    title: 'Asignar Roster',
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'admin/torneos/nuevo',
    loadComponent: () =>
      import('./pages/torneos/torneos-nuevo.component')
        .then(m => m.TorneosNuevoComponent),
    title: 'Nuevo Torneo',
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'admin/torneos/:id/bracket',
    loadComponent: () =>
      import('./pages/torneos/bracket.component')
        .then(m => m.BracketComponent),
    title: 'Llaves del Torneo',
    canActivate: [authGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },

  // Wildcard
  { path: '**', redirectTo: 'login' }
];  
