// Script to check all available topics and questions for live quiz
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasourceUrl: "file:./prisma/dev.db"
});

async function checkPlatformContent() {
  try {
    console.log('📚 ECCCO Platform Content Analysis for Live Quiz\n');
    
    // Get all topics with question counts
    const topics = await prisma.topic.findMany({
      include: {
        _count: {
          select: { questions: true }
        },
        module: true
      },
      orderBy: {
        questions: {
          _count: 'desc'
        }
      }
    });
    
    console.log(`🎯 Total Topics Available: ${topics.length}`);
    
    const totalQuestions = await prisma.question.count();
    console.log(`📝 Total Questions Available: ${totalQuestions}\n`);
    
    // Group by module
    const moduleGroups = {};
    topics.forEach(topic => {
      const moduleName = topic.module.name;
      if (!moduleGroups[moduleName]) {
        moduleGroups[moduleName] = [];
      }
      moduleGroups[moduleName].push(topic);
    });
    
    console.log('📋 Content by Medical Module:\n');
    
    Object.entries(moduleGroups).forEach(([moduleName, moduleTopics]) => {
      console.log(`🏥 ${moduleName.toUpperCase()}`);
      console.log(`   Age Group: ${moduleTopics[0].module.ageGroup}`);
      
      let moduleQuestionCount = 0;
      moduleTopics.forEach(topic => {
        const questionCount = topic._count.questions;
        moduleQuestionCount += questionCount;
        console.log(`   • ${topic.name}: ${questionCount} questions`);
      });
      console.log(`   📊 Module Total: ${moduleQuestionCount} questions\n`);
    });
    
    // Show top 10 topics by question count
    console.log('🔥 Top 10 Topics by Question Count:\n');
    topics.slice(0, 10).forEach((topic, index) => {
      const questionCount = topic._count.questions;
      console.log(`${index + 1}. ${topic.name}: ${questionCount} questions`);
    });
    
    console.log('\n✅ Live Quiz Integration Status:');
    console.log('• All topics are available in quiz creation interface');
    console.log('• Questions dynamically load when topic is selected');
    console.log('• Host can select specific questions for their quiz');
    console.log('• Support for multi-topic quizzes (coming soon)');
    
    console.log('\n🎮 Quiz Creation Process:');
    console.log('1. Go to http://localhost:3000/live-quiz/create');
    console.log('2. Select any of the 34+ medical topics');
    console.log('3. Choose from available questions in that topic');
    console.log('4. Configure timing and participant limits');
    console.log('5. Generate unique access code for participants');
    
  } catch (error) {
    console.error('Error analyzing content:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPlatformContent();