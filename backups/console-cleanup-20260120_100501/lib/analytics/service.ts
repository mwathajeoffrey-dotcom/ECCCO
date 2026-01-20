// Analytics service stub - to be implemented
export const analytics = {
  initialize: async () => {
    console.log('📊 Analytics initialized');
    return Promise.resolve();
  },
  
  track: (event: string, properties?: any) => {
    if (typeof window !== 'undefined') {
      console.log('📊 Analytics:', event, properties);
    }
  },
  
  trackPageView: (path: string, title: string) => {
    analytics.track('page_view', { path, title });
  },
  
  trackTopicSelection: (topicId: string, topicName: string) => {
    analytics.track('topic_selection', { topicId, topicName });
  },
  
  trackExamStart: (examId: string, topic: string) => {
    analytics.track('exam_start', { examId, topic });
  },
  
  trackExamComplete: (examId: string, score: number, topicOrTime: string | number) => {
    const topic = typeof topicOrTime === 'string' ? topicOrTime : 'unknown';
    const timeSpent = typeof topicOrTime === 'number' ? topicOrTime : 0;
    analytics.track('exam_complete', { examId, score, topic, timeSpent });
  },
  
  trackQuestionAnswer: (questionId: string, correct: boolean) => {
    analytics.track('question_answer', { questionId, correct });
  },
  
  trackQuestionAnswered: (questionId: string, correct: boolean, timeSpent: number) => {
    analytics.track('question_answered', { questionId, correct, timeSpent });
  },
  
  trackPDFDownload: (examId: string, score: number) => {
    analytics.track('pdf_download', { examId, score });
  },
};

export default analytics;
