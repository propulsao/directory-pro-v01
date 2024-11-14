"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, CheckCircle, Globe2, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [progress] = useState(80);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total de Listagens</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Listagens Ativas</p>
              <p className="text-2xl font-bold">18</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Globe2 className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Diretórios</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <AlertCircle className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold">6</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Section */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Progresso de Listagens</h2>
        <Progress value={progress} className="mb-2" />
        <p className="text-sm text-muted-foreground">
          {progress}% das listagens estão ativas
        </p>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Listagens Ativas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="directories">Diretórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Listagens Ativas</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Empresa {i}</p>
                    <p className="text-sm text-muted-foreground">Google Meu Negócio</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Listagens Pendentes</h3>
            <p className="text-muted-foreground">Listagens aguardando aprovação...</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="directories">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Diretórios Disponíveis</h3>
            <p className="text-muted-foreground">Lista de diretórios suportados...</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}