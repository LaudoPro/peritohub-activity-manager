
import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  Trash2, 
  Plus, 
  MoveDown, 
  MoveUp, 
  Save, 
  FileOutput 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface Photo {
  id: number;
  url: string;
  caption: string;
  location: string;
  date: string;
}

export default function RelatorioFotografico() {
  const { toast } = useToast();
  const [title, setTitle] = useState('Relatório Fotográfico - Processo nº 2023.01.001');
  const [description, setDescription] = useState('Levantamento de patologias construtivas no imóvel localizado na Av. Paulista, 1000, São Paulo/SP');
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      caption: 'Infiltração na parede do banheiro principal',
      location: 'Banheiro principal - Suíte',
      date: '2023-09-15'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1621690086278-6094128ef6a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      caption: 'Rachaduras na parede da sala de estar',
      location: 'Sala de estar - Parede norte',
      date: '2023-09-15'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1573167271548-518a5aea091c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
      caption: 'Problemas no revestimento cerâmico da cozinha',
      location: 'Cozinha - Piso',
      date: '2023-09-15'
    }
  ]);
  const [selectedProcess, setSelectedProcess] = useState('2023.01.001');
  const [selectedLaudo, setSelectedLaudo] = useState('');

  const handleAddPhoto = () => {
    // Aqui seria implementada a lógica para upload de fotos
    const newPhoto: Photo = {
      id: photos.length > 0 ? Math.max(...photos.map(p => p.id)) + 1 : 1,
      url: 'https://images.unsplash.com/photo-1504618223053-559bdef9dd5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      caption: 'Nova foto',
      location: 'Local não especificado',
      date: new Date().toISOString().split('T')[0]
    };
    
    setPhotos([...photos, newPhoto]);
    
    toast({
      title: "Foto adicionada",
      description: "Nova foto adicionada ao relatório.",
    });
  };

  const handleDeletePhoto = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id));
    
    toast({
      title: "Foto removida",
      description: "Foto removida do relatório.",
    });
  };

  const handleMovePhoto = (id: number, direction: 'up' | 'down') => {
    const index = photos.findIndex(photo => photo.id === id);
    if (index === -1) return;
    
    const newPhotos = [...photos];
    
    if (direction === 'up' && index > 0) {
      [newPhotos[index], newPhotos[index - 1]] = [newPhotos[index - 1], newPhotos[index]];
    } else if (direction === 'down' && index < photos.length - 1) {
      [newPhotos[index], newPhotos[index + 1]] = [newPhotos[index + 1], newPhotos[index]];
    }
    
    setPhotos(newPhotos);
  };

  const handleUpdatePhotoCaption = (id: number, caption: string) => {
    setPhotos(photos.map(photo => 
      photo.id === id ? { ...photo, caption } : photo
    ));
  };

  const handleUpdatePhotoLocation = (id: number, location: string) => {
    setPhotos(photos.map(photo => 
      photo.id === id ? { ...photo, location } : photo
    ));
  };

  const handleSaveReport = () => {
    toast({
      title: "Relatório salvo",
      description: "Relatório fotográfico salvo com sucesso.",
    });
  };

  const handleGeneratePDF = () => {
    toast({
      title: "PDF gerado",
      description: "Relatório fotográfico exportado para PDF.",
    });
  };

  return (
    <div className="container max-w-5xl py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Relatório Fotográfico</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSaveReport}>
            <Save className="mr-2 h-4 w-4" />
            Salvar
          </Button>
          <Button onClick={handleGeneratePDF}>
            <FileOutput className="mr-2 h-4 w-4" />
            Gerar PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Relatório</CardTitle>
          <CardDescription>
            Configure os detalhes básicos do relatório fotográfico
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="process">Processo</Label>
              <Select value={selectedProcess} onValueChange={setSelectedProcess}>
                <SelectTrigger id="process">
                  <SelectValue placeholder="Selecione um processo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023.01.001">Processo nº 2023.01.001</SelectItem>
                  <SelectItem value="2023.02.002">Processo nº 2023.02.002</SelectItem>
                  <SelectItem value="2023.03.003">Processo nº 2023.03.003</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="laudo">Laudo relacionado (opcional)</Label>
              <Select value={selectedLaudo} onValueChange={setSelectedLaudo}>
                <SelectTrigger id="laudo">
                  <SelectValue placeholder="Selecione um laudo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laudo-1">Laudo Técnico nº 001/2023</SelectItem>
                  <SelectItem value="laudo-2">Laudo Técnico nº 002/2023</SelectItem>
                  <SelectItem value="laudo-3">Laudo Técnico nº 003/2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Título do Relatório</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Fotografias ({photos.length})</h2>
        <Button onClick={handleAddPhoto}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Foto
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="h-48 md:h-full bg-muted relative">
                  <img 
                    src={photo.url} 
                    alt={photo.caption} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="h-8 w-8 rounded-full" 
                      onClick={() => handleDeletePhoto(photo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`caption-${photo.id}`}>Descrição da Foto</Label>
                    <Textarea
                      id={`caption-${photo.id}`}
                      value={photo.caption}
                      onChange={(e) => handleUpdatePhotoCaption(photo.id, e.target.value)}
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`location-${photo.id}`}>Localização</Label>
                    <Input
                      id={`location-${photo.id}`}
                      value={photo.location}
                      onChange={(e) => handleUpdatePhotoLocation(photo.id, e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`date-${photo.id}`}>Data da Foto</Label>
                    <Input
                      id={`date-${photo.id}`}
                      type="date"
                      value={photo.date}
                      onChange={(e) => setPhotos(photos.map(p => 
                        p.id === photo.id ? { ...p, date: e.target.value } : p
                      ))}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleMovePhoto(photo.id, 'up')}
                      disabled={photos.indexOf(photo) === 0}
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleMovePhoto(photo.id, 'down')}
                      disabled={photos.indexOf(photo) === photos.length - 1}
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Opções de Exportação</CardTitle>
          <CardDescription>
            Personalize como o relatório será exportado para PDF
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="page-size">Tamanho da Página</Label>
              <Select defaultValue="a4">
                <SelectTrigger id="page-size">
                  <SelectValue placeholder="Selecione um tamanho" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4">A4</SelectItem>
                  <SelectItem value="letter">Carta</SelectItem>
                  <SelectItem value="legal">Ofício</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="orientation">Orientação</Label>
              <Select defaultValue="portrait">
                <SelectTrigger id="orientation">
                  <SelectValue placeholder="Selecione a orientação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Retrato</SelectItem>
                  <SelectItem value="landscape">Paisagem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="footer-text">Texto do Rodapé</Label>
            <Input
              id="footer-text"
              placeholder="Texto personalizado para o rodapé do PDF"
              defaultValue="Relatório gerado pelo PeritoHub - Sistema de Gestão para Peritos Judiciais"
            />
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-between">
          <Button variant="outline">Visualizar</Button>
          <Button onClick={handleGeneratePDF}>
            <FileOutput className="mr-2 h-4 w-4" />
            Gerar PDF
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
