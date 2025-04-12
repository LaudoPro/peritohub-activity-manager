
import React, { useState } from 'react';
import { 
  FileOutput, 
  FileText, 
  Briefcase, 
  Camera, 
  Check, 
  Download, 
  Edit, 
  Eye, 
  FilePlus, 
  ImagePlus, 
  Paperclip
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

interface DocumentTemplate {
  id: string;
  name: string;
  type: string;
  thumbnail: string;
}

export default function GerarPDF() {
  const { toast } = useToast();
  const [selectedProcess, setSelectedProcess] = useState('');
  const [selectedLaudo, setSelectedLaudo] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('template-1');
  
  const templates: DocumentTemplate[] = [
    {
      id: 'template-1',
      name: 'Laudo Completo',
      type: 'Laudo Pericial',
      thumbnail: 'https://images.unsplash.com/photo-1601370690183-1c7965d24ca1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
    },
    {
      id: 'template-2',
      name: 'Relatório Fotográfico',
      type: 'Relatório',
      thumbnail: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 'template-3',
      name: 'Parecer Técnico',
      type: 'Parecer',
      thumbnail: 'https://images.unsplash.com/photo-1512908390106-b1af96afe5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 'template-4',
      name: 'Relatório Simplificado',
      type: 'Relatório',
      thumbnail: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    }
  ];

  const [documentOptions, setDocumentOptions] = useState({
    includeCover: true,
    includeIndex: true,
    includePhotos: true,
    includeAttachments: true,
    includeSignature: true,
    useLetterhead: true,
    usePageNumbers: true,
    compressionLevel: 'medium',
    embedFonts: true
  });

  const toggleOption = (option: keyof typeof documentOptions) => {
    setDocumentOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleGeneratePDF = () => {
    toast({
      title: "PDF gerado com sucesso",
      description: "O documento foi gerado e está pronto para download.",
    });
  };

  const handlePreviewPDF = () => {
    toast({
      title: "Visualizando PDF",
      description: "Abrindo visualização do documento.",
    });
  };

  return (
    <div className="container max-w-5xl py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Gerar Documentos PDF</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePreviewPDF}>
            <Eye className="mr-2 h-4 w-4" />
            Visualizar
          </Button>
          <Button onClick={handleGeneratePDF}>
            <FileOutput className="mr-2 h-4 w-4" />
            Gerar PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="document" className="w-full">
        <TabsList className="mb-4 w-full grid grid-cols-3">
          <TabsTrigger value="document">
            <FileText className="mr-2 h-4 w-4" />
            Documento
          </TabsTrigger>
          <TabsTrigger value="content">
            <Edit className="mr-2 h-4 w-4" />
            Conteúdo
          </TabsTrigger>
          <TabsTrigger value="settings">
            <FilePlus className="mr-2 h-4 w-4" />
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="document" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Origem do Documento</CardTitle>
              <CardDescription>
                Selecione os dados de origem para gerar o documento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="processo">Processo</Label>
                  <Select value={selectedProcess} onValueChange={setSelectedProcess}>
                    <SelectTrigger id="processo">
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
                  <Label htmlFor="laudo">Laudo</Label>
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
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Modelo de Documento</CardTitle>
              <CardDescription>
                Escolha o modelo para o documento PDF
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedTemplate} 
                onValueChange={setSelectedTemplate}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {templates.map((template) => (
                  <div key={template.id} className="relative">
                    <RadioGroupItem
                      value={template.id}
                      id={template.id}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={template.id}
                      className={`flex flex-col rounded-lg border-2 p-2 hover:border-primary cursor-pointer ${
                        selectedTemplate === template.id ? 'border-primary' : 'border-muted'
                      }`}
                    >
                      <div className="h-40 overflow-hidden rounded-md bg-muted">
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="h-full w-full object-cover transition-all hover:scale-105"
                        />
                      </div>
                      <div className="p-2">
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.type}</p>
                      </div>
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Elementos do Documento</CardTitle>
              <CardDescription>
                Selecione os elementos que serão incluídos no documento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="include-cover">Capa do documento</Label>
                  </div>
                  <Switch 
                    id="include-cover" 
                    checked={documentOptions.includeCover}
                    onCheckedChange={() => toggleOption('includeCover')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="include-index">Índice / Sumário</Label>
                  </div>
                  <Switch 
                    id="include-index" 
                    checked={documentOptions.includeIndex}
                    onCheckedChange={() => toggleOption('includeIndex')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="include-photos">Relatório fotográfico</Label>
                  </div>
                  <Switch 
                    id="include-photos" 
                    checked={documentOptions.includePhotos}
                    onCheckedChange={() => toggleOption('includePhotos')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="include-attachments">Anexos</Label>
                  </div>
                  <Switch 
                    id="include-attachments" 
                    checked={documentOptions.includeAttachments}
                    onCheckedChange={() => toggleOption('includeAttachments')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImagePlus className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="include-signature">Assinatura digital</Label>
                  </div>
                  <Switch 
                    id="include-signature" 
                    checked={documentOptions.includeSignature}
                    onCheckedChange={() => toggleOption('includeSignature')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
              <CardDescription>
                Personalize o conteúdo adicional do documento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doc-title">Título do Documento</Label>
                <Input
                  id="doc-title"
                  placeholder="Título que aparecerá na capa do documento"
                  defaultValue="Laudo Pericial - Processo nº 2023.01.001"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="doc-number">Número do Documento</Label>
                <Input
                  id="doc-number"
                  placeholder="Número ou código de identificação do documento"
                  defaultValue="LP-2023-001"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="footer-text">Texto do Rodapé</Label>
                <Input
                  id="footer-text"
                  placeholder="Texto que aparecerá no rodapé de todas as páginas"
                  defaultValue="Documento gerado pelo PeritoHub - www.peritohub.com.br"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do PDF</CardTitle>
              <CardDescription>
                Configure as opções de geração do arquivo PDF
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
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="use-letterhead">Usar papel timbrado</Label>
                  <Switch 
                    id="use-letterhead" 
                    checked={documentOptions.useLetterhead}
                    onCheckedChange={() => toggleOption('useLetterhead')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="use-page-numbers">Numeração de páginas</Label>
                  <Switch 
                    id="use-page-numbers" 
                    checked={documentOptions.usePageNumbers}
                    onCheckedChange={() => toggleOption('usePageNumbers')}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="compression">Compressão do PDF</Label>
                <Select 
                  value={documentOptions.compressionLevel}
                  onValueChange={(value: any) => setDocumentOptions(prev => ({
                    ...prev,
                    compressionLevel: value
                  }))}
                >
                  <SelectTrigger id="compression">
                    <SelectValue placeholder="Nível de compressão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa (melhor qualidade)</SelectItem>
                    <SelectItem value="medium">Média (recomendado)</SelectItem>
                    <SelectItem value="high">Alta (menor tamanho)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="embed-fonts">Incorporar fontes</Label>
                <Switch 
                  id="embed-fonts" 
                  checked={documentOptions.embedFonts}
                  onCheckedChange={() => toggleOption('embedFonts')}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 flex justify-between">
              <Button variant="outline">Restaurar Padrões</Button>
              <Button variant="default">Salvar Configurações</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Segurança do Documento</CardTitle>
              <CardDescription>
                Configure as opções de segurança do PDF
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="protect-document">Proteger com senha</Label>
                <Switch id="protect-document" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-password">Senha do documento</Label>
                  <Input
                    id="doc-password"
                    type="password"
                    placeholder="Senha para abrir o documento"
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="permissions-password">Senha de permissões</Label>
                  <Input
                    id="permissions-password"
                    type="password"
                    placeholder="Senha para modificar permissões"
                    disabled
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Permissões do documento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="allow-print" disabled />
                    <Label htmlFor="allow-print">Permitir impressão</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="allow-copy" disabled />
                    <Label htmlFor="allow-copy">Permitir cópia de conteúdo</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="allow-edit" disabled />
                    <Label htmlFor="allow-edit">Permitir edição</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="allow-notes" disabled />
                    <Label htmlFor="allow-notes">Permitir anotações</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Ações</CardTitle>
          <CardDescription>
            Opções para o documento gerado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
              <Eye className="h-5 w-5 mb-2" />
              <span>Visualizar</span>
            </Button>
            <Button className="w-full h-20 flex flex-col items-center justify-center" onClick={handleGeneratePDF}>
              <FileOutput className="h-5 w-5 mb-2" />
              <span>Gerar PDF</span>
            </Button>
            <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center">
              <Download className="h-5 w-5 mb-2" />
              <span>Download</span>
            </Button>
            <Button variant="secondary" className="w-full h-20 flex flex-col items-center justify-center">
              <Paperclip className="h-5 w-5 mb-2" />
              <span>Anexar ao Processo</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
