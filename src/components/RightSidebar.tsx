import { TrendingUp, Search, SlidersHorizontal } from "lucide-react";

const trendingTopics = [
  { rank: "01", name: "Tecnologia", posts: "90K Posts", percentage: "8.5%" },
  { rank: "02", name: "Jogos", posts: "9,989 Posts", percentage: "6.2%" },
  { rank: "03", name: "Memes", posts: "7,968 Posts", percentage: "5.2%" },
  { rank: "05", name: "Política", posts: "1,965 Posts", percentage: "4.4%" },
];

const recentActivities = [
  {
    user: "Joker",
    action: "curtiu um tweet.",
    time: "há cerca de 7 horas",
  },
  {
    user: "Joker",
    action: "curtiu um tweet.",
    time: "há 1 dia",
  },
  {
    user: "Joker",
    action: "curtiu um tweet.",
    time: "há 4 dias",
  },
  {
    user: "Joker",
    action: "respondeu a um tweet.",
    time: "há 9 dias",
  },
  {
    user: "Joker Hacker",
    action: "respondeu a um tweet.",
    time: "há 9 dias",
  },
];

export const RightSidebar = () => {
  console.log("RightSidebar rendering - trendingTopics:", trendingTopics.length, "recentActivities:", recentActivities.length);
  
  return (
    <aside className="hidden lg:block fixed right-0 top-16 bottom-0 w-80 overflow-y-auto p-4 space-y-4">
      {/* Search Input */}
      <div className="flex justify-center mb-6 min-h-[90px]">
        <div id="main" className="relative z-10">
          <div id="poda">
            <div className="glow"></div>
            <div className="darkBorderBg"></div>
            <div className="white"></div>
            <div className="border"></div>
            <div id="pink-mask"></div>
            <div id="input-mask"></div>
            <input className="input" type="text" placeholder="Pesquisar..." />
            <Search id="search-icon" className="w-5 h-5 text-muted-foreground" />
            <div id="filter-icon">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="filterBorder"></div>
          </div>
        </div>
      </div>

      {/* Tópicos em Alta */}
      <div 
        className="card-gradient rounded-lg border border-border p-4 backdrop-blur-sm" 
        style={{background: "red"}}
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h2 className="font-semibold text-foreground">Tópicos em Alta</h2>
        </div>
        <div className="space-y-0">
          {trendingTopics.map((topic, index) => (
            <div
              key={topic.name}
              className={`flex items-center justify-between py-3 hover:bg-secondary/50 -mx-4 px-4 cursor-pointer transition-colors ${
                index !== trendingTopics.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-muted-foreground/50">{topic.rank}</span>
                <div>
                  <p className="font-medium text-foreground">{topic.name}</p>
                  <p className="text-xs text-muted-foreground">{topic.posts}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-accent">{topic.percentage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Atividades Recentes */}
      <div className="card-gradient rounded-lg border border-border p-4 backdrop-blur-sm">
        <h2 className="font-semibold text-foreground mb-4">Atividades Recentes</h2>
        <div className="space-y-0">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className={`py-3 hover:bg-secondary/50 -mx-4 px-4 cursor-pointer transition-colors ${
                index !== recentActivities.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <p className="text-sm text-foreground">
                <span className="font-semibold">{activity.user}</span>{" "}
                <span className="font-normal">{activity.action}</span>
              </p>
              <p className="text-xs text-accent mt-1">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
