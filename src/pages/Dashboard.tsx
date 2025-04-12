
import React from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  BarChart3, 
  Briefcase, 
  Calendar, 
  Clock, 
  DollarSign, 
  FileText, 
  PieChart 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  // Mock data
  const stats = [
    {
      title: 'Processos Ativos',
      value: '12',
      change: '+2',
      increasing: true,
      icon: Briefcase
    },
    {
      title: 'Laudos Pendentes',
      value: '5',
      change: '-1',
      increasing: false,
      icon: FileText
    },
    {
      title: 'Honorários Pendentes',
      value: 'R$ 25.450',
      change: '+R$ 4.500',
      increasing: true,
      icon: DollarSign
    },
    {
      title: 'Processos Concluídos',
      value: '145',
      change: '+3',
      increasing: true,
      icon: BarChart3
    }
  ];

  const upcomingDeadlines = [
    {
      process: '0001234-56.2023.8.26.0100',
      title: 'Entrega de Laudo',
      date: '25/04/2025',
      daysLeft: 8
    },
    {
      process: '0007654-32.2023.8.26.0100',
      title: 'Reunião com cliente',
      date: '20/04/2025',
      daysLeft: 3
    },
    {
      process: '0009876-54.2023.8.26.0100',
      title: 'Prazo para esclarecimentos',
      date: '30/04/2025',
      daysLeft: 13
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Bem-vindo, {user?.name}. Aqui está um resumo das suas atividades.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <PieChart className="mr-2 h-4 w-4" />
            Relatórios
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Calendário
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs">
                {stat.increasing ? (
                  <ArrowUp className="mr-1 h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDown className="mr-1 h-4 w-4 text-rose-500" />
                )}
                <span
                  className={
                    stat.increasing ? "text-emerald-500" : "text-rose-500"
                  }
                >
                  {stat.change}
                </span>
                <span className="ml-1 text-muted-foreground">
                  desde o último mês
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Fluxo Financeiro</CardTitle>
            <CardDescription>
              Resumo de honorários recebidos e a receber
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md">
              <span className="text-muted-foreground">Gráfico de fluxo financeiro</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Prazos Próximos</CardTitle>
            <CardDescription>
              Eventos e entregas com prazo próximo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{deadline.title}</div>
                      <div className="text-xs text-muted-foreground">
                        Processo: {deadline.process}
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{deadline.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Progress value={100 - (deadline.daysLeft * 5)} className="h-2" />
                    <span className="ml-2 text-xs font-medium">
                      {deadline.daysLeft} dias
                    </span>
                  </div>
                  {i < upcomingDeadlines.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
