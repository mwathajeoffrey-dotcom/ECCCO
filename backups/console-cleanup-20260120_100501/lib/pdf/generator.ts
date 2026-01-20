'use client';

import jsPDF from 'jspdf';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  references: string[];
  difficulty: string;
  topicId: string;
}

interface ExamResults {
  questions: Question[];
  userAnswers: { [key: number]: number };
  score: number;
  totalTime: number;
  topicName: string;
  completedAt: Date;
}

export class PDFGenerator {
  private doc: jsPDF;
  private margin: number = 20;
  private pageWidth: number;
  private pageHeight: number;
  private currentY: number = 20;

  constructor() {
    this.doc = new jsPDF();
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
  }

  generateAnswerSheet(examResults: ExamResults): void {
    this.addHeader(examResults);
    this.addScoreSummary(examResults);
    this.addQuestionBreakdown(examResults);
    this.addStudyRecommendations(examResults);
  }

  private addHeader(examResults: ExamResults): void {
    // Title
    this.doc.setFontSize(20);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('ECCCO - Emergency & Critical Care Exam Results', this.margin, this.currentY);
    this.currentY += 15;

    // Exam info
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(`Topic: ${examResults.topicName}`, this.margin, this.currentY);
    this.currentY += 7;
    this.doc.text(`Date: ${examResults.completedAt.toLocaleDateString()}`, this.margin, this.currentY);
    this.currentY += 7;
    this.doc.text(`Time: ${this.formatTime(examResults.totalTime)}`, this.margin, this.currentY);
    this.currentY += 15;

    // Add line separator
    this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 15;
  }

  private addScoreSummary(examResults: ExamResults): void {
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Score Summary', this.margin, this.currentY);
    this.currentY += 15;

    const correct = examResults.questions.filter((q, i) => 
      examResults.userAnswers[i] === q.correctIndex
    ).length;
    const total = examResults.questions.length;
    const percentage = Math.round((correct / total) * 100);

    // Score box
    this.doc.setFillColor(240, 248, 255);
    this.doc.rect(this.margin, this.currentY - 5, this.pageWidth - 2 * this.margin, 25, 'F');
    
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(`Overall Score: ${percentage}%`, this.margin + 10, this.currentY + 5);
    this.doc.text(`Correct Answers: ${correct} / ${total}`, this.margin + 10, this.currentY + 15);
    
    this.currentY += 35;
  }

