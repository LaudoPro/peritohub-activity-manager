
import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  Clock, 
  Download, 
  Filter, 
  Plus, 
  Search,
  SlidersHorizontal 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for processos
const processosMock = [
  {
    id: '1',
    numero: '0001234-56.2023.8.26.0100',
    vara: '3ª Vara Cível',
    tipo: 'Perícia Contábil',
    dataDesignacao: '10/03/2025',
    status: 'Em andamento',
    prazo: '25/04/2025',
    parte: 'Banco XYZ S.A.',
    honorarios: 'R$ 5.800,00'
  },
  {
    id: '2',
    numero: '0007654-32.2023.8.26.0100',
    vara: '5ª Vara Cível',
    tipo: 'Perícia Médica',
    dataDesignacao: '15/02/2025',
    status: 'Aguardando documentos',
    prazo: '20/04/2025',
    parte: 'Maria Silva',
    honorarios: 'R$ 3.500,00'
  },
  {
    id: '3',
    numero: '0009876-54.2023.8.26.0100',
    vara: '2ª Vara Empresarial',
    tipo: 'Perícia de Engenharia',
    dataDesignacao: '05/01/2025',
    status: 'Laudo entregue',
    prazo: '30/04/2025',
    parte: 'Construtora ABC Ltda.',
    honorarios: 'R$ 8.200,00'
  },
  {
    id: '4',
    numero: '0002345-67.2023.8.26.0100',
    vara: '1ª Vara da Família',
    tipo: 'Perícia Contábil',
    dataDesignacao: '20/02/2025',
    status: 'Em andamento',
    prazo: '10/05/2025',
    parte: 'João Oliveira',
    honorarios: 'R$ 4.500,00'
  },
  {
    id: '5',
    numero: '0008765-43.2023.8.26.0100',
    vara: '4ª Vara Cível',
    tipo: 'Perícia de TI',
    dataDesignacao: '18/03/2025',
    status: 'Aguardando audiência',
    prazo: '15/05/2025',
    parte: 'Tech Solutions S.A.',
    honorarios: 'R$ 6.900,00'
  }
];

export default function Processos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredProcessos = processosMock.filter(processo => {
    const matchesSearch = processo.numero.includes(searchTerm) || 
                          processo.parte.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || processo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Em andamento':
        return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-300">Em andamento</Badge>;
      case 'Aguardando documentos':
        return <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300">Aguardando documentos</Badge>;
      case 'Laudo entregue':
        return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300">Laudo entregue</Badge>;
      case 'Aguardando audiência':
        return <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-300">Aguardando audiência</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Processos</h2>
          <p className="text-muted-foreground">
            Gerencie todos os seus processos e acompanhe seus prazos.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Processo
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Lista de Processos</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-4">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por número ou parte..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os status</SelectItem>
                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                  <SelectItem value="Aguardando documentos">Aguardando documentos</SelectItem>
                  <SelectItem value="Laudo entregue">Laudo entregue</SelectItem>
                  <SelectItem value="Aguardando audiência">Aguardando audiência</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtros
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Por vara</DropdownMenuItem>
                  <DropdownMenuItem>Por tipo de perícia</DropdownMenuItem>
                  <DropdownMenuItem>Por data de designação</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número do Processo</TableHead>
                  <TableHead>Vara/Comarca</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Parte</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prazo</TableHead>
                  <TableHead>Honorários</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProcessos.length > 0 ? (
                  filteredProcessos.map((processo) => (
                    <TableRow key={processo.id}>
                      <TableCell className="font-medium">
                        <a href={`/processos/${processo.id}`} className="text-primary hover:underline">
                          {processo.numero}
                        </a>
                      </TableCell>
                      <TableCell>{processo.vara}</TableCell>
                      <TableCell>{processo.tipo}</TableCell>
                      <TableCell>{processo.parte}</TableCell>
                      <TableCell>{getStatusBadge(processo.status)}</TableCell>
                      <TableCell className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {processo.prazo}
                      </TableCell>
                      <TableCell>{processo.honorarios}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Adicionar laudo</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Nenhum processo encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Mostrando <span className="font-medium">{filteredProcessos.length}</span> de{" "}
              <span className="font-medium">{processosMock.length}</span> processos
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled
              >
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
