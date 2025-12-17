import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const editorPassword = await bcrypt.hash('editor123', 10);
  const viewerPassword = await bcrypt.hash('viewer123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@reportflow.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@reportflow.com',
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: 'editor@reportflow.com' },
    update: {},
    create: {
      name: 'Editor User',
      email: 'editor@reportflow.com',
      passwordHash: editorPassword,
      role: UserRole.EDITOR,
    },
  });

  const viewer = await prisma.user.upsert({
    where: { email: 'viewer@reportflow.com' },
    update: {},
    create: {
      name: 'Viewer User',
      email: 'viewer@reportflow.com',
      passwordHash: viewerPassword,
      role: UserRole.VIEWER,
    },
  });

  // Check if sample report already exists
  let sampleReport = await prisma.report.findFirst({
    where: {
      title: 'Sample Property Appraisal Report',
      createdById: admin.id,
    },
  });

  if (!sampleReport) {
    sampleReport = await prisma.report.create({
      data: {
        title: 'Sample Property Appraisal Report',
        clientName: 'John Doe',
        propertyAddress: '123 Main Street, Anytown, USA',
        effectiveDate: new Date(),
        status: 'DRAFT',
        createdById: admin.id,
      },
    });

    const introSection = await prisma.section.create({
      data: {
        reportId: sampleReport.id,
        slug: 'introduction',
        title: 'Introduction',
        orderIndex: 0,
        type: 'TEXT',
      },
    });

    await prisma.sectionContent.create({
      data: {
        sectionId: introSection.id,
        version: 1,
        format: 'HTML',
        content: '<p>This is a sample introduction section for the property appraisal report.</p>',
        createdById: admin.id,
      },
    });

    const propertySection = await prisma.section.create({
      data: {
        reportId: sampleReport.id,
        slug: 'property-description',
        title: 'Property Description',
        orderIndex: 1,
        type: 'TEXT',
      },
    });

    await prisma.sectionContent.create({
      data: {
        sectionId: propertySection.id,
        version: 1,
        format: 'HTML',
        content: '<p>Detailed property description goes here.</p>',
        createdById: admin.id,
      },
    });
    console.log('📄 Created sample report');
  } else {
    console.log('📄 Sample report already exists, skipping...');
  }

  // Check if template already exists
  let sampleTemplate = await prisma.template.findUnique({
    where: { name: 'Standard Appraisal Template' },
  });

  if (!sampleTemplate) {
    sampleTemplate = await prisma.template.create({
      data: {
        name: 'Standard Appraisal Template',
        description: 'Standard template for property appraisal reports',
        templateJson: {
          sections: [
            {
              slug: 'executive-summary',
              title: 'Executive Summary',
              type: 'TEXT',
              orderIndex: 0,
            },
            {
              slug: 'property-description',
              title: 'Property Description',
              type: 'TEXT',
              orderIndex: 1,
            },
            {
              slug: 'market-analysis',
              title: 'Market Analysis',
              type: 'TEXT',
              orderIndex: 2,
            },
            {
              slug: 'valuation',
              title: 'Valuation',
              type: 'TABLE',
              orderIndex: 3,
            },
            {
              slug: 'conclusion',
              title: 'Conclusion',
              type: 'TEXT',
              orderIndex: 4,
            },
          ],
        },
      },
    });
    console.log('📋 Created sample template');
  } else {
    console.log('📋 Sample template already exists, skipping...');
  }

  console.log('✅ Database seeded successfully!');
  console.log('\n📝 Test Users:');
  console.log('Admin: admin@reportflow.com / admin123');
  console.log('Editor: editor@reportflow.com / editor123');
  console.log('Viewer: viewer@reportflow.com / viewer123');
  console.log(`\n📄 Sample Report ID: ${sampleReport.id}`);
  console.log(`📋 Sample Template ID: ${sampleTemplate.id}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
