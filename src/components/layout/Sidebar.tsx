
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  BarChart3,
  Briefcase,
  Calculator,
  FileText,
  Home,
  LogOut,
  Settings,
  User,
  Plus,
  PenTool
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const { logout } = useAuth();
  
  const menuItems = [
    { title: 'Dashboard', icon: Home, path: '/dashboard' },
    { title: 'Processos', icon: Briefcase, path: '/processos' },
    { title: 'Laudos', icon: FileText, path: '/laudos' },
    { title: 'Financeiro', icon: Calculator, path: '/financeiro' },
    { title: 'Relatórios', icon: BarChart3, path: '/relatorios' },
  ];

  const actionItems = [
    { title: 'Novo Processo', icon: Plus, path: '/processos/novo' },
    { title: 'Novo Laudo', icon: PenTool, path: '/laudos/novo' },
  ];

  const userMenuItems = [
    { title: 'Meu Perfil', icon: User, path: '/perfil' },
    { title: 'Configurações', icon: Settings, path: '/configuracoes' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-4 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">PeritoHub</h1>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => cn(
                        "w-full",
                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Ações Rápidas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {actionItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => cn(
                        "w-full",
                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Usuário</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path} 
                      className={({ isActive }) => cn(
                        "w-full",
                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={logout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
