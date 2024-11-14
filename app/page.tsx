import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, CheckCircle, Globe2, Zap } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Automatize suas Listagens em Diretórios
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Aumente sua visibilidade online automaticamente em dezenas de diretórios com apenas alguns cliques
          </p>
          <Button size="lg" className="mr-4">
            Começar Agora
          </Button>
          <Button size="lg" variant="outline">
            Ver Demo
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que escolher nossa plataforma?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <Zap className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Automação Completa</h3>
              <p className="text-muted-foreground">
                Automatize o processo de listagem em múltiplos diretórios com um único cadastro
              </p>
            </Card>
            <Card className="p-6">
              <Globe2 className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Alcance Global</h3>
              <p className="text-muted-foreground">
                Presença garantida nos principais diretórios e plataformas online
              </p>
            </Card>
            <Card className="p-6">
              <CheckCircle className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Monitoramento</h3>
              <p className="text-muted-foreground">
                Acompanhe o status de suas listagens em tempo real
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Planos que se adaptam ao seu negócio
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Básico",
                price: "R$ 49",
                features: ["5 diretórios", "Atualização mensal", "Suporte básico"],
              },
              {
                name: "Profissional",
                price: "R$ 99",
                features: ["15 diretórios", "Atualização semanal", "Suporte prioritário"],
              },
              {
                name: "Empresarial",
                price: "R$ 199",
                features: ["Diretórios ilimitados", "Atualização diária", "Suporte VIP"],
              },
            ].map((plan) => (
              <Card key={plan.name} className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-4">{plan.price}<span className="text-sm text-muted-foreground">/mês</span></p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Selecionar Plano</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}