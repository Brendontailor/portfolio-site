export type LabItem = {
  id: string;
  name: string;
  file: string;
  label: string;
  visibility: "Público" | "Privado" | "Pessoal";
  description: string;
  tags: string[];
  href?: string;
  code: string;
  size: "featured" | "side" | "wide" | "small";
};

export const labItems: LabItem[] = [
  {
    id: "01",
    name: "AED2 — Labirinto",
    file: "labirinto.ts",
    label: "Estudo de algoritmos",
    visibility: "Público",
    description:
      "Estudo público de estruturas de dados e caminhos em grid. O exercício vira laboratório para comparar BFS, DFS e critérios de custo.",
    tags: ["Algoritmos", "Estruturas de dados", "Pathfinding", "TypeScript"],
    href: "https://github.com/Brendontailor/aed2_labirinto",
    code: `// labirinto.ts
const queue = [start];
const seen = new Set([key(start)]);

while (queue.length) {
  const cell = queue.shift()!;
  if (isExit(cell)) return pathTo(cell);

  for (const next of neighbors(cell)) {
    if (!seen.has(key(next))) {
      seen.add(key(next));
      queue.push(next);
    }
  }
}`,
    size: "featured",
  },
  {
    id: "02",
    name: "Singleton",
    file: "catalog.py",
    label: "Estudo de padrões",
    visibility: "Privado",
    description:
      "Exercício de padrões de projeto aplicado a um catálogo: uma instância compartilhada, inicialização controlada e o custo de acoplar demais.",
    tags: ["Design patterns", "Python", "Clean code"],
    code: `# catalog.py
class Catalog:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance`,
    size: "side",
  },
  {
    id: "03",
    name: "Quicksort",
    file: "quicksort.ts",
    label: "Estudo de complexidade",
    visibility: "Privado",
    description:
      "Implementação e análise de um clássico. O objetivo não é decorar o algoritmo, é entender por que o caso médio e o pior caso são diferentes.",
    tags: ["Algoritmos", "Complexidade", "Recursão"],
    code: `// quicksort.ts
function quicksort(xs: number[]): number[] {
  if (xs.length < 2) return xs;

  const [pivot, ...rest] = xs;
  return [
    ...quicksort(rest.filter(x => x < pivot)),
    pivot,
    ...quicksort(rest.filter(x => x >= pivot)),
  ];
}`,
    size: "small",
  },
  {
    id: "04",
    name: "Emberblade",
    file: "player.gd",
    label: "Projeto pessoal",
    visibility: "Pessoal",
    description:
      "Um jogo autoral em Godot para exercitar estado, ritmo, colisão e a parte que nenhum CRUD ensina: fazer a interação parecer boa.",
    tags: ["Godot", "GDScript", "Game feel", "Estado"],
    code: `# player.gd
func _physics_process(delta):
    match state:
        IDLE:
            if Input.is_action_just_pressed("attack"):
                state = ATTACK
                hitbox.activate()
        ATTACK:
            if animation_finished:
                state = IDLE`,
    size: "wide",
  },
];
