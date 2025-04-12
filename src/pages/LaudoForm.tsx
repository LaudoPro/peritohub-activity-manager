
import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  FileText, 
  ChevronDown,
  Trash2,
  Plus,
  Download,
  Image as ImageIcon,
  Check
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter,
  CardDescription 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  titulo: z.string().min(3, {
    message: "Título do laudo é obrigatório",
  }),
  conclusao: z.string().min(10, {
    message: "Conclusão é obrigatória e deve ter pelo menos 10 caracteres",
  }),
  metodologia: z.string().optional(),
  introducao: z.string().optional(),
  analise: z.string().min(10, {
    message: "A análise técnica é obrigatória e deve ter pelo menos 10 caracteres",
  }),
  tipo: z.string({
    required_error: "Tipo de laudo é obrigatório",
  }),
});

// Simulação de dados de um processo
const mockProcesso = {
  id: "1",
  numero: "0001234-56.2023.8.26.0100",
  vara: "3ª Vara Cível",
  tipo: "Perícia Contábil",
  dataDesignacao: "10/03/2025",
  status: "Em andamento",
  prazo: "25/04/2025",
  parte: "Banco XYZ S.A.",
  honorarios: "R$ 5.800,00"
};

export default function LaudoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fotos, setFotos] = useState<{ id: number; file: File; preview: string }[]>([]);
  const [anexos, setAnexos] = useState<{ id: number; file: File; nome: string; tipo: string }[]>([]);
  const [previewFoto, setPreviewFoto] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState("conteudo");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fotoInputRef = useRef<HTMLInputElement>(null);

  const processo = mockProcesso;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: `Laudo Pericial - Processo ${processo.numero}`,
      tipo: processo.tipo,
      introducao: "",
      metodologia: "",
      analise: "",
      conclusao: "",
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newAnexos = Array.from(event.target.files).map((file, index) => ({
        id: Date.now() + index,
        file,
        nome: file.name,
        tipo: file.type
      }));
      
      setAnexos(prev => [...prev, ...newAnexos]);
      toast.success(`${newAnexos.length} documento(s) anexado(s) com sucesso!`);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFotos = Array.from(event.target.files).map((file, index) => {
        const preview = URL.createObjectURL(file);
        return {
          id: Date.now() + index,
          file,
          preview
        };
      });
      
      setFotos(prev => [...prev, ...newFotos]);
      toast.success(`${newFotos.length} foto(s) adicionada(s) com sucesso!`);
      
      if (fotoInputRef.current) {
        fotoInputRef.current.value = '';
      }
    }
  };

  const handleRemoveAnexo = (id: number) => {
    setAnexos(prev => prev.filter(anexo => anexo.id !== id));
    toast.info("Documento removido");
  };

  const handleRemoveFoto = (id: number) => {
    const fotoToRemove = fotos.find(foto => foto.id === id);
    if (fotoToRemove) {
      URL.revokeObjectURL(fotoToRemove.preview);
    }
    
    setFotos(prev => prev.filter(foto => foto.id !== id));
    toast.info("Foto removida");
  };

  const handlePreviewFoto = (preview: string) => {
    setPreviewFoto(preview);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Simulando envio para API
      console.log("Dados do laudo:", values);
      console.log("Fotos:", fotos);
      console.log("Anexos:", anexos);
      
      // Simulando processamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Laudo salvo com sucesso!");
      navigate('/laudos');
    } catch (error) {
      console.error("Erro ao salvar laudo:", error);
      toast.error("Erro ao salvar laudo. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGeneratePDF = () => {
    toast.success("Gerando PDF do laudo...", { duration: 2000 });
    // Aqui seria implementada a geração real do PDF
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/laudos')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Elaborar Laudo Pericial</h2>
            <p className="text-muted-foreground">
              Processo: {processo.numero} - {processo.vara}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleGeneratePDF}>
            <Download className="mr-2 h-4 w-4" />
            Gerar PDF
          </Button>
          <Button 
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Salvando..." : "Salvar Laudo"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Processo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Número do Processo</h4>
              <p className="font-medium">{processo.numero}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Vara/Comarca</h4>
              <p className="font-medium">{processo.vara}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Tipo de Perícia</h4>
              <p className="font-medium">{processo.tipo}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Parte Principal</h4>
              <p className="font-medium">{processo.parte}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Prazo de Entrega</h4>
              <p className="font-medium">{processo.prazo}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Honorários</h4>
              <p className="font-medium">{processo.honorarios}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="conteudo">Conteúdo do Laudo</TabsTrigger>
          <TabsTrigger value="fotos">Relatório Fotográfico</TabsTrigger>
          <TabsTrigger value="anexos">Documentos Anexos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="conteudo" className="space-y-4 pt-4">
          <Form {...form}>
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título do Laudo</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Laudo</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de laudo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Perícia Contábil">Perícia Contábil</SelectItem>
                          <SelectItem value="Perícia Médica">Perícia Médica</SelectItem>
                          <SelectItem value="Perícia de Engenharia">Perícia de Engenharia</SelectItem>
                          <SelectItem value="Perícia de TI">Perícia de TI</SelectItem>
                          <SelectItem value="Perícia Grafotécnica">Perícia Grafotécnica</SelectItem>
                          <SelectItem value="Perícia Ambiental">Perícia Ambiental</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="introducao">
                  <AccordionTrigger>Introdução</AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="introducao"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea 
                              placeholder="Introdução do laudo pericial..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="metodologia">
                  <AccordionTrigger>Metodologia</AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="metodologia"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea 
                              placeholder="Metodologia utilizada na perícia..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="analise" defaultValue="analise">
                  <AccordionTrigger>Análise Técnica</AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="analise"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea 
                              placeholder="Análise técnica dos elementos periciais..." 
                              className="min-h-[250px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="conclusao">
                  <AccordionTrigger>Conclusão</AccordionTrigger>
                  <AccordionContent>
                    <FormField
                      control={form.control}
                      name="conclusao"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea 
                              placeholder="Conclusão do laudo pericial..." 
                              className="min-h-[200px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="fotos" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Fotográfico</CardTitle>
              <CardDescription>
                Adicione fotos para ilustrar seu laudo pericial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-center justify-center w-full">
                  <label 
                    htmlFor="foto-upload" 
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-10 h-10 mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Clique para adicionar fotos</span> ou arraste e solte
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG ou JPEG (máx. 10MB por arquivo)
                      </p>
                    </div>
                    <input 
                      id="foto-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      multiple 
                      onChange={handleFotoUpload}
                      ref={fotoInputRef}
                    />
                  </label>
                </div>

                {fotos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {fotos.map((foto) => (
                      <div 
                        key={foto.id} 
                        className="relative group border rounded-lg overflow-hidden"
                      >
                        <img 
                          src={foto.preview} 
                          alt="Foto" 
                          className="w-full h-48 object-cover" 
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <Button 
                              size="icon" 
                              variant="secondary"
                              onClick={() => handlePreviewFoto(foto.preview)}
                            >
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="destructive"
                              onClick={() => handleRemoveFoto(foto.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {fotos.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Nenhuma foto adicionada ainda.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Dialog open={!!previewFoto} onOpenChange={(open) => !open && setPreviewFoto(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Visualização da Foto</DialogTitle>
              </DialogHeader>
              {previewFoto && (
                <div className="flex justify-center">
                  <img 
                    src={previewFoto} 
                    alt="Visualização" 
                    className="max-h-[70vh] object-contain"
                  />
                </div>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="anexos" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Anexos</CardTitle>
              <CardDescription>
                Adicione documentos que complementam seu laudo pericial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="flex items-center justify-center w-full">
                  <label 
                    htmlFor="file-upload" 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">Clique para anexar documentos</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOC, DOCX, XLS, XLSX (máx. 20MB)
                      </p>
                    </div>
                    <input 
                      id="file-upload" 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.doc,.docx,.xls,.xlsx" 
                      multiple 
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                    />
                  </label>
                </div>

                {anexos.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-3 text-sm font-medium">
                      Documentos Anexados ({anexos.length})
                    </div>
                    <div className="divide-y">
                      {anexos.map((anexo) => (
                        <div key={anexo.id} className="flex items-center justify-between p-3">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 flex-shrink-0 text-muted-foreground" />
                            <div className="truncate">
                              <p className="font-medium truncate">{anexo.nome}</p>
                              <p className="text-xs text-muted-foreground">
                                {(anexo.file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            onClick={() => handleRemoveAnexo(anexo.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Nenhum documento anexado ainda.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button 
          variant="outline" 
          onClick={() => navigate('/laudos')}
        >
          Cancelar
        </Button>
        <Button 
          onClick={form.handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Salvando..." : "Salvar Laudo"}
        </Button>
      </div>
    </div>
  );
}