  private addQuestionBreakdown(examResults: ExamResults): void {
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Question Breakdown', this.margin, this.currentY);
    this.currentY += 15;

    examResults.questions.forEach((question, index) => {
      this.checkPageBreak(80); // Check if we need a new page
      
      const userAnswer = examResults.userAnswers[index];
      const isCorrect = userAnswer === question.correctIndex;
      const options = typeof question.options === 'string' 
        ? JSON.parse(question.options) 
        : question.options;
      const references = typeof question.references === 'string'
        ? JSON.parse(question.references)
        : question.references;

      // Question number and status
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'bold');
      const statusText = isCorrect ? '✓ CORRECT' : '✗ INCORRECT';
      const statusColor = isCorrect ? [0, 150, 0] : [200, 0, 0];
      
      this.doc.text(`Question ${index + 1}:`, this.margin, this.currentY);
      this.doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
      this.doc.text(statusText, this.pageWidth - this.margin - 30, this.currentY);
      this.doc.setTextColor(0, 0, 0);
      this.currentY += 10;

      // Question text
      this.doc.setFont('helvetica', 'normal');
      const questionLines = this.doc.splitTextToSize(question.question, this.pageWidth - 2 * this.margin);
      this.doc.text(questionLines, this.margin, this.currentY);
      this.currentY += questionLines.length * 5 + 5;

      // Options
      options.forEach((option: string, optionIndex: number) => {
        const prefix = String.fromCharCode(65 + optionIndex) + '. ';
        const optionText = this.doc.splitTextToSize(prefix + option, this.pageWidth - 2 * this.margin - 10);
        
        // Highlight correct answer in green, user's incorrect answer in red
        if (optionIndex === question.correctIndex) {
          this.doc.setTextColor(0, 150, 0);
          this.doc.setFont('helvetica', 'bold');
        } else if (optionIndex === userAnswer && !isCorrect) {
          this.doc.setTextColor(200, 0, 0);
          this.doc.setFont('helvetica', 'bold');
        } else {
          this.doc.setTextColor(0, 0, 0);
          this.doc.setFont('helvetica', 'normal');
        }
        
        this.doc.text(optionText, this.margin + 5, this.currentY);
        this.currentY += optionText.length * 5 + 2;
      });

      this.doc.setTextColor(0, 0, 0);
      this.doc.setFont('helvetica', 'normal');
      this.currentY += 5;

      // Explanation
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Explanation:', this.margin, this.currentY);
      this.currentY += 7;
      
      this.doc.setFont('helvetica', 'normal');
      const explanationLines = this.doc.splitTextToSize(question.explanation, this.pageWidth - 2 * this.margin);
      this.doc.text(explanationLines, this.margin, this.currentY);
      this.currentY += explanationLines.length * 5 + 5;

      // References
      if (references && references.length > 0) {
        this.doc.setFont('helvetica', 'bold');
        this.doc.text('References:', this.margin, this.currentY);
        this.currentY += 7;
        
        this.doc.setFont('helvetica', 'normal');
        references.forEach((ref: string) => {
          const refLines = this.doc.splitTextToSize(`• ${ref}`, this.pageWidth - 2 * this.margin - 5);
          this.doc.text(refLines, this.margin + 5, this.currentY);
          this.currentY += refLines.length * 5 + 2;
        });
      }

      this.currentY += 10;
      
      // Add separator line
      this.doc.setDrawColor(200, 200, 200);
      this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
      this.currentY += 15;
    });
  }

  private addStudyRecommendations(examResults: ExamResults): void {
    this.checkPageBreak(60);
    
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Study Recommendations', this.margin, this.currentY);
    this.currentY += 15;

    const incorrect = examResults.questions.filter((q, i) => 
      examResults.userAnswers[i] !== q.correctIndex
    );
    
    const difficultyBreakdown = {
      easy: incorrect.filter(q => q.difficulty === 'easy').length,
      medium: incorrect.filter(q => q.difficulty === 'medium').length,
      hard: incorrect.filter(q => q.difficulty === 'hard').length
    };

    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    
    if (examResults.score >= 80) {
      this.doc.text('Excellent performance! Continue practicing to maintain your level.', this.margin, this.currentY);
    } else if (examResults.score >= 60) {
      this.doc.text('Good performance with room for improvement. Focus on the areas below:', this.margin, this.currentY);
    } else {
      this.doc.text('Consider additional study time. Focus on fundamental concepts in this topic.', this.margin, this.currentY);
    }
    this.currentY += 15;

    if (difficultyBreakdown.easy > 0) {
      this.doc.text(`• Review basic concepts (${difficultyBreakdown.easy} easy questions missed)`, this.margin, this.currentY);
      this.currentY += 7;
    }
    if (difficultyBreakdown.medium > 0) {
      this.doc.text(`• Practice intermediate scenarios (${difficultyBreakdown.medium} medium questions missed)`, this.margin, this.currentY);
      this.currentY += 7;
    }
    if (difficultyBreakdown.hard > 0) {
      this.doc.text(`• Study advanced topics (${difficultyBreakdown.hard} hard questions missed)`, this.margin, this.currentY);
      this.currentY += 7;
    }
  }

  private checkPageBreak(requiredSpace: number): void {
    if (this.currentY + requiredSpace > this.pageHeight - this.margin) {
      this.doc.addPage();
      this.currentY = this.margin;
    }
  }

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  public download(filename: string): void {
    this.doc.save(filename);
  }

  public getBlob(): Blob {
    return this.doc.output('blob');
  }
}

export function generateExamPDF(examResults: ExamResults): void {
  const generator = new PDFGenerator();
  generator.generateAnswerSheet(examResults);
  
  const filename = `ECCCO_${examResults.topicName.replace(/\s+/g, '_')}_${
    examResults.completedAt.toISOString().split('T')[0]
  }.pdf`;
  
  generator.download(filename);
}