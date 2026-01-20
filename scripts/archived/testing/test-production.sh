#!/bin/bash

echo "🔍 Waiting for Vercel deployment..."
echo ""
echo "While waiting, please:"
echo "1. Go to: https://vercel.com/mwathajeoffrey-dotcom/eccco/settings/environment-variables"
echo "2. Update DATABASE_URL to:"
echo "   postgresql://postgres.dckhoqbqtxddghojkoer:afcL7QWHirRbBXp4@aws-1-us-east-1.pooler.supabase.com:6543/postgres"
echo "3. Save and Redeploy"
echo ""
echo "Press Enter when deployment is complete..."
read

echo ""
echo "🧪 Testing Production API..."
echo ""

# Test the API
response=$(curl -s 'https://eccco.vercel.app/api/topics')

if [ -z "$response" ]; then
    echo "❌ No response from API"
    exit 1
fi

# Parse and display results
echo "$response" | python3 -c "
import sys, json

try:
    data = json.load(sys.stdin)
    total_topics = len(data)
    total_questions = sum(t.get('_count', {}).get('questions', 0) for t in data)
    topics_with_q = len([t for t in data if t.get('_count', {}).get('questions', 0) > 0])

    print('📊 Production Database Status:\n')
    print(f'  Total Topics: {total_topics}')
    print(f'  Topics with Questions: {topics_with_q}')
    print(f'  Total Questions: {total_questions}\n')

    # Check OB/GYN
    obgyn = [t for t in data if 'ob' in t['name'].lower() or 'gyn' in t['name'].lower()]
    if obgyn:
        print('✅ OB/GYN Topics Found:\n')
        for t in obgyn:
            print(f'  - {t[\"name\"]}: {t.get(\"_count\", {}).get(\"questions\", 0)} questions')

    print('')

    if total_questions >= 1800:
        print('🎉 SUCCESS! Production has ALL 1,845 questions!\n')
        print('✅ You can now visit: https://eccco.vercel.app/exam')
        print('✅ All topics should show question counts')
        print('✅ OB/GYN topics should have 30+ questions each\n')
    elif total_questions > 850:
        print('⚠️  Partial success. More questions than before, but not all 1,845.')
        print(f'   Currently: {total_questions} / 1,845 questions\n')
    else:
        print('❌ Still showing old database (851 questions)')
        print('   Make sure you updated DATABASE_URL in Vercel and redeployed!\n')

except json.JSONDecodeError:
    print('❌ Invalid JSON response from API')
    sys.exit(1)
except Exception as e:
    print(f'❌ Error: {e}')
    sys.exit(1)
"

echo "🔗 Quick Links:"
echo "  - Production Site: https://eccco.vercel.app/exam"
echo "  - Vercel Dashboard: https://vercel.com/mwathajeoffrey-dotcom/eccco"
echo "  - Environment Variables: https://vercel.com/mwathajeoffrey-dotcom/eccco/settings/environment-variables"
echo ""
