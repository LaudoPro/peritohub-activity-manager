
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  File, 
  FileText, 
  Filter, 
  Plus, 
  Search,
  SlidersHorizontal,
  Calendar,
  Download,
  Eye
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

// Mock data para laudos
const laudosMock = [
  {
    id: '1',
    titulo: 'Laudo Pericial - Processo 0001234-56.2023.8.26.0100',
    numeroProcesso: '0001234-56.2023.8.26.0100',
    vara: '3ª Vara Cível',
    tipo: 'Perícia Contábil',
    dataCriacao: '15/03/2025',
    status: 'Em elaboração',
    dataEntrega: '25/04/2025',
    qtdAnexos: 3,
    qtdFotos: 5
  },
  {
    id: '2',
    titulo: 'Laudo Técnico - Processo 0007654-32.2023.8.26.0100',
    numeroProcesso: '0007654-32.2023.8.26.0100',
    vara: '5ª Vara Cível',
    tipo: 'Perícia Médica',
    dataCriacao: '20/02/2025',
    status: 'Finalizado',
    dataEntrega: '18/03/2025',
    qtdAnexos: 8,
    qtdFotos: 12
  },
  {
    id: '3',
    titulo: 'Laudo de Avaliação - Processo 0009876-54.2023.8.26.0100',
    numeroProcesso: '0009876-54.2023.8.26.0100',
    vara: '2ª Vara Empresarial',
    tipo: 'Perícia de Engenharia',
    dataCriacao: '05/01/2025',
    status: 'Em revisão',
    dataEntrega: '30/04/2025',
    qtdAnexos: 6,
    qtdFotos: 24
  },
  {
    id: '4',
    titulo: 'Relatório Pericial - Processo 0002345-67.2023.8.26.0100',
    numeroProcesso: '0002345-67.2023.8.26.0100',
    vara: '1ª Vara da Família',
    tipo: 'Perícia Contábil',
    dataCriacao: '25/02/2025',
    status: 'Entregue',
    dataEntrega: '15/03/2025',
    qtdAnexos: 4,
    qtdFotos: 0
  }
];

export default function Laudos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');

  const filteredLaudos = laudosMock.filter(laudo => {
    const matchesSearch = 
      laudo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laudo.numeroProcesso.includes(searchTerm);
      
    const matchesStatus = statusFilter === '' || laudo.status === statusFilter;
    const matchesTipo = tipoFilter === '' || laudo.tipo === tipoFilter;
    
    return matchesSearch && matchesStatus && matchesTipo;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Em elaboração':
        return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-300">Em elaboração</Badge>;
      case 'Em revisão':
        return <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300">Em revisão</Badge>;
      case 'Finalizado':
        return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300">Finalizado</Badge>;
      case 'Entregue':
        return <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-300">Entregue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Laudos Periciais</h2>
          <p className="text-muted-foreground">
            Gerencie seus laudos e relatórios periciais
          </p>
        </div>
        <Button onClick={() => navigate('/laudos/novo')}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Laudo
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Lista de Laudos</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-4">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por título ou número do processo..."
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
                  <SelectItem value="Em elaboração">Em elaboração</SelectItem>
                  <SelectItem value="Em revisão">Em revisão</SelectItem>
                  <SelectItem value="Finalizado">Finalizado</SelectItem>
                  <SelectItem value="Entregue">Entregue</SelectItem>
                </SelectContent>
              </Select>

              <Select value={tipoFilter} onValueChange={setTipoFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo de Perícia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os tipos</SelectItem>
                  <SelectItem value="Perícia Contábil">Perícia Contábil</SelectItem>
                  <SelectItem value="Perícia Médica">Perícia Médica</SelectItem>
                  <SelectItem value="Perícia de Engenharia">Perícia de Engenharia</SelectItem>
                  <SelectItem value="Perícia de TI">Perícia de TI</SelectItem>
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
                  <DropdownMenuItem>Por data de criação</DropdownMenuItem>
                  <DropdownMenuItem>Por data de entrega</DropdownMenuItem>
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
                  <TableHead className="w-[40%]">Título</TableHead>
                  <TableHead>Processo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Entrega</TableHead>
                  <TableHead className="text-center">Anexos</TableHead>
                  <TableHead className="text-center">Fotos</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLaudos.length > 0 ? (
                  filteredLaudos.map((laudo) => (
                    <TableRow key={laudo.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          <span className="line-clamp-1">{laudo.titulo}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <a href={`/processos/${laudo.id}`} className="text-primary hover:underline">
                          {laudo.numeroProcesso}
                        </a>
                      </TableCell>
                      <TableCell>{laudo.tipo}</TableCell>
                      <TableCell>{getStatusBadge(laudo.status)}</TableCell>
                      <TableCell className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {laudo.dataEntrega}
                      </TableCell>
                      <TableCell className="text-center">
                        {laudo.qtdAnexos > 0 ? (
                          <Badge variant="secondary">{laudo.qtdAnexos}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {laudo.qtdFotos > 0 ? (
                          <Badge variant="secondary">{laudo.qtdFotos}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/laudos/${laudo.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/laudos/${laudo.id}/editar`)}>
                              <FileText className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Baixar PDF
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Nenhum laudo encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Mostrando <span className="font-medium">{filteredLaudos.length}</span> de{" "}
              <span className="font-medium">{laudosMock.length}</span> laudos
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
