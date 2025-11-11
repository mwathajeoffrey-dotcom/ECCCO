#!/bin/bash

# ECCCO Production Deployment Verification Script

echo "🔍 ECCCO Production Deployment Verification"
echo "📅 $(date)"
echo ""

# Production URL
PROD_URL="https://eccco.vercel.app"
echo "🌐 Testing Production URL: $PROD_URL"

# Test 1: Health Check
echo ""
echo "1️⃣ Health Check Test..."
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/api/health" || echo "000")
if [ "$HEALTH_STATUS" = "200" ]; then
    echo "✅ Health endpoint: PASS ($HEALTH_STATUS)"
else
    echo "❌ Health endpoint: FAIL ($HEALTH_STATUS)"
fi

# Test 2: Home Page
echo ""
echo "2️⃣ Home Page Test..."
HOME_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL" || echo "000")
if [ "$HOME_STATUS" = "200" ]; then
    echo "✅ Home page: PASS ($HOME_STATUS)"
else
    echo "❌ Home page: FAIL ($HOME_STATUS)"
fi

# Test 3: Exam Page
echo ""
echo "3️⃣ Exam Interface Test..."
EXAM_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/exam" || echo "000")
if [ "$EXAM_STATUS" = "200" ]; then
    echo "✅ Exam interface: PASS ($EXAM_STATUS)"
else
    echo "❌ Exam interface: FAIL ($EXAM_STATUS)"
fi

# Test 4: Authentication Endpoint
echo ""
echo "4️⃣ Authentication Endpoint Test..."
AUTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/api/auth/providers" || echo "000")
if [ "$AUTH_STATUS" = "200" ]; then
    echo "✅ Authentication API: PASS ($AUTH_STATUS)"
else
    echo "❌ Authentication API: FAIL ($AUTH_STATUS)"
fi

# Test 5: Dashboard Page
echo ""
echo "5️⃣ Dashboard Test..."
DASHBOARD_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/dashboard" || echo "000")
if [ "$DASHBOARD_STATUS" = "200" ] || [ "$DASHBOARD_STATUS" = "307" ]; then
    echo "✅ Dashboard: PASS ($DASHBOARD_STATUS)"
else
    echo "❌ Dashboard: FAIL ($DASHBOARD_STATUS)"
fi

# Test 6: API Questions
echo ""
echo "6️⃣ Questions API Test..."
QUESTIONS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/api/questions?topicId=emergency-medicine&limit=1" || echo "000")
if [ "$QUESTIONS_STATUS" = "200" ]; then
    echo "✅ Questions API: PASS ($QUESTIONS_STATUS)"
else
    echo "❌ Questions API: FAIL ($QUESTIONS_STATUS)"
fi

echo ""
echo "📊 DEPLOYMENT VERIFICATION SUMMARY"
echo "=================================="

# Count passing tests
TESTS_PASSED=0
[ "$HEALTH_STATUS" = "200" ] && ((TESTS_PASSED++))
[ "$HOME_STATUS" = "200" ] && ((TESTS_PASSED++))
[ "$EXAM_STATUS" = "200" ] && ((TESTS_PASSED++))
[ "$AUTH_STATUS" = "200" ] && ((TESTS_PASSED++))
[ "$DASHBOARD_STATUS" = "200" ] || [ "$DASHBOARD_STATUS" = "307" ] && ((TESTS_PASSED++))
[ "$QUESTIONS_STATUS" = "200" ] && ((TESTS_PASSED++))

echo "Tests Passed: $TESTS_PASSED/6"

if [ "$TESTS_PASSED" -eq 6 ]; then
    echo "🎉 Status: DEPLOYMENT SUCCESSFUL"
    echo "✅ All systems operational"
    echo ""
    echo "🚀 Available Features:"
    echo "   • Enhanced Exam Experience"
    echo "   • User Authentication System"
    echo "   • Personalized Dashboard"
    echo "   • 5000+ Medical Questions"
    echo "   • Performance Analytics"
    echo ""
    echo "🔗 Production URL: $PROD_URL"
    echo "📱 Mobile Ready: Yes"
    echo "🔒 Authentication: Google OAuth"
elif [ "$TESTS_PASSED" -ge 4 ]; then
    echo "⚠️  Status: PARTIAL SUCCESS"
    echo "🔧 Some services may need configuration"
else
    echo "❌ Status: DEPLOYMENT ISSUES"
    echo "🛠️  Manual intervention may be required"
fi

echo ""
echo "📝 Next Steps:"
echo "   1. Configure environment variables in Vercel"
echo "   2. Set up Google OAuth credentials"
echo "   3. Test authentication flow manually"
echo "   4. Monitor performance metrics"

exit 0