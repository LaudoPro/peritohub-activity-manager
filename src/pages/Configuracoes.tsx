
import React, { useState } from 'react';
import { 
  Bell, 
  Moon, 
  Sun, 
  Eye, 
  EyeOff, 
  MailOpen,
  Shield,
  FileText,
  Palette,
  Save
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Configuracoes() {
  const { toast } = useToast();
  const [themeMode, setThemeMode] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('blue');
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    deadlineReminders: true,
    reportUpdates: true,
    financialUpdates: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    showFinancials: false,
    twoFactorAuth: false,
    dataSharing: true
  });

  const [documentSettings, setDocumentSettings] = useState({
    autoSave: true,
    defaultTemplate: 'standard',
    includeSignature: true,
    documentNumbering: 'auto'
  });

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="container max-w-5xl py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preferências do Sistema</CardTitle>
          <CardDescription>
            Personalize o PeritoHub de acordo com suas necessidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="appearance">
            <TabsList className="mb-4">
              <TabsTrigger value="appearance">Aparência</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="privacy">Privacidade</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tema</h3>
                <RadioGroup 
                  defaultValue={themeMode} 
                  onValueChange={setThemeMode}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light" className="flex items-center">
                      <Sun className="mr-2 h-4 w-4" />
                      Claro
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark" className="flex items-center">
                      <Moon className="mr-2 h-4 w-4" />
                      Escuro
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">Sistema</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Cor Principal</h3>
                <div className="grid grid-cols-5 gap-2">
                  {['blue', 'purple', 'green', 'orange', 'red'].map((color) => (
                    <div 
                      key={color}
                      className={`h-10 w-full rounded-md cursor-pointer border-2 ${
                        primaryColor === color ? 'border-black dark:border-white' : 'border-transparent'
                      }`}
                      style={{ 
                        backgroundColor: 
                          color === 'blue' ? '#3b82f6' : 
                          color === 'purple' ? '#8b5cf6' : 
                          color === 'green' ? '#10b981' : 
                          color === 'orange' ? '#f97316' : 
                          '#ef4444' 
                      }}
                      onClick={() => setPrimaryColor(color)}
                    />
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Interface</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dense-mode">Modo compacto</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduz o espaçamento entre elementos da interface
                    </p>
                  </div>
                  <Switch id="dense-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">Animações</Label>
                    <p className="text-sm text-muted-foreground">
                      Habilita animações na interface
                    </p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferências de Notificação</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex items-center">
                    <MailOpen className="mr-2 h-4 w-4" />
                    <div>
                      <Label htmlFor="email-notifications">Notificações por Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber alertas por email
                      </p>
                    </div>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationChange('emailNotifications')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex items-center">
                    <Bell className="mr-2 h-4 w-4" />
                    <div>
                      <Label htmlFor="push-notifications">Notificações Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificações no navegador
                      </p>
                    </div>
                  </div>
                  <Switch 
                    id="push-notifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={() => handleNotificationChange('pushNotifications')}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tipos de Alertas</h3>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="deadline-reminders">Lembretes de prazos</Label>
                  <Switch 
                    id="deadline-reminders"
                    checked={notificationSettings.deadlineReminders}
                    onCheckedChange={() => handleNotificationChange('deadlineReminders')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="report-updates">Atualizações de laudos</Label>
                  <Switch 
                    id="report-updates"
                    checked={notificationSettings.reportUpdates}
                    onCheckedChange={() => handleNotificationChange('reportUpdates')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="financial-updates">Atualizações financeiras</Label>
                  <Switch 
                    id="financial-updates"
                    checked={notificationSettings.financialUpdates}
                    onCheckedChange={() => handleNotificationChange('financialUpdates')}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configurações de Privacidade</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex items-center">
                    <Eye className="mr-2 h-4 w-4" />
                    <div>
                      <Label htmlFor="show-profile">Perfil visível</Label>
                      <p className="text-sm text-muted-foreground">
                        Tornar seu perfil visível para outros usuários
                      </p>
                    </div>
                  </div>
                  <Switch 
                    id="show-profile"
                    checked={privacySettings.showProfile}
                    onCheckedChange={() => handlePrivacyChange('showProfile')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex items-center">
                    <EyeOff className="mr-2 h-4 w-4" />
                    <div>
                      <Label htmlFor="show-financials">Financeiro visível</Label>
                      <p className="text-sm text-muted-foreground">
                        Mostrar informações financeiras no perfil
                      </p>
                    </div>
                  </div>
                  <Switch 
                    id="show-financials"
                    checked={privacySettings.showFinancials}
                    onCheckedChange={() => handlePrivacyChange('showFinancials')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    <div>
                      <Label htmlFor="two-factor-auth">Autenticação em dois fatores</Label>
                      <p className="text-sm text-muted-foreground">
                        Aumenta a segurança da sua conta
                      </p>
                    </div>
                  </div>
                  <Switch 
                    id="two-factor-auth"
                    checked={privacySettings.twoFactorAuth}
                    onCheckedChange={() => handlePrivacyChange('twoFactorAuth')}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Button variant="destructive">Excluir Conta</Button>
                <p className="text-sm text-muted-foreground">
                  Esta ação é irreversível e removerá todos os seus dados.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configurações de Documentos</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <div>
                      <Label htmlFor="auto-save">Salvar automaticamente</Label>
                      <p className="text-sm text-muted-foreground">
                        Salvar documentos automaticamente durante a edição
                      </p>
                    </div>
                  </div>
                  <Switch 
                    id="auto-save"
                    checked={documentSettings.autoSave}
                    onCheckedChange={() => setDocumentSettings(prev => ({
                      ...prev,
                      autoSave: !prev.autoSave
                    }))}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="default-template">Modelo padrão de laudo</Label>
                  <Select 
                    defaultValue={documentSettings.defaultTemplate}
                    onValueChange={(value) => setDocumentSettings(prev => ({
                      ...prev,
                      defaultTemplate: value
                    }))}
                  >
                    <SelectTrigger id="default-template">
                      <SelectValue placeholder="Selecione um modelo padrão" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimalista</SelectItem>
                      <SelectItem value="standard">Padrão</SelectItem>
                      <SelectItem value="detailed">Detalhado</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-signature">Incluir assinatura digital</Label>
                  <Switch 
                    id="include-signature"
                    checked={documentSettings.includeSignature}
                    onCheckedChange={() => setDocumentSettings(prev => ({
                      ...prev,
                      includeSignature: !prev.includeSignature
                    }))}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="document-numbering">Numeração de documentos</Label>
                  <Select 
                    defaultValue={documentSettings.documentNumbering}
                    onValueChange={(value) => setDocumentSettings(prev => ({
                      ...prev,
                      documentNumbering: value
                    }))}
                  >
                    <SelectTrigger id="document-numbering">
                      <SelectValue placeholder="Selecione um sistema de numeração" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Automático</SelectItem>
                      <SelectItem value="date">Baseado em data</SelectItem>
                      <SelectItem value="sequential">Sequencial</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Button variant="outline">Redefinir para Padrões</Button>
                <p className="text-sm text-muted-foreground">
                  Restaura todas as configurações de documentos para os valores padrão.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-end">
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Salvar Configurações
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
