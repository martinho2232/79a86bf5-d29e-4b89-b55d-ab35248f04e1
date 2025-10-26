import { useState } from "react";
import { Camera, Mail, User, ImageIcon, BarChart3, Heart, MessageCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { toast } from "sonner";

export default function Settings() {
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [bio, setBio] = useState("Desenvolvedor apaixonado por tecnologia e inovação. Criando soluções que fazem a diferença.");
  const [email, setEmail] = useState("usuario@example.com");
  const [name, setName] = useState("Melina Costa");

  // Mock stats
  const stats = {
    interactions: 1247,
    likes: 3842,
    posts: 127,
    followers: 892
  };

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  const handleImageUpload = (type: "profile" | "cover") => {
    // Placeholder for image upload functionality
    toast.info(`Funcionalidade de upload de ${type === "profile" ? "foto de perfil" : "capa"} será implementada`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex pt-16">
        <LeftSidebar />
        <main className="flex-1 lg:ml-64 lg:mr-80 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Page Title */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
              <p className="text-muted-foreground">Gerencie suas informações e preferências</p>
            </div>

            {/* Cover Image Section */}
            <Card className="card-gradient border-border">
              <CardContent className="p-0">
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg overflow-hidden group">
                  {coverImage ? (
                    <img src={coverImage} alt="Capa" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-muted-foreground/50" />
                    </div>
                  )}
                  <button
                    onClick={() => handleImageUpload("cover")}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="flex flex-col items-center gap-2 text-white">
                      <Camera className="w-8 h-8" />
                      <span className="text-sm font-medium">Alterar Capa</span>
                    </div>
                  </button>
                </div>

                {/* Profile Image */}
                <div className="px-6 -mt-16 relative z-10">
                  <div className="relative inline-block group">
                    <Avatar className="w-32 h-32 border-4 border-card">
                      <AvatarImage src={profileImage} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                        {name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <button
                      onClick={() => handleImageUpload("profile")}
                      className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4">
                  <h2 className="text-xl font-bold text-foreground">{name}</h2>
                  <p className="text-sm text-muted-foreground">{email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Statistics Card */}
            <Card className="card-gradient border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Estatísticas do Perfil
                </CardTitle>
                <CardDescription>Suas métricas de engajamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#0A0A0A] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{stats.interactions}</div>
                    <div className="text-xs text-muted-foreground mt-1">Interações</div>
                  </div>
                  <div className="bg-[#0A0A0A] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{stats.likes}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                      <Heart className="w-3 h-3" />
                      Likes
                    </div>
                  </div>
                  <div className="bg-[#0A0A0A] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{stats.posts}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      Posts
                    </div>
                  </div>
                  <div className="bg-[#0A0A0A] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{stats.followers}</div>
                    <div className="text-xs text-muted-foreground mt-1">Seguidores</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="card-gradient border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Informações Pessoais
                </CardTitle>
                <CardDescription>Atualize seus dados pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#0A0A0A] border-border"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#0A0A0A] border-border"
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="bg-[#0A0A0A] border-border min-h-[120px] resize-none"
                    placeholder="Conte um pouco sobre você..."
                    maxLength={200}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {bio.length}/200 caracteres
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Account Preferences */}
            <Card className="card-gradient border-border">
              <CardHeader>
                <CardTitle>Preferências da Conta</CardTitle>
                <CardDescription>Configurações adicionais da sua conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Perfil Público</h4>
                    <p className="text-xs text-muted-foreground">Permitir que outros usuários vejam seu perfil</p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-primary w-5 h-5" />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Notificações por Email</h4>
                    <p className="text-xs text-muted-foreground">Receber atualizações por email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-primary w-5 h-5" />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Mostrar Estatísticas</h4>
                    <p className="text-xs text-muted-foreground">Exibir suas estatísticas no perfil</p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-primary w-5 h-5" />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-4 pb-6">
              <Button variant="outline" className="gap-2">
                Cancelar
              </Button>
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 gap-2">
                <Save className="w-4 h-4" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}
