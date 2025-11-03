'use client';

import { collectAnalyticsData, type AnalyticsData, type LocationInfo } from './utils';

export type EventType = 
  | 'page_view'
  | 'exam_start'
  | 'exam_complete'
  | 'question_answered'
  | 'topic_selected'
  | 'pdf_download'
  | 'navigation_click';

export interface AnalyticsEvent {
  eventType: EventType;
  eventData?: Record<string, any>;
  location?: LocationInfo;
}

class AnalyticsService {
  private analyticsData: Omit<AnalyticsData, 'location'> | null = null;
  private locationData: LocationInfo | null = null;
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;
    
    // Collect device and browser data
    this.analyticsData = collectAnalyticsData();
    
    // Get location data from IP (optional)
    try {
      await this.fetchLocationData();
    } catch (error) {
      console.warn('Could not fetch location data:', error);
    }
    
    this.isInitialized = true;
    
    // Track initial page view
    this.trackEvent('page_view', {
      page: window.location.pathname,
      title: document.title
    });
  }

  private async fetchLocationData() {
    try {
      // Use a free IP geolocation service
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        this.locationData = {
          country: data.country_name,
          city: data.city,
          region: data.region,
          timezone: data.timezone,
          lat: data.latitude,
          lon: data.longitude
        };
      }
    } catch (error) {
      // Silently fail - location is optional
      console.warn('Location detection failed:', error);
    }
  }

  async trackEvent(eventType: EventType, eventData?: Record<string, unknown>) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!this.analyticsData) return;

    try {
      const payload = {
        sessionId: this.analyticsData.sessionId,
        eventType,
        eventData: eventData ? JSON.stringify(eventData) : null,
        deviceInfo: JSON.stringify(this.analyticsData.deviceInfo),
        userAgent: this.analyticsData.userAgent,
        location: this.locationData ? JSON.stringify(this.locationData) : null,
        screenSize: JSON.stringify(this.analyticsData.screenInfo),
        timezone: this.analyticsData.timezone,
        referrer: this.analyticsData.referrer
      };

      // Send to our analytics API
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }

  // Convenience methods for common events
  trackPageView(page: string, title: string) {
    this.trackEvent('page_view', { page, title });
  }

  trackExamStart(topicId: string, topicName: string) {
    this.trackEvent('exam_start', { topicId, topicName });
  }

  trackExamComplete(topicId: string, score: number, timeSpent: number) {
    this.trackEvent('exam_complete', { topicId, score, timeSpent });
  }

  trackQuestionAnswered(questionId: string, isCorrect: boolean, timeSpent: number) {
    this.trackEvent('question_answered', { questionId, isCorrect, timeSpent });
  }

  trackTopicSelection(topicId: string, topicName: string) {
    this.trackEvent('topic_selected', { topicId, topicName });
  }

  trackPDFDownload(topicId: string, score: number) {
    this.trackEvent('pdf_download', { topicId, score });
  }

  trackNavigation(from: string, to: string) {
    this.trackEvent('navigation_click', { from, to });
  }
}

// Export singleton instance
export const analytics = new AnalyticsService();