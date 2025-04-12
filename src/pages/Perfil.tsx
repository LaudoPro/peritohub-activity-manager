
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar,
  Upload,
  Save,
  Building
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

export default function Perfil() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || 'Perito Exemplo',
    email: user?.email || 'perito@example.com',
    phone: '(11) 99999-9999',
    address: 'Av. Paulista, 1000, São Paulo - SP',
    profession: 'Engenheiro Civil',
    specialty: 'Perícias de Engenharia',
    experience: '10 anos de experiência em perícias judiciais, especializado em avaliação de imóveis, patologias construtivas e acidentes de trabalho.',
    registration: 'CREA 123456',
    company: 'Perícias & Associados',
    website: 'www.pericias.com.br'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Aqui seria implementada a lógica para salvar as informações no backend
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
    setIsEditing(false);
  };

  const handlePhotoUpload = () => {
    // Aqui seria implementada a lógica para upload de foto
    toast({
      title: "Foto de perfil",
      description: "Foto atualizada com sucesso.",
    });
  };

  return (
    <div className="container max-w-5xl py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <Button 
          variant={isEditing ? "default" : "outline"}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? <><Save className="mr-2 h-4 w-4" /> Salvar Alterações</> : 'Editar Perfil'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Seus dados de identificação</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user?.avatar || ""} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {formData.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full" 
                onClick={handlePhotoUpload}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center w-full space-y-1">
              <h3 className="font-medium text-xl">{formData.name}</h3>
              <p className="text-muted-foreground">{formData.profession}</p>
              <p className="text-sm text-muted-foreground">{formData.registration}</p>
            </div>
            
            <div className="w-full space-y-2">
              <div className="flex items-center text-sm">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{formData.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{formData.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{formData.address}</span>
              </div>
              <div className="flex items-center text-sm">
                <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{formData.company}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Detalhes do Perfil</CardTitle>
            <CardDescription>
              Informações profissionais e configurações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile">
              <TabsList className="mb-4">
                <TabsTrigger value="profile">Perfil Profissional</TabsTrigger>
                <TabsTrigger value="credentials">Credenciais</TabsTrigger>
                <TabsTrigger value="settings">Configurações</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4">
                <div className="grid gap-3">
                  <div className="grid gap-1">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="grid gap-1">
                    <Label htmlFor="profession">Profissão</Label>
                    <Input 
                      id="profession"
                      name="profession"
                      value={formData.profession}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="grid gap-1">
                    <Label htmlFor="specialty">Especialidade</Label>
                    <Input 
                      id="specialty"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="grid gap-1">
                    <Label htmlFor="experience">Experiência Profissional</Label>
                    <Textarea 
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="credentials" className="space-y-4">
                <div className="grid gap-3">
                  <div className="grid gap-1">
                    <Label htmlFor="registration">Número de Registro Profissional</Label>
                    <Input 
                      id="registration"
                      name="registration"
                      value={formData.registration}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="grid gap-1">
                    <Label htmlFor="company">Empresa/Escritório</Label>
                    <Input 
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="grid gap-1">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <div className="grid gap-3">
                  <div className="grid gap-1">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="grid gap-1">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="grid gap-1">
                    <Label htmlFor="address">Endereço</Label>
                    <Input 
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="secondary" className="w-full" disabled={!isEditing}>
                      Alterar Senha
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t p-4 flex justify-end">
            {isEditing && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estatísticas</CardTitle>
          <CardDescription>
            Resumo da sua atividade como perito
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <h3 className="text-3xl font-bold text-primary">32</h3>
              <p className="text-muted-foreground">Processos Ativos</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <h3 className="text-3xl font-bold text-primary">65</h3>
              <p className="text-muted-foreground">Laudos Emitidos</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <h3 className="text-3xl font-bold text-primary">R$ 120.500</h3>
              <p className="text-muted-foreground">Honorários Totais</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
