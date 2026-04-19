import { prisma } from '../src/lib/prisma';

async function main() {
  await prisma.taskCompletion.deleteMany();
  await prisma.task.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  const users = [
    { email: 'ana@utp.edu', password: '123456', name: 'Ana UTP' },
    { email: 'carlos@utp.edu', password: '123456', name: 'Carlos UTP' },
  ];

  await prisma.user.createMany({ data: users });

  const coursesData = [
    {
      title: 'Node.js Fundamentals',
      description: 'Event loop, modules, async patterns.',
      tasks: ['Setup project', 'Build REST endpoint', 'Handle async errors'],
    },
    {
      title: 'TypeScript Essentials',
      description: 'Types, interfaces, generics for backend.',
      tasks: ['Create interfaces', 'Use utility types', 'Strict mode refactor'],
    },
    {
      title: 'Express API Design',
      description: 'Routing, middleware and layered architecture.',
      tasks: ['Create routes', 'Add middleware', 'Implement controller/service split'],
    },
    {
      title: 'JWT Authentication',
      description: 'Token signing, validation, route protection.',
      tasks: ['Issue token', 'Validate bearer token', 'Protect private routes'],
    },
    {
      title: 'SQL with SQLite',
      description: 'Relational model and query foundations.',
      tasks: ['Design schema', 'Run migration', 'Query relationships'],
    },
    {
      title: 'Testing with Jest',
      description: 'Unit and integration testing for APIs.',
      tasks: ['Write unit test', 'Write integration test', 'Mock dependencies'],
    },
  ];

  for (const courseData of coursesData) {
    await prisma.course.create({
      data: {
        title: courseData.title,
        description: courseData.description,
        tasks: {
          create: courseData.tasks.map((task) => ({ title: task })),
        },
      },
    });
  }

  console.log('Seed completed: users, courses and tasks loaded.');
}

main()
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
