import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function analyzeTopics() {
  try {
    console.log("🔍 Analyzing Current Question Structure...")
    console.log("=".repeat(50))
    
    const topics = await prisma.topic.findMany({
      include: {
        _count: {
          select: {
            questions: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })
    
    console.log("\n📊 Current Topics:")
    topics.forEach(topic => {
      console.log(`\n📌 ${topic.name}`)
      console.log(`   Description: ${topic.description || 'No description'}`)
      console.log(`   Questions: ${topic._count.questions}`)
    })
    
    // Sample questions to understand current categorization
    console.log("\n📝 Sample Questions by Topic:")
    
    for (const topic of topics.slice(0, 5)) {
      const sampleQuestions = await prisma.question.findMany({
        where: { topicId: topic.id },
        select: {
          question: true,
          difficulty: true
        },
        take: 2
      })
      
      console.log(`\n🔸 ${topic.name} samples:`)
      sampleQuestions.forEach((q, i) => {
        const questionPreview = q.question.length > 80 ? q.question.substring(0, 80) + "..." : q.question
        console.log(`   ${i + 1}. [${q.difficulty}] ${questionPreview}`)
      })
    }
    
    console.log(`\n📈 Summary:`)
    console.log(`   Total Topics: ${topics.length}`)
    console.log(`   Total Questions: ${topics.reduce((sum, topic) => sum + topic._count.questions, 0)}`)
    
  } catch (error) {
    console.error('❌ Error analyzing topics:', error)
  } finally {
    await prisma.$disconnect()
  }
}

analyzeTopics()