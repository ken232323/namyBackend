import { create, getAll } from './db.js';

const workshops = [
  { title: 'Business Plan Bootcamp', category: 'Entrepreneurship', facilitator: 'NAMY Enterprise Desk', date: '2026-08-28', venue: 'Lusaka Innovation Hub', seats: 12 },
  { title: 'Intro to Solar Design', category: 'Engineering', facilitator: 'Eng. M. Chileshe', date: '2026-09-05', venue: 'Kitwe Trade Centre', seats: 8 },
  { title: 'Digital Marketing for SMEs', category: 'Digital Skills', facilitator: 'NAMY Digital Team', date: '2026-09-19', venue: 'Online (Zoom)', seats: 30 },
];

const news = [
  { title: 'NAMY signs MoU to scale youth innovation hubs across three provinces', tag: 'Partnership', date: '2026-08-02' },
  { title: 'Cohort 3 graduates 42 young entrepreneurs from the Enterprise Accelerator', tag: 'Programs', date: '2026-07-21' },
  { title: 'Registration opens for the 2026 Mwense Economic & Business Summit', tag: 'Summit', date: '2026-07-10' },
];

const stats = [
  { label: 'District Programs', value: 15, suffix: '+' },
  { label: 'Youth Members', value: 300, suffix: '+' },
  { label: 'Innovation Projects', value: 50, suffix: '+' },
  { label: 'Lives Impacted', value: 1000, suffix: '+' },
  { label: 'Partners', value: 25, suffix: '+' },
];

const seminars = [
  { title: 'Youth Policy Dialogue', facilitator: 'NAMY Policy Desk', date: '2026-09-12', venue: 'Lusaka', seats: 50, description: 'An open dialogue on youth-focused national policy priorities.' },
];

const leadership = [
  { name: 'Chola Mwansa', position: 'Founder & Executive Director', bio: 'Founded NAMY in 2019 to connect youth ambition with real economic opportunity across Zambia\'s districts.', photoUrl: '', order: 1 },
  { name: 'Natasha Banda', position: 'Programs Director', bio: 'Oversees NAMY\'s twelve district-delivered programmes, from STEM education to entrepreneurship.', photoUrl: '', order: 2 },
  { name: 'Mulenga Phiri', position: 'Innovation Hub Lead', bio: 'Guides youth-built prototypes from concept through piloting and partner handoff.', photoUrl: '', order: 3 },
];

const projects = [
  { title: 'Mwense Youth Skills Centre', status: 'Completed', location: 'Mwense, Luapula Province', description: 'A district-run training centre equipping 200+ young people annually with trade and digital skills.', imageUrl: '', link: 'https://youtube.com/watch?v=example1' },
  { title: 'District Agripreneur Fund', status: 'Ongoing', location: 'Copperbelt Province', description: 'Seed funding and mentorship for 30 young agribusiness founders across five districts.', imageUrl: '', link: '' },
  { title: 'Solar-Powered Community Hub', status: 'Upcoming', location: 'Luapula Province', description: 'A solar-powered co-working and training space planned for early 2027.', imageUrl: '', link: '' },
];

function seedCollection(name, items) {
  if (getAll(name).length > 0) {
    console.log(`Skipped ${name} — already has data.`);
    return;
  }
  items.forEach((item) => create(name, item));
  console.log(`Seeded ${items.length} ${name}.`);
}

seedCollection('workshops', workshops);
seedCollection('news', news);
seedCollection('stats', stats);
seedCollection('seminars', seminars);
seedCollection('leadership', leadership);
seedCollection('projects', projects);

console.log('Done. Run "npm run dev" to start the server.');
