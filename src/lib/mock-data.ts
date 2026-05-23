export const currentUser = {
  id: "u_youssef",
  name: "Youssef Amrani",
  initials: "YA",
  university: "Université Mohammed V — Rabat",
  program: "SMPC — S4 Chimie",
  bio: "Étudiant SMPC passionné par la chimie organique. Je partage mes notes et résumés pour aider la communauté.",
  points: 120,
  uploads: 18,
  downloads: 52,
  ranking: 3,
  followers: 142,
  following: 38,
  email: "youssef.amrani@um5.ac.ma",
  joined: "Sept. 2023",
  socials: { twitter: "@youssef_a", linkedin: "youssef-amrani", github: "yamrani" },
};

export type ModuleItem = { id: string; name: string; docs: number; color: string; icon: string };

export const modules: ModuleItem[] = [
  { id: "m1", name: "Chimie organique", docs: 42, color: "#2563EB", icon: "FlaskConical" },
  { id: "m2", name: "Mathématiques", docs: 36, color: "#4F46E5", icon: "Sigma" },
  { id: "m3", name: "Physique", docs: 28, color: "#F59E0B", icon: "Atom" },
  { id: "m4", name: "Biologie cellulaire", docs: 19, color: "#16A34A", icon: "Dna" },
  { id: "m5", name: "Informatique", docs: 24, color: "#0EA5E9", icon: "Code" },
  { id: "m6", name: "Statistiques", docs: 14, color: "#E11D48", icon: "BarChart3" },
];

export type Doc = {
  id: string;
  title: string;
  author: string;
  authorInitials: string;
  date: string;
  size: string;
  tags: string[];
  locked?: boolean;
  cost?: number;
};

export const documents: Doc[] = [
  { id: "d1", title: "Résumé Chimie organique — S4", author: "Sara Bennani", authorInitials: "SB", date: "12 Mar 2025", size: "2.4 MB", tags: ["S4", "Résumé", "Chimie"] },
  { id: "d2", title: "TD Mathématiques corrigés", author: "Mehdi Tazi", authorInitials: "MT", date: "08 Mar 2025", size: "1.8 MB", tags: ["TD", "Maths"] },
  { id: "d3", title: "Examen Physique 2024", author: "Imane K.", authorInitials: "IK", date: "01 Mar 2025", size: "780 KB", tags: ["Examen", "Physique"], locked: true, cost: 20 },
  { id: "d4", title: "Cours Biologie cellulaire complet", author: "Anas R.", authorInitials: "AR", date: "27 Feb 2025", size: "5.1 MB", tags: ["Cours", "Bio"] },
  { id: "d5", title: "Annales Informatique S3", author: "Lina F.", authorInitials: "LF", date: "20 Feb 2025", size: "3.2 MB", tags: ["Annales", "Info"] },
  { id: "d6", title: "Fiches révision Stats", author: "Omar B.", authorInitials: "OB", date: "15 Feb 2025", size: "1.1 MB", tags: ["Fiches", "Stats"], locked: true, cost: 15 },
];

export const userResults = [
  { id: "u1", name: "Sara Bennani", initials: "SB", program: "SMPC — S6", points: 340 },
  { id: "u2", name: "Mehdi Tazi", initials: "MT", program: "SMA — S4", points: 215 },
  { id: "u3", name: "Anas Rharbi", initials: "AR", program: "SVT — S2", points: 180 },
];

export const posts = [
  { id: "p1", author: "Sara Bennani", initials: "SB", time: "il y a 2h", content: "Je viens de partager un résumé complet de chimie organique pour le S4 — bon courage à tous pour les exams !", likes: 24, comments: 6 },
  { id: "p2", author: "Mehdi Tazi", initials: "MT", time: "il y a 5h", content: "Quelqu'un a des conseils pour réviser efficacement les maths en une semaine ?", likes: 12, comments: 14 },
  { id: "p3", author: "Imane K.", initials: "IK", time: "hier", content: "Nouveau record perso : 50 documents téléchargés depuis Docly ce semestre 🚀", likes: 67, comments: 9 },
];

export const questions = [
  { id: "q1", title: "Comment résoudre les équations différentielles d'ordre 2 ?", tags: ["Maths", "S4"], votes: 18, answers: 5 },
  { id: "q2", title: "Différence entre SN1 et SN2 en chimie organique ?", tags: ["Chimie", "S4"], votes: 32, answers: 12 },
  { id: "q3", title: "Recommandation de bouquin pour la physique quantique ?", tags: ["Physique", "S6"], votes: 9, answers: 3 },
];

export const notifications = [
  { id: "n1", who: "Sara Bennani", initials: "SB", action: "a aimé votre document « Résumé Chimie organique »", time: "il y a 5 min", unread: true },
  { id: "n2", who: "Mehdi Tazi", initials: "MT", action: "a commencé à vous suivre", time: "il y a 1h", unread: true },
  { id: "n3", who: "Docly", initials: "D", action: "Vous avez gagné +15 points pour un nouvel upload", time: "il y a 3h", unread: false },
  { id: "n4", who: "Imane K.", initials: "IK", action: "a répondu à votre question", time: "hier", unread: false },
];

export const contacts = [
  { id: "c1", name: "Sara Bennani", initials: "SB", last: "Merci pour le résumé !", time: "10:42", unread: 2 },
  { id: "c2", name: "Mehdi Tazi", initials: "MT", last: "On révise ensemble demain ?", time: "09:15", unread: 0 },
  { id: "c3", name: "Imane K.", initials: "IK", last: "Tu as les annales 2023 ?", time: "hier", unread: 1 },
  { id: "c4", name: "Anas Rharbi", initials: "AR", last: "👍", time: "lun.", unread: 0 },
];

export const chatMessages: Record<string, Array<{ id: string; from: "me" | "them"; text: string; time: string }>> = {
  c1: [
    { id: "m1", from: "them", text: "Salut Youssef, ton résumé de chimie m'a beaucoup aidée 🙏", time: "10:38" },
    { id: "m2", from: "me", text: "Avec plaisir Sara ! N'hésite pas si tu as des questions.", time: "10:40" },
    { id: "m3", from: "them", text: "Merci pour le résumé !", time: "10:42" },
  ],
  c2: [
    { id: "m1", from: "them", text: "On révise ensemble demain ?", time: "09:15" },
  ],
  c3: [
    { id: "m1", from: "them", text: "Tu as les annales 2023 ?", time: "hier" },
  ],
  c4: [
    { id: "m1", from: "them", text: "👍", time: "lun." },
  ],
};

export const trendingModules = modules.slice(0, 4);

export const topContributors = [
  { id: "t1", name: "Sara Bennani", initials: "SB", points: 340 },
  { id: "t2", name: "Mehdi Tazi", initials: "MT", points: 215 },
  { id: "t3", name: "Youssef Amrani", initials: "YA", points: 120 },
  { id: "t4", name: "Anas Rharbi", initials: "AR", points: 95 },
];
