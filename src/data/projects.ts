import type { Project } from "./types";

/**
 * Real projects.
 *
 * Editing workflow:
 *   - Add a project    = push one object into this array
 *   - Remove a project = delete the object
 *   - Reorder          = reorder the array; the UI renders in array order
 *
 * No component code needs to change for any of those operations.
 *
 * Each project's `codeUrl` points to its own repo on github.com/FutureGD,
 * never to the generic profile link.
 */
export const projects: Project[] = [
  {
    id: "arena-survivor",
    title: "Arena Survivor",
    category: "Multiplayer / Arena",
    status: "in-progress",
    description:
      "Scalable multiplayer arena game for 4–8 players plus 20 AI bots, built with Unity 6, Netcode for GameObjects, Unity Gaming Services, and Firebase. Includes a C++ native A* pathfinding plugin that's roughly 2x faster than the equivalent C# implementation.",
    caseStudy: {
      problem:
        "A* pathfinding in C# was becoming a bottleneck with 20 AI bots navigating a dynamic arena — frame times spiked whenever obstacles moved and the NavMesh had to re-bake.",
      approach:
        "Wrote a standalone C++ A* implementation as a native plugin (.dll/.so) and integrated it into Unity via DllImport. The plugin handles pathfinding for all AI bots; C# handles game logic and rendering. Pathfinding now runs in ~half the time of the previous C# version.",
      challenge:
        "Marshalling the path data between C++ and C# without GC pressure. Solved by pre-allocating a fixed-size buffer in C# and passing it to the C++ side, which fills it in-place — no per-frame allocations.",
      outcome:
        "Roughly 2x faster pathfinding vs. the C# baseline. The plugin is reusable across projects and lives in its own repo (arena-survivor-ai-plugin) so it can be developed independently of the game client.",
    },
    tech: ["Unity 6", "C#", "C++", "Netcode for GameObjects", "Unity Gaming Services", "Firebase"],
    thumbnail: "/projects/arena-survivor.svg",
    codeUrl: "https://github.com/FutureGD/arena-survivor",
    // No demoUrl yet — the game is still in development.
  },
  {
    id: "obstacle-avoidance",
    title: "Obstacle Avoidance (Endless Runner)",
    category: "Endless Runner",
    status: "completed",
    description:
      "3D endless runner where the player navigates a vehicle through oncoming traffic. Focus on smooth player controls and reactive collision detection, with a dynamic obstacle spawning system tuned for a satisfying difficulty curve.",
    tech: ["Unity", "C#"],
    thumbnail: "/projects/obstacle-avoidance.svg",
    codeUrl: "https://github.com/FutureGD",
    // TODO: replace codeUrl with the project's own repo once a dedicated
    // repo is created on github.com/FutureGD. The current URL points to
    // the profile page as a fallback — replace before going live.
  },
  {
    id: "cube-runner-snake",
    title: "Cube Runner & Snake",
    category: "Prototypes",
    status: "completed",
    description:
      "Two prototypes exploring core gameplay loops in 2D and 3D. Handled player input, score tracking, game-over states, Unity's physics engine, rigidbodies, and basic UI integration for menus and point displays.",
    tech: ["Unity", "C#"],
    thumbnail: "/projects/cube-runner-snake.svg",
    codeUrl: "https://github.com/FutureGD",
    // TODO: replace codeUrl with the project's own repo once a dedicated
    // repo is created on github.com/FutureGD. The current URL points to
    // the profile page as a fallback — replace before going live.
  },
  {
    id: "brick-breaker",
    title: "Brick Breaker",
    category: "Classic / Prototype",
    status: "completed",
    description:
      "Second entry in a warm-up project series. Classic brick-breaker gameplay built to practice core Unity patterns — collisions, paddle physics, score tracking, level progression.",
    tech: ["Unity", "C#"],
    thumbnail: "/projects/brick-breaker.svg",
    codeUrl: "https://github.com/FutureGD/p2-brickbreaker",
  },
  {
    id: "pong",
    title: "Pong",
    category: "Classic / Prototype",
    status: "completed",
    description:
      "First entry in a warm-up project series. Pong built from scratch — paddle controls, ball physics, collision detection, and score tracking. Established the workflow used for the rest of the series.",
    tech: ["Unity", "C#"],
    thumbnail: "/projects/pong.svg",
    codeUrl: "https://github.com/FutureGD/p1-pong",
  },
  {
    id: "alien-shooter",
    title: "Alien Shooter",
    category: "2D Platformer",
    status: "prototype",
    description:
      "2D platformer alien shooter. Early-stage prototype — exploring what the game wants to be. Built to practice 2D level design, enemy AI, and platformer character controllers in Unity.",
    tech: ["Unity", "C#"],
    thumbnail: "/projects/alien-shooter.svg",
    codeUrl: "https://github.com/FutureGD/AlienShooter",
  },
];
