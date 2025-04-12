
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  CalendarIcon, 
  Briefcase, 
  Building,
  ChevronsUpDown, 
  User,
  DollarSign 
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formSchema = z.object({
  numero: z.string().min(15, {
    message: "Número do processo precisa estar no formato judicial (mínimo 15 caracteres)",
  }),
  vara: z.string().min(3, {
    message: "Nome da vara é obrigatório",
  }),
  tipo: z.string().min(1, {
    message: "Tipo de perícia é obrigatório",
  }),
  dataPrazo: z.date({
    required_error: "Data do prazo é obrigatória",
  }),
  parte: z.string().min(3, {
    message: "Nome da parte é obrigatório",
  }),
  descricao: z.string().optional(),
  valorHonorarios: z.string().min(1, {
    message: "Valor dos honorários é obrigatório",
  }),
});

export default function ProcessoForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numero: '',
      vara: '',
      tipo: '',
      parte: '',
      descricao: '',
      valorHonorarios: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Aqui seria feita a integração com a API
      console.log("Dados do processo:", values);
      
      // Simulando uma chamada de API com timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Processo cadastrado com sucesso!");
      navigate('/processos');
    } catch (error) {
      console.error("Erro ao cadastrar processo:", error);
      toast.error("Erro ao cadastrar processo. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/processos')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Cadastrar Novo Processo</h2>
          <p className="text-muted-foreground">
            Preencha as informações do processo judicial
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Processo</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="numero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número do Processo</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="0000000-00.0000.0.00.0000" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Formato CNJ completo
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vara"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vara/Comarca</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: 3ª Vara Cível de São Paulo" 
                          {...field} 
                        />
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
                      <FormLabel>Tipo de Perícia</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de perícia" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Perícia Contábil">Perícia Contábil</SelectItem>
                          <SelectItem value="Perícia Médica">Perícia Médica</SelectItem>
                          <SelectItem value="Perícia de Engenharia">Perícia de Engenharia</SelectItem>
                          <SelectItem value="Perícia de TI">Perícia de TI</SelectItem>
                          <SelectItem value="Perícia Grafotécnica">Perícia Grafotécnica</SelectItem>
                          <SelectItem value="Perícia Ambiental">Perícia Ambiental</SelectItem>
                          <SelectItem value="Outra">Outra</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dataPrazo"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Prazo de Entrega</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy", { locale: ptBR })
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parte"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parte Principal</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-8" 
                            placeholder="Nome da parte requerente/requerida" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="valorHonorarios"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor dos Honorários</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-8" 
                            placeholder="0,00" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição/Observações</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Observações relevantes sobre o processo" 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => navigate('/processos')}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Salvando..." : "Salvar Processo"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
